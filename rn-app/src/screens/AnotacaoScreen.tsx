import React, {useState, useEffect, useCallback} from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  FlatList, Alert, ActivityIndicator, RefreshControl, Modal,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Colors} from '../theme';
import {useProject} from '../context/ProjectContext';

interface Annotation {
  id: string; text: string; category: string; createdAt: string;
}

const CATEGORIES = ['Geral','Técnico','Segurança','Material','Equipe','Problema'];
const PAGE_SIZE = 10;

export default function AnotacaoScreen() {
  const {currentProject, user} = useProject();
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({text:'', category:'Geral'});
  const [saving, setSaving] = useState(false);
  const [editItem, setEditItem] = useState<Annotation|null>(null);

  const loadAnnotations = useCallback(async () => {
    if (!currentProject || !user) return;
    try {
      const snap = await firestore()
        .collection('annotations')
        .where('projectId','==',currentProject.id)
        .where('owner','==',user.uid)
        .orderBy('createdAt','desc')
        .limit(100)
        .get();
      setAnnotations(snap.docs.map(d => ({id:d.id, ...(d.data() as any)})));
    } catch (e: any) {
      Alert.alert('Erro', e.message);
    } finally {
      setRefreshing(false);
    }
  }, [currentProject, user]);

  useEffect(() => { setPage(1); loadAnnotations(); }, [currentProject]);

  async function saveAnnotation() {
    if (!form.text.trim()) { Alert.alert('Erro','Escreva a anotação'); return; }
    if (!currentProject || !user) { Alert.alert('Aviso','Selecione um projeto'); return; }
    setSaving(true);
    try {
      if (editItem) {
        await firestore().collection('annotations').doc(editItem.id).update({
          text: form.text.trim(), category: form.category,
        });
        setAnnotations(prev => prev.map(a => a.id===editItem.id
          ? {...a, text:form.text.trim(), category:form.category} : a));
      } else {
        const ref = firestore().collection('annotations').doc();
        const ann: Annotation = {
          id: ref.id, text: form.text.trim(), category: form.category,
          createdAt: new Date().toISOString(),
        };
        await ref.set({...ann, projectId: currentProject.id, owner: user.uid});
        setAnnotations(prev => [ann, ...prev]);
      }
      setForm({text:'',category:'Geral'});
      setEditItem(null);
      setShowForm(false);
    } catch (e: any) {
      Alert.alert('Erro', e.message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteAnnotation(id: string) {
    Alert.alert('Excluir','Remover esta anotação?',[
      {text:'Cancelar',style:'cancel'},
      {text:'Excluir',style:'destructive',onPress: async () => {
        await firestore().collection('annotations').doc(id).delete();
        setAnnotations(prev => prev.filter(a => a.id !== id));
      }},
    ]);
  }

  function editAnnotation(ann: Annotation) {
    setForm({text:ann.text, category:ann.category});
    setEditItem(ann);
    setShowForm(true);
  }

  function catColor(cat: string): string {
    const map: Record<string,string> = {
      'Técnico':Colors.cyan,'Segurança':Colors.red,'Material':Colors.amber,
      'Equipe':Colors.purple,'Problema':Colors.red,'Geral':Colors.ink2,
    };
    return map[cat] || Colors.ink2;
  }

  const paged = annotations.slice(0, page * PAGE_SIZE);
  const hasMore = paged.length < annotations.length;

  if (!currentProject) return (
    <View style={[s.container, {justifyContent:'center',alignItems:'center'}]}>
      <Text style={s.noProject}>Selecione um projeto primeiro</Text>
    </View>
  );

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.screenTitle}>Anotações</Text>
        <Text style={s.projectName}>{currentProject.name}</Text>
      </View>

      <TouchableOpacity style={s.newBtn} onPress={() => {setEditItem(null);setForm({text:'',category:'Geral'});setShowForm(true);}}>
        <Text style={s.newBtnText}>+ Nova Anotação</Text>
      </TouchableOpacity>

      <FlatList
        data={paged}
        keyExtractor={i => i.id}
        contentContainerStyle={s.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{setRefreshing(true);loadAnnotations();}} tintColor={Colors.cyan}/>}
        ListEmptyComponent={!loading ? <Text style={s.empty}>Nenhuma anotação. Adicione a primeira!</Text> : null}
        ListFooterComponent={hasMore ? (
          <TouchableOpacity style={s.loadMore} onPress={() => setPage(p => p+1)}>
            <Text style={s.loadMoreText}>Carregar mais ({annotations.length-paged.length} restantes)</Text>
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

      <Modal visible={showForm} animationType="slide" transparent onRequestClose={() => setShowForm(false)}>
        <View style={s.modalOverlay}>
          <View style={s.modalCard}>
            <Text style={s.modalTitle}>{editItem ? 'Editar Anotação' : 'Nova Anotação'}</Text>
            <TextInput style={s.textarea} value={form.text}
              onChangeText={v => setForm(f => ({...f,text:v}))}
              multiline numberOfLines={6} placeholder="Escreva sua anotação..."
              placeholderTextColor={Colors.ink3} textAlignVertical="top"
              autoFocus />
            <Text style={s.catLabel}>Categoria</Text>
            <View style={s.chips}>
              {CATEGORIES.map(cat => (
                <TouchableOpacity key={cat} style={[s.chip, form.category===cat && s.chipActive]}
                  onPress={() => setForm(f => ({...f,category:cat}))}>
                  <Text style={[s.chipText, form.category===cat && s.chipTextActive]}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={s.modalBtns}>
              <TouchableOpacity style={s.cancelBtn} onPress={() => setShowForm(false)}>
                <Text style={s.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.saveBtn} onPress={saveAnnotation} disabled={saving}>
                {saving ? <ActivityIndicator color={Colors.bg} /> :
                  <Text style={s.saveBtnText}>{editItem ? 'Atualizar' : 'Salvar'}</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  container:{flex:1,backgroundColor:Colors.bg},
  header:{paddingHorizontal:16,paddingTop:60,paddingBottom:12,borderBottomWidth:1,borderBottomColor:Colors.line},
  screenTitle:{fontSize:22,fontWeight:'700',color:Colors.ink},
  projectName:{fontSize:13,color:Colors.cyan,marginTop:2},
  newBtn:{marginHorizontal:16,marginTop:12,backgroundColor:Colors.cyan,borderRadius:10,
    padding:12,alignItems:'center'},
  newBtnText:{color:Colors.bg,fontWeight:'700',fontSize:14},
  list:{padding:16,paddingBottom:100},
  card:{backgroundColor:Colors.bg1,borderWidth:1,borderColor:Colors.line,
    borderRadius:10,padding:14,marginBottom:10},
  cardHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:8},
  catBadge:{borderWidth:1,borderRadius:20,paddingHorizontal:10,paddingVertical:3},
  catText:{fontSize:11,fontWeight:'600'},
  dateText:{color:Colors.ink3,fontSize:12},
  annText:{color:Colors.ink,fontSize:14,lineHeight:22},
  cardActions:{flexDirection:'row',gap:16,marginTop:10,paddingTop:8,
    borderTopWidth:1,borderTopColor:Colors.line},
  editBtn:{color:Colors.cyan,fontSize:13,fontWeight:'600'},
  deleteBtn:{color:Colors.red,fontSize:13,fontWeight:'600'},
  loadMore:{backgroundColor:Colors.bg2,borderRadius:8,padding:12,alignItems:'center',margin:4},
  loadMoreText:{color:Colors.cyan,fontWeight:'600'},
  empty:{textAlign:'center',color:Colors.ink3,marginTop:40,fontSize:14},
  noProject:{color:Colors.ink,fontSize:15,fontWeight:'600'},
  modalOverlay:{flex:1,backgroundColor:'rgba(0,0,0,0.7)',justifyContent:'flex-end'},
  modalCard:{backgroundColor:Colors.bg1,borderTopLeftRadius:20,borderTopRightRadius:20,
    borderWidth:1,borderColor:Colors.line,padding:24,paddingBottom:40},
  modalTitle:{fontSize:18,fontWeight:'700',color:Colors.ink,marginBottom:16},
  textarea:{backgroundColor:Colors.bg2,borderWidth:1,borderColor:Colors.line,
    borderRadius:8,padding:12,color:Colors.ink,marginBottom:16,fontSize:14,height:140},
  catLabel:{fontSize:12,color:Colors.ink2,fontWeight:'600',marginBottom:8,textTransform:'uppercase'},
  chips:{flexDirection:'row',flexWrap:'wrap',gap:8,marginBottom:20},
  chip:{borderWidth:1,borderColor:Colors.line,borderRadius:20,paddingHorizontal:12,paddingVertical:6},
  chipActive:{backgroundColor:Colors.cyan3,borderColor:Colors.cyan},
  chipText:{color:Colors.ink2,fontSize:12},
  chipTextActive:{color:Colors.cyan},
  modalBtns:{flexDirection:'row',gap:12},
  cancelBtn:{flex:1,borderWidth:1,borderColor:Colors.line,borderRadius:10,
    padding:14,alignItems:'center'},
  cancelText:{color:Colors.ink2,fontWeight:'600'},
  saveBtn:{flex:1,backgroundColor:Colors.cyan,borderRadius:10,padding:14,alignItems:'center'},
  saveBtnText:{color:Colors.bg,fontWeight:'700'},
});
