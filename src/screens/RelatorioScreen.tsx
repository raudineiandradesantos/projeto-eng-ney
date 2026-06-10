import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Alert, ActivityIndicator, RefreshControl, Share,
} from 'react-native';
import {
  collection, query, where, orderBy, limit, getDocs, doc, getDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { Colors } from '../theme';
import { useProject } from '../context/ProjectContext';

interface RDO {
  id: string; date: string; weather: string; activities: any[];
  notes: string; workers: number; projectId: string;
}

interface Annotation {
  id: string; text: string; category: string; createdAt: string;
}

interface CheckItem {
  id: string; label: string; checked: boolean; obs: string;
}

const PAGE_SIZE = 10;

export default function RelatorioScreen() {
  const { currentProject, user } = useProject();
  const [rdos, setRdos] = useState<RDO[]>([]);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [checkItems, setCheckItems] = useState<CheckItem[]>([]);
  const [photoCount, setPhotoCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [generating, setGenerating] = useState(false);

  const loadData = useCallback(async () => {
    if (!currentProject || !user) return;
    setLoading(true);
    try {
      const projectId = currentProject.id;
      const uid = user.uid;

      // Carrega RDOs
      const rdoSnap = await getDocs(query(
        collection(db, 'rdos'),
        where('projectId', '==', projectId),
        where('owner', '==', uid),
        orderBy('date', 'desc'),
        limit(100),
      ));
      setRdos(rdoSnap.docs.map(d => ({ id: d.id, ...(d.data() as any) })));

      // Carrega Anotacoes
      const annSnap = await getDocs(query(
        collection(db, 'annotations'),
        where('projectId', '==', projectId),
        where('owner', '==', uid),
        orderBy('createdAt', 'desc'),
        limit(50),
      ));
      setAnnotations(annSnap.docs.map(d => ({ id: d.id, ...(d.data() as any) })));

      // Carrega Checklist e Fotos em paralelo
      const docId = projectId + '_' + uid;
      const [checkSnap, photoSnap] = await Promise.all([
        getDoc(doc(db, 'checklists', docId)),
        getDoc(doc(db, 'photos', docId)),
      ]);

      // exists is a boolean property in the JS SDK v9 modular API
      if (checkSnap.exists()) {
        const data = checkSnap.data();
        setCheckItems((data?.items || []) as CheckItem[]);
      } else {
        setCheckItems([]);
      }
      if (photoSnap.exists()) {
        const data = photoSnap.data();
        setPhotoCount((data?.photos || []).length);
      } else {
        setPhotoCount(0);
      }
    } catch (e: any) {
      Alert.alert('Erro', 'Falha ao carregar relatorio: ' + e.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [currentProject, user]);

  useEffect(() => {
    setPage(1);
    loadData();
  }, [currentProject]);

  function generateText(): string {
    if (!currentProject) return '';
    const lines: string[] = [];
    const now = new Date().toLocaleString('pt-BR');

    lines.push('=== RELATORIO TECNICO DE OBRA ===');
    lines.push('Gerado em: ' + now);
    lines.push('');
    lines.push('PROJETO: ' + currentProject.name);
    lines.push('Tipo: ' + currentProject.type);
    lines.push('Cliente: ' + (currentProject.client || '-'));
    lines.push('Endereco: ' + (currentProject.address || '-'));
    lines.push('Status: ' + currentProject.status);
    lines.push('');

    // Resumo
    const totalActivities = rdos.reduce((sum, r) => sum + (r.activities?.length || 0), 0);
    const totalWorkers = rdos.reduce((sum, r) => sum + (r.workers || 0), 0);
    const doneChecks = checkItems.filter(c => c.checked).length;
    lines.push('=== RESUMO ===');
    lines.push('RDOs registrados: ' + rdos.length);
    lines.push('Total de atividades: ' + totalActivities);
    lines.push('Total trabalhadores (soma RDOs): ' + totalWorkers);
    lines.push('Anotacoes: ' + annotations.length);
    lines.push('Fotos: ' + photoCount);
    lines.push('Checklist: ' + doneChecks + '/' + checkItems.length + ' itens concluidos');
    lines.push('');

    // RDOs
    if (rdos.length > 0) {
      lines.push('=== DIARIO DE OBRA (RDOs) ===');
      rdos.slice(0, 20).forEach((rdo, i) => {
        lines.push('');
        lines.push('[RDO ' + (i + 1) + '] ' + rdo.date + ' - Tempo: ' + (rdo.weather || '-'));
        lines.push('Trabalhadores: ' + (rdo.workers || 0));
        if (rdo.activities?.length > 0) {
          lines.push('Atividades:');
          rdo.activities.forEach((a: any) => {
            lines.push('  - ' + a.desc + (a.qty ? ' (' + a.qty + ' ' + (a.unit || '') + ')' : ''));
          });
        }
        if (rdo.notes) lines.push('Obs: ' + rdo.notes);
      });
      lines.push('');
    }

    // Anotacoes
    if (annotations.length > 0) {
      lines.push('=== ANOTACOES ===');
      annotations.slice(0, 15).forEach(ann => {
        lines.push('[' + ann.category + '] ' + new Date(ann.createdAt).toLocaleDateString('pt-BR') + ': ' + ann.text);
      });
      lines.push('');
    }

    // Checklist
    if (checkItems.length > 0) {
      lines.push('=== CHECKLIST ===');
      checkItems.forEach(item => {
        lines.push((item.checked ? '[X] ' : '[ ] ') + item.label);
      });
      lines.push('');
    }

    lines.push('=== FIM DO RELATORIO ===');
    return lines.join('\n');
  }

  async function shareReport() {
    if (!currentProject) { Alert.alert('Aviso', 'Selecione um projeto'); return; }
    setGenerating(true);
    try {
      const text = generateText();
      await Share.share({
        title: 'Relatorio - ' + currentProject.name,
        message: text,
      });
    } catch (e: any) {
      if (e.message !== 'User did not share') {
        Alert.alert('Erro', e.message);
      }
    } finally {
      setGenerating(false);
    }
  }

  const paged = rdos.slice(0, page * PAGE_SIZE);
  const hasMore = paged.length < rdos.length;
  const totalWorkers = rdos.reduce((sum, r) => sum + (r.workers || 0), 0);
  const totalActivities = rdos.reduce((sum, r) => sum + (r.activities?.length || 0), 0);
  const doneChecks = checkItems.filter(c => c.checked).length;

  if (!currentProject) {
    return (
      <View style={[s.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={s.noProject}>Selecione um projeto primeiro</Text>
        <Text style={s.noProjectSub}>Va para a aba Projetos e selecione ou crie um</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={s.container}
      contentContainerStyle={s.content}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadData(); }} tintColor={Colors.cyan} />
      }>

      <View style={s.header}>
        <Text style={s.screenTitle}>Relatorio</Text>
        <Text style={s.projectName}>{currentProject.name}</Text>
        <Text style={s.projectMeta}>{currentProject.type} | {currentProject.status}</Text>
      </View>

      {loading && <ActivityIndicator color={Colors.cyan} style={{ marginVertical: 16 }} />}

      <View style={s.statsRow}>
        <View style={s.statCard}>
          <Text style={s.statNum}>{rdos.length}</Text>
          <Text style={s.statLabel}>RDOs</Text>
        </View>
        <View style={s.statCard}>
          <Text style={s.statNum}>{totalActivities}</Text>
          <Text style={s.statLabel}>ATIVIDADES</Text>
        </View>
        <View style={s.statCard}>
          <Text style={s.statNum}>{annotations.length}</Text>
          <Text style={s.statLabel}>ANOTACOES</Text>
        </View>
        <View style={s.statCard}>
          <Text style={s.statNum}>{photoCount}</Text>
          <Text style={s.statLabel}>FOTOS</Text>
        </View>
      </View>

      {checkItems.length > 0 && (
        <View style={s.checkCard}>
          <Text style={s.cardTitle}>Checklist</Text>
          <Text style={s.checkProgress}>{doneChecks}/{checkItems.length} itens concluidos</Text>
          <View style={s.progressBar}>
            <View style={[s.progressFill, {
              width: (checkItems.length > 0 ? (doneChecks / checkItems.length * 100) + '%' : '0%') as `${number}%` | '0%',
            }]} />
          </View>
        </View>
      )}

      <View style={s.infoCard}>
        <Text style={s.cardTitle}>Informacoes do Projeto</Text>
        <Row label="Tipo" value={currentProject.type} />
        <Row label="Cliente" value={currentProject.client || '-'} />
        <Row label="Endereco" value={currentProject.address || '-'} />
        <Row label="Status" value={currentProject.status} />
        <Row label="Trabalhadores (total)" value={String(totalWorkers)} />
      </View>

      <View style={s.actionRow}>
        <TouchableOpacity style={s.shareBtn} onPress={shareReport} disabled={generating}>
          {generating
            ? <ActivityIndicator color={Colors.bg} />
            : <Text style={s.shareBtnText}>Compartilhar Relatorio</Text>
          }
        </TouchableOpacity>
        <TouchableOpacity style={s.refreshBtn} onPress={() => { setRefreshing(true); loadData(); }}>
          <Text style={s.refreshText}>Atualizar</Text>
        </TouchableOpacity>
      </View>

      <View style={s.sectionHeader}>
        <Text style={s.sectionTitle}>Historico de RDOs</Text>
        <Text style={s.sectionCount}>{rdos.length} registros</Text>
      </View>

      {paged.map(rdo => (
        <View key={rdo.id} style={s.rdoCard}>
          <View style={s.rdoHeader}>
            <Text style={s.rdoDate}>{rdo.date}</Text>
            <Text style={s.rdoWeather}>{rdo.weather || '-'}</Text>
          </View>
          <Text style={s.rdoMeta}>{rdo.workers || 0} trabalhadores * {rdo.activities?.length || 0} atividades</Text>
          {rdo.activities?.slice(0, 3).map((a: any, i: number) => (
            <Text key={i} style={s.actItem}>* {a.desc}{a.qty ? ' (' + a.qty + ' ' + (a.unit || '') + ')' : ''}</Text>
          ))}
          {rdo.activities?.length > 3 && (
            <Text style={s.moreActs}>+{rdo.activities.length - 3} atividades</Text>
          )}
          {rdo.notes ? <Text style={s.rdoNotes}>Obs: {rdo.notes}</Text> : null}
        </View>
      ))}

      {hasMore && (
        <TouchableOpacity style={s.loadMore} onPress={() => setPage(p => p + 1)}>
          <Text style={s.loadMoreText}>Ver mais ({rdos.length - paged.length} restantes)</Text>
        </TouchableOpacity>
      )}

      {rdos.length === 0 && !loading && (
        <Text style={s.empty}>Nenhum RDO registrado ainda</Text>
      )}

      {annotations.length > 0 && (
        <>
          <View style={[s.sectionHeader, { marginTop: 8 }]}>
            <Text style={s.sectionTitle}>Ultimas Anotacoes</Text>
            <Text style={s.sectionCount}>{annotations.length} total</Text>
          </View>
          {annotations.slice(0, 5).map(ann => (
            <View key={ann.id} style={s.annCard}>
              <Text style={s.annCategory}>{ann.category}</Text>
              <Text style={s.annText}>{ann.text}</Text>
              <Text style={s.annDate}>{new Date(ann.createdAt).toLocaleDateString('pt-BR')}</Text>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={rs.row}>
      <Text style={rs.label}>{label}</Text>
      <Text style={rs.value}>{value}</Text>
    </View>
  );
}

const rs = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: 'rgba(38,51,84,0.5)' },
  label: { color: Colors.ink2, fontSize: 13 },
  value: { color: Colors.ink, fontSize: 13, fontWeight: '500', flex: 1, textAlign: 'right' },
});

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  content: { padding: 16, paddingTop: 60, paddingBottom: 100 },
  header: { marginBottom: 16 },
  screenTitle: { fontSize: 22, fontWeight: '700', color: Colors.ink },
  projectName: { fontSize: 15, color: Colors.cyan, marginTop: 2, fontWeight: '600' },
  projectMeta: { fontSize: 12, color: Colors.ink3, marginTop: 2 },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  statCard: { flex: 1, backgroundColor: Colors.bg1, borderWidth: 1, borderColor: Colors.line, borderRadius: 10, padding: 12, alignItems: 'center' },
  statNum: { fontSize: 22, fontWeight: '700', color: Colors.cyan },
  statLabel: { fontSize: 9, color: Colors.ink2, fontWeight: '600', letterSpacing: 0.5, marginTop: 2 },
  checkCard: { backgroundColor: Colors.bg1, borderWidth: 1, borderColor: Colors.line, borderRadius: 10, padding: 14, marginBottom: 10 },
  checkProgress: { color: Colors.ink2, fontSize: 13, marginBottom: 8 },
  progressBar: { height: 6, backgroundColor: Colors.bg2, borderRadius: 3 },
  progressFill: { height: 6, backgroundColor: Colors.cyan, borderRadius: 3 },
  infoCard: { backgroundColor: Colors.bg1, borderWidth: 1, borderColor: Colors.line, borderRadius: 10, padding: 14, marginBottom: 12 },
  cardTitle: { fontSize: 11, color: Colors.ink2, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 10 },
  actionRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  shareBtn: { flex: 1, backgroundColor: Colors.cyan, borderRadius: 8, padding: 13, alignItems: 'center' },
  shareBtnText: { color: Colors.bg, fontWeight: '700', fontSize: 13 },
  refreshBtn: { borderWidth: 1, borderColor: Colors.line, borderRadius: 8, padding: 13, paddingHorizontal: 16 },
  refreshText: { color: Colors.cyan, fontSize: 13, fontWeight: '600' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.ink },
  sectionCount: { fontSize: 12, color: Colors.ink3 },
  rdoCard: { backgroundColor: Colors.bg1, borderWidth: 1, borderColor: Colors.line, borderRadius: 10, padding: 12, marginBottom: 8 },
  rdoHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  rdoDate: { color: Colors.cyan, fontWeight: '600', fontSize: 13 },
  rdoWeather: { color: Colors.ink2, fontSize: 13 },
  rdoMeta: { color: Colors.ink3, fontSize: 11, marginBottom: 4 },
  actItem: { color: Colors.ink2, fontSize: 12, lineHeight: 18 },
  moreActs: { color: Colors.ink3, fontSize: 11, marginTop: 2, fontStyle: 'italic' },
  rdoNotes: { color: Colors.ink2, fontSize: 12, marginTop: 4, fontStyle: 'italic' },
  loadMore: { backgroundColor: Colors.bg2, borderRadius: 8, padding: 14, alignItems: 'center', marginBottom: 12 },
  loadMoreText: { color: Colors.cyan, fontWeight: '600' },
  empty: { textAlign: 'center', color: Colors.ink3, marginVertical: 20, fontSize: 14 },
  noProject: { color: Colors.ink, fontSize: 15, fontWeight: '600' },
  noProjectSub: { color: Colors.ink3, fontSize: 13, marginTop: 6 },
  annCard: { backgroundColor: Colors.bg1, borderWidth: 1, borderColor: Colors.line, borderRadius: 10, padding: 12, marginBottom: 8 },
  annCategory: { fontSize: 10, color: Colors.cyan, fontWeight: '600', textTransform: 'uppercase', marginBottom: 4 },
  annText: { color: Colors.ink, fontSize: 13, lineHeight: 18 },
  annDate: { color: Colors.ink3, fontSize: 11, marginTop: 4 },
});
