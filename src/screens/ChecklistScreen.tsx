import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Alert, ActivityIndicator, RefreshControl, TextInput,
} from 'react-native';
import { collection, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Colors } from '../theme';
import { useProject } from '../context/ProjectContext';

interface CheckItem {
  id: string; label: string; checked: boolean; obs: string;
}

const DEFAULT_ITEMS: CheckItem[] = [
  { id: 'epi', label: 'EPIs utilizados corretamente', checked: false, obs: '' },
  { id: 'sinalizacao', label: 'Sinalização de obra adequada', checked: false, obs: '' },
  { id: 'andaimes', label: 'Andaimes e escadas em bom estado', checked: false, obs: '' },
  { id: 'extintores', label: 'Extintores acessíveis e válidos', checked: false, obs: '' },
  { id: 'eletrica', label: 'Instalação elétrica segura', checked: false, obs: '' },
  { id: 'limpeza', label: 'Limpeza e organização do canteiro', checked: false, obs: '' },
  { id: 'documentos', label: 'Documentos em dia', checked: false, obs: '' },
  { id: 'residuos', label: 'Descarte de resíduos correto', checked: false, obs: '' },
];

export default function ChecklistScreen() {
  const { currentProject, user } = useProject();
  const [items, setItems] = useState<CheckItem[]>(DEFAULT_ITEMS);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const docId = currentProject && user ? currentProject.id + '_' + user.uid : null;

  const loadChecklist = useCallback(async () => {
    if (!docId) return;
    try {
      const snap = await getDoc(doc(db, 'checklists', docId));
      // exists is a boolean property in the JS SDK v9 modular API
      if (snap.exists()) {
        const data = snap.data();
        if (data?.items?.length > 0) setItems(data.items as CheckItem[]);
      }
    } catch (e: any) {
      Alert.alert('Erro', e.message);
    } finally {
      setRefreshing(false);
    }
  }, [docId]);

  useEffect(() => { loadChecklist(); }, [currentProject]);

  async function save(list: CheckItem[]) {
    if (!docId) return;
    try {
      await setDoc(doc(db, 'checklists', docId), {
        items: list,
        projectId: currentProject?.id,
        savedAt: serverTimestamp(),
      });
    } catch (e: any) {
      Alert.alert('Erro ao salvar', e.message);
    }
  }

  function toggle(id: string) {
    const updated = items.map(i => i.id === id ? { ...i, checked: !i.checked } : i);
    setItems(updated);
  }

  async function saveAll() {
    setLoading(true);
    await save(items);
    setLoading(false);
    Alert.alert('Sucesso', 'Checklist salvo!');
  }

  function addItem() {
    if (!newItem.trim()) return;
    const item: CheckItem = {
      id: Date.now().toString(), label: newItem.trim(), checked: false, obs: '',
    };
    const updated = [...items, item];
    setItems(updated);
    setNewItem('');
    setShowAdd(false);
  }

  function removeItem(id: string) {
    const updated = items.filter(i => i.id !== id);
    setItems(updated);
  }

  const checked = items.filter(i => i.checked).length;
  const pct = items.length > 0 ? Math.round(checked / items.length * 100) : 0;

  if (!currentProject) return (
    <View style={[s.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={s.noProject}>Selecione um projeto primeiro</Text>
    </View>
  );

  return (
    <ScrollView
      style={s.container}
      contentContainerStyle={s.content}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => { setRefreshing(true); loadChecklist(); }}
          tintColor={Colors.cyan}
        />
      }>

      <View style={s.header}>
        <Text style={s.screenTitle}>Checklist</Text>
        <Text style={s.projectName}>{currentProject.name}</Text>
      </View>

      <View style={s.progressCard}>
        <View style={s.progressHeader}>
          <Text style={s.progressLabel}>Conformidade</Text>
          <Text style={s.progressPct}>{pct}%</Text>
        </View>
        <View style={s.progressBar}>
          <View style={[s.progressFill, { width: pct + '%' as any }]} />
        </View>
        <Text style={s.progressSub}>{checked} de {items.length} itens</Text>
      </View>

      {items.map(item => (
        <View key={item.id} style={s.item}>
          <TouchableOpacity
            style={[s.checkbox, item.checked && s.checkboxChecked]}
            onPress={() => toggle(item.id)}>
            {item.checked && <Text style={s.checkmark}>✓</Text>}
          </TouchableOpacity>
          <View style={s.itemContent}>
            <Text style={[s.itemLabel, item.checked && s.itemChecked]}>{item.label}</Text>
            <TextInput
              style={s.obsInput}
              value={item.obs}
              onChangeText={v => setItems(prev => prev.map(i => i.id === item.id ? { ...i, obs: v } : i))}
              placeholder="Observação..."
              placeholderTextColor={Colors.ink3}
              multiline
            />
          </View>
          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <Text style={s.removeBtn}>✕</Text>
          </TouchableOpacity>
        </View>
      ))}

      {showAdd && (
        <View style={s.addForm}>
          <TextInput
            style={s.input}
            value={newItem}
            onChangeText={setNewItem}
            placeholder="Novo item..."
            placeholderTextColor={Colors.ink3}
            autoFocus
          />
          <TouchableOpacity style={s.addConfirm} onPress={addItem}>
            <Text style={s.addConfirmText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={s.buttons}>
        <TouchableOpacity style={s.addItemBtn} onPress={() => setShowAdd(!showAdd)}>
          <Text style={s.addItemText}>+ Item</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.saveBtn} onPress={saveAll} disabled={loading}>
          {loading
            ? <ActivityIndicator color={Colors.bg} />
            : <Text style={s.saveBtnText}>Salvar Checklist</Text>
          }
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  content: { padding: 16, paddingTop: 60, paddingBottom: 100 },
  header: { marginBottom: 16 },
  screenTitle: { fontSize: 22, fontWeight: '700', color: Colors.ink },
  projectName: { fontSize: 13, color: Colors.cyan, marginTop: 2 },
  progressCard: { backgroundColor: Colors.bg1, borderWidth: 1, borderColor: Colors.line, borderRadius: 12, padding: 16, marginBottom: 16 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  progressLabel: { color: Colors.ink2, fontSize: 13, fontWeight: '600' },
  progressPct: { color: Colors.cyan, fontSize: 24, fontWeight: '700' },
  progressBar: { height: 8, backgroundColor: Colors.bg3, borderRadius: 4, marginBottom: 8 },
  progressFill: { height: 8, backgroundColor: Colors.cyan, borderRadius: 4 },
  progressSub: { color: Colors.ink3, fontSize: 12 },
  item: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, backgroundColor: Colors.bg1, borderWidth: 1, borderColor: Colors.line, borderRadius: 10, padding: 14, marginBottom: 8 },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: Colors.line, justifyContent: 'center', alignItems: 'center', marginTop: 1 },
  checkboxChecked: { borderColor: Colors.green, backgroundColor: Colors.green },
  checkmark: { color: 'white', fontSize: 13, fontWeight: '700' },
  itemContent: { flex: 1 },
  itemLabel: { color: Colors.ink, fontSize: 14, fontWeight: '500' },
  itemChecked: { color: Colors.ink3, textDecorationLine: 'line-through' },
  obsInput: { color: Colors.ink2, fontSize: 12, marginTop: 4, paddingVertical: 4 },
  removeBtn: { color: Colors.red, fontSize: 14, fontWeight: '700' },
  addForm: { backgroundColor: Colors.bg2, borderRadius: 10, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: Colors.line },
  input: { backgroundColor: Colors.bg3, borderWidth: 1, borderColor: Colors.line, borderRadius: 8, padding: 12, color: Colors.ink, marginBottom: 8, fontSize: 14 },
  addConfirm: { backgroundColor: Colors.cyan, borderRadius: 8, padding: 10, alignItems: 'center' },
  addConfirmText: { color: Colors.bg, fontWeight: '700' },
  buttons: { flexDirection: 'row', gap: 12, marginTop: 8 },
  addItemBtn: { borderWidth: 1, borderColor: Colors.line, borderRadius: 10, padding: 14, alignItems: 'center', flex: 1 },
  addItemText: { color: Colors.ink2, fontWeight: '600' },
  saveBtn: { flex: 2, backgroundColor: Colors.cyan, borderRadius: 10, padding: 14, alignItems: 'center' },
  saveBtnText: { color: Colors.bg, fontWeight: '700', fontSize: 15 },
  noProject: { color: Colors.ink, fontSize: 15, fontWeight: '600' },
});
