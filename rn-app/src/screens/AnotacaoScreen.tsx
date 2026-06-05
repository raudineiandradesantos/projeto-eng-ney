import React, {useState, useEffect, useCallback} from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList,
  Alert, ActivityIndicator, RefreshControl, Modal,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Colors} from '../theme';
import {useProject} from '../context/ProjectContext';

interface Annotation {
  id: string; text: string; category: string; createdAt: string;
}

const CATEGORIES = ['Geral', 'Tecnico', 'Seguranca', 'Material', 'Equipe', 'Problema'];
const PAGE_SIZE = 10;

export default function AnotacaoScreen() {
  const {currentProject, user} = useProject();
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({text: '', category: 'Geral'});
  const [saving, setSaving] = useState(false);
  const [editItem, setEditItem] = useState<Annotation | null>(null);
  // Modo de escrita de texto livre (substitui Vision API indisponivel)
  const [showTextHelper, setShowTextHelper] = useState(false);
  const [rawText, setRawText] = useState('');

  const loadAnnotations = useCallback(async () => {
    if (!currentProject || !user) return;
    setLoading(true);
    try {
      const snap = await firestore()
        .collection('annotations')
        .where('projectId', '==', currentProject.id)
        .where('owner', '==', user.uid)
        .orderBy('createdAt', 'desc')
        .limit(100)
        .get();
      setAnnotations(snap.docs.map(d => ({id: d.id, ...(d.data() as any)})));
    } catch (e: any) {
      Alert.alert('Erro', e.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [currentProject, user]);

  useEffect(() => {
    setPage(1);
    loadAnnotations();
  }, [currentProject]);

  async function saveAnnotation() {
    if (!form.text.trim()) { Alert.alert('Erro', 'Escreva a anotacao'); return; }
    if (!currentProject || !user) { Alert.alert('Aviso', 'Selecione um projeto'); return; }
    setSaving(true);
    try {
      if (editItem) {
        await firestore().collection('annotations').doc(editItem.id).update({
          text: form.text.trim(),
          category: form.category,
        });
        setAnnotations(prev => prev.map(a => a.id === editItem.id
          ? {...a, text: form.text.trim(), category: form.category}
          : a));
      } else {
        const ref = firestore().collection('annotations').doc();
        const ann: Annotation = {
          id: ref.id,
          text: form.text.trim(),
          category: form.category,
          createdAt: new Date().toISOString(),
        };
        await ref.set({...ann, projectId: currentProject.id, owner: user.uid});
        setAnnotations(prev => [ann, ...prev]);
      }
      setForm({text: '', category: 'Geral'});
      setEditItem(null);
      setShowForm(false);
    } catch (e: any) {
      Alert.alert('Erro', e.message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteAnnotation(id: string) {
    Alert.alert('Excluir', 'Remover esta anotacao?', [
      {text: 'Cancelar', style: 'cancel'},
      {text: 'Excluir', style: 'destructive', onPress: async () => {
        await firestore().collection('annotations').doc(id).delete();
        setAnnotations(prev => prev.filter(a => a.id !== id));
      }},
    ]);
  }

  function editAnnotation(ann: Annotation) {
    setForm({text: ann.text, category: ann.category});
    setEditItem(ann);
    setShowForm(true);
  }

  // Processa texto bruto: normaliza espacos, capitaliza frases
  function processRawText(raw: string): string {
    const trimmed = raw.trim();
    if (!trimmed) return '';
    // Capitaliza primeira letra de cada frase
    return trimmed
      .replace(/.s+([a-z])/g, (m, c) => '. ' + c.toUpperCase())
      .replace(/^([a-z])/, c => c.toUpperCase());
  }

  function applyRawText() {
    if (!rawText.trim()) { Alert.alert('Erro', 'Digite algum texto'); return; }
    const processed = processRawText(rawText);
    setForm(f => ({...f, text: (f.text ? f.text + ' ' : '') + processed}));
    setRawText('');
    setShowTextHelper(false);
  }

  function catColor(cat: string): string {
    const map: Record<string, string> = {
      'Tecnico': Colors.cyan, 'Seguranca': '#ff3b3b', 'Material': '#f59e0b',
      'Equipe': '#a78bfa', 'Problema': '#ff3b3b', 'Geral': Colors.ink2,
    };
    return map[cat] || Colors.ink2;
  }

  const paged = annotations.slice(0, page * PAGE_SIZE);
  const hasMore = paged.length < annotations.length;

  if (!currentProject) {
    return (
      <View style={[s.container, {justifyContent: 'center', alignItems: 'center'}]}>
        <Text style={s.noProject}>Selecione um projeto primeiro</Text>
        <Text style={s.noProjectSub}>Va para a aba Projetos e selecione ou crie um</Text>
      </View>
    );
  }

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.screenTitle}>Anotacoes</Text>
        <Text style={s.projectName}>{currentProject.name}</Text>
      </View>

      <View style={s.topBar}>
        <TouchableOpacity style={s.newBtn} onPress={() => {
          setEditItem(null);
          setForm({text: '', category: 'Geral'});
          setShowForm(true);
        }}>
          <Text style={s.newBtnText}>+ Nova Anotacao</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.refreshBtn} onPress={() => {setRefreshing(true); loadAnnotations();}}>
          <Text style={s.refreshText}>Atualizar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={paged}
        keyExtractor={i => i.id}
        contentContainerStyle={s.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => {setRefreshing(true); loadAnnotations();}} tintColor={Colors.cyan} />
        }
        ListEmptyComponent={
          loading ? <ActivityIndicator color={Colors.cyan} style={{marginTop: 40}} /> :
          <Text style={s.empty}>Nenhuma anotacao. Adicione a primeira!</Text>
        }
        ListFooterComponent={hasMore ? (
          <TouchableOpacity style={s.loadMore} onPress={() => setPage(p => p + 1)}>
            <Text style={s.loadMoreText}>Carregar mais ({annotations.length - paged.length} restantes)</Text>
          </TouchableOpacity>
        ) : null}
        renderItem={({item}) => (
          <View style={s.card}>
            <View style={s.cardHeader}>
              <View style={[s.catBadge, {borderColor: catColor(item.category)}]}>
                <Text style={[s.catText, {color: catColor(item.category)}]}>{item.category}</Text>
              </View>
              <Text style={s.dateText}>{new Date(item.createdAt).toLocaleDateString('pt-BR')}</Text>
            </View>
            <Text style={s.annText}>{item.text}</Text>
            <View style={s.cardActions}>
              <TouchableOpacity onPress={() => editAnnotation(item)}>
                <Text style={s.editBtn}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteAnnotation(item.id)}>
                <Text style={s.deleteBtn}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Modal principal de nova/editar anotacao */}
      <Modal visible={showForm} animationType="slide" transparent onRequestClose={() => setShowForm(false)}>
        <View style={s.modalOverlay}>
          <View style={s.modalCard}>
            <Text style={s.modalTitle}>{editItem ? 'Editar Anotacao' : 'Nova Anotacao'}</Text>

            <TextInput
              style={s.textarea}
              value={form.text}
              onChangeText={t => setForm(f => ({...f, text: t}))}
              multiline
              numberOfLines={5}
              placeholder="Escreva sua anotacao..."
              placeholderTextColor={Colors.ink3}
              textAlignVertical="top"
              autoFocus
            />

            {/* Botao para abrir helper de digitacao rapida */}
            <TouchableOpacity style={s.textHelperBtn} onPress={() => setShowTextHelper(true)}>
              <Text style={s.textHelperBtnText}>+ Adicionar trecho de texto</Text>
            </TouchableOpacity>

            <Text style={s.catLabel}>Categoria</Text>
            <View style={s.chips}>
              {CATEGORIES.map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={[s.chip, form.category === cat && s.chipActive]}
                  onPress={() => setForm(f => ({...f, category: cat}))}>
                  <Text style={[s.chipText, form.category === cat && s.chipTextActive]}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={s.modalBtns}>
              <TouchableOpacity style={s.cancelBtn} onPress={() => setShowForm(false)}>
                <Text style={s.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.saveBtn} onPress={saveAnnotation} disabled={saving}>
                {saving
                  ? <ActivityIndicator color={Colors.bg} />
                  : <Text style={s.saveBtnText}>{editItem ? 'Atualizar' : 'Salvar'}</Text>
                }
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de helper de digitacao de texto livre */}
      <Modal visible={showTextHelper} animationType="fade" transparent onRequestClose={() => setShowTextHelper(false)}>
        <View style={s.modalOverlay}>
          <View style={s.helperCard}>
            <Text style={s.modalTitle}>Adicionar texto</Text>
            <Text style={s.helperInfo}>
              Digite ou cole um trecho de texto. Sera adicionado a anotacao com formatacao automatica de frases.
            </Text>
            <TextInput
              style={[s.textarea, {height: 100}]}
              value={rawText}
              onChangeText={setRawText}
              multiline
              placeholder="Digite aqui..."
              placeholderTextColor={Colors.ink3}
              textAlignVertical="top"
              autoFocus
            />
            <View style={s.modalBtns}>
              <TouchableOpacity style={s.cancelBtn} onPress={() => setShowTextHelper(false)}>
                <Text style={s.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.saveBtn} onPress={applyRawText}>
                <Text style={s.saveBtnText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.bg},
  header: {paddingHorizontal: 16, paddingTop: 60, paddingBottom: 10,
    borderBottomWidth: 1, borderBottomColor: Colors.line},
  screenTitle: {fontSize: 22, fontWeight: '700', color: Colors.ink},
  projectName: {fontSize: 13, color: Colors.cyan, marginTop: 2},
  topBar: {flexDirection: 'row', gap: 10, padding: 16, paddingBottom: 8},
  newBtn: {flex: 1, backgroundColor: Colors.cyan, borderRadius: 8, padding: 12, alignItems: 'center'},
  newBtnText: {color: Colors.bg, fontWeight: '700', fontSize: 13},
  refreshBtn: {borderWidth: 1, borderColor: Colors.line, borderRadius: 8,
    padding: 12, paddingHorizontal: 16},
  refreshText: {color: Colors.cyan, fontSize: 13, fontWeight: '600'},
  list: {padding: 12, paddingBottom: 100},
  card: {backgroundColor: Colors.bg1, borderWidth: 1, borderColor: Colors.line,
    borderRadius: 10, padding: 14, marginBottom: 10},
  cardHeader: {flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 8},
  catBadge: {borderWidth: 1, borderRadius: 5, paddingHorizontal: 8, paddingVertical: 3},
  catText: {fontSize: 11, fontWeight: '600'},
  dateText: {color: Colors.ink3, fontSize: 11},
  annText: {color: Colors.ink, fontSize: 14, lineHeight: 20},
  cardActions: {flexDirection: 'row', gap: 16, marginTop: 10,
    paddingTop: 8, borderTopWidth: 1, borderTopColor: Colors.line},
  editBtn: {color: Colors.cyan, fontSize: 13, fontWeight: '600'},
  deleteBtn: {color: '#ff3b3b', fontSize: 13, fontWeight: '600'},
  loadMore: {backgroundColor: Colors.bg2, borderRadius: 8, padding: 14,
    alignItems: 'center', margin: 8},
  loadMoreText: {color: Colors.cyan, fontWeight: '600'},
  empty: {textAlign: 'center', color: Colors.ink3, marginTop: 40, fontSize: 14},
  noProject: {color: Colors.ink, fontSize: 15, fontWeight: '600'},
  noProjectSub: {color: Colors.ink3, fontSize: 13, marginTop: 6},
  modalOverlay: {flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end'},
  modalCard: {backgroundColor: Colors.bg1, borderTopLeftRadius: 20, borderTopRightRadius: 20,
    padding: 20, paddingBottom: 40, borderTopWidth: 1, borderTopColor: Colors.line},
  helperCard: {backgroundColor: Colors.bg1, borderTopLeftRadius: 20, borderTopRightRadius: 20,
    padding: 20, paddingBottom: 40, borderTopWidth: 1, borderTopColor: Colors.line},
  modalTitle: {fontSize: 18, fontWeight: '700', color: Colors.ink, marginBottom: 14},
  helperInfo: {color: Colors.ink2, fontSize: 13, marginBottom: 12, lineHeight: 18},
  textarea: {backgroundColor: Colors.bg2, borderWidth: 1, borderColor: Colors.line,
    borderRadius: 8, padding: 12, color: Colors.ink, marginBottom: 10, fontSize: 14, height: 140},
  textHelperBtn: {borderWidth: 1, borderColor: Colors.line, borderRadius: 8,
    padding: 10, alignItems: 'center', marginBottom: 12},
  textHelperBtnText: {color: Colors.ink2, fontSize: 12, fontWeight: '600'},
  catLabel: {fontSize: 12, color: Colors.ink2, fontWeight: '600',
    textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8},
  chips: {flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14},
  chip: {borderWidth: 1, borderColor: Colors.line, borderRadius: 6,
    paddingHorizontal: 10, paddingVertical: 5},
  chipActive: {backgroundColor: 'rgba(0,212,255,0.15)', borderColor: Colors.cyan},
  chipText: {color: Colors.ink2, fontSize: 12},
  chipTextActive: {color: Colors.cyan, fontWeight: '600'},
  modalBtns: {flexDirection: 'row', gap: 10},
  cancelBtn: {flex: 1, borderWidth: 1, borderColor: Colors.line,
    borderRadius: 8, padding: 13, alignItems: 'center'},
  cancelText: {color: Colors.ink2, fontWeight: '600'},
  saveBtn: {flex: 1, backgroundColor: Colors.cyan, borderRadius: 8,
    padding: 13, alignItems: 'center'},
  saveBtnText: {color: Colors.bg, fontWeight: '700'},
});
