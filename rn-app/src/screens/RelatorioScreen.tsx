import React, {useState, useEffect, useCallback} from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Alert, ActivityIndicator, RefreshControl, Share,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Colors} from '../theme';
import {useProject} from '../context/ProjectContext';

interface RDO {
  date: string; weather: string; activities: any[];
  notes: string; workers: number;
}

const PAGE_SIZE = 5;

export default function RelatorioScreen() {
  const {currentProject, user} = useProject();
  const [rdos, setRdos] = useState<RDO[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [generating, setGenerating] = useState(false);

  const loadRdos = useCallback(async () => {
    if (!currentProject || !user) return;
    setLoading(true);
    try {
      const snap = await firestore()
        .collection('rdos')
        .where('projectId','==',currentProject.id)
        .where('owner','==',user.uid)
        .orderBy('date','desc')
        .limit(50)
        .get();
      setRdos(snap.docs.map(d => d.data() as RDO));
    } catch (e: any) {
      Alert.alert('Erro', 'Falha ao carregar relatórios: ' + e.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [currentProject, user]);

  useEffect(() => { setPage(1); loadRdos(); }, [currentProject]);

  function generateText(): string {
    if (!currentProject) return '';
    const lines: string[] = [
      '=== RELATÓRIO TÉCNICO DE OBRA ===',
      '',
      'Projeto: ' + currentProject.name,
      'Tipo: ' + currentProject.type,
      'Cliente: ' + (currentProject.client || '-'),
      'Endereço: ' + (currentProject.address || '-'),
      'Status: ' + currentProject.status,
      '',
      '=== RDOs (' + rdos.length + ' registros) ===',
    ];
    rdos.slice(0, 10).forEach((rdo, i) => {
      lines.push('');
      lines.push('--- RDO ' + (i+1) + ' (' + rdo.date + ') ---');
      lines.push('Tempo: ' + rdo.weather);
      lines.push('Trabalhadores: ' + (rdo.workers || 0));
      if (rdo.activities?.length) {
        lines.push('Atividades:');
        rdo.activities.forEach(a => lines.push('  • ' + a.desc + (a.qty ? ' (' + a.qty + ' ' + a.unit + ')' : '')));
      }
      if (rdo.notes) lines.push('Obs: ' + rdo.notes);
    });
    lines.push('');
    lines.push('Gerado em: ' + new Date().toLocaleString('pt-BR'));
    return lines.join('\n');
  }

  async function shareReport() {
    if (!currentProject) { Alert.alert('Aviso','Selecione um projeto'); return; }
    setGenerating(true);
    try {
      const text = generateText();
      await Share.share({
        title: 'Relatório - ' + currentProject.name,
        message: text,
      });
    } catch (e: any) {
      Alert.alert('Erro', e.message);
    } finally {
      setGenerating(false);
    }
  }

  const paged = rdos.slice(0, page * PAGE_SIZE);
  const hasMore = paged.length < rdos.length;

  const totalWorkers = rdos.reduce((s, r) => s + (r.workers||0), 0);
  const totalActivities = rdos.reduce((s, r) => s + (r.activities?.length||0), 0);

  if (!currentProject) return (
    <View style={[s.container, {justifyContent:'center',alignItems:'center'}]}>
      <Text style={s.noProject}>Selecione um projeto primeiro</Text>
    </View>
  );

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{setRefreshing(true);loadRdos();}} tintColor={Colors.cyan}/>}>

      <View style={s.header}>
        <Text style={s.screenTitle}>Relatório</Text>
        <Text style={s.projectName}>{currentProject.name}</Text>
      </View>

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
          <Text style={s.statNum}>{totalWorkers}</Text>
          <Text style={s.statLabel}>TRABALHADORES</Text>
        </View>
      </View>

      <View style={s.infoCard}>
        <Text style={s.cardTitle}>Informações do Projeto</Text>
        <Row label="Tipo" value={currentProject.type} />
        <Row label="Cliente" value={currentProject.client || '-'} />
        <Row label="Endereço" value={currentProject.address || '-'} />
        <Row label="Status" value={currentProject.status} />
      </View>

      <TouchableOpacity style={s.shareBtn} onPress={shareReport} disabled={generating}>
        {generating ? <ActivityIndicator color={Colors.bg} /> :
          <Text style={s.shareBtnText}>Compartilhar Relatório</Text>}
      </TouchableOpacity>

      <View style={s.sectionHeader}>
        <Text style={s.sectionTitle}>Histórico de RDOs</Text>
        <TouchableOpacity onPress={() => {setRefreshing(true); loadRdos();}}>
          <Text style={s.refreshText}>Atualizar</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator color={Colors.cyan} style={{marginVertical:16}} />}

      {paged.map((rdo, i) => (
        <View key={i} style={s.rdoCard}>
          <View style={s.rdoHeader}>
            <Text style={s.rdoDate}>{rdo.date}</Text>
            <Text style={s.rdoWeather}>{rdo.weather}</Text>
          </View>
          <Text style={s.rdoMeta}>{rdo.workers||0} trabalhadores · {rdo.activities?.length||0} atividades</Text>
          {rdo.activities?.slice(0,3).map((a: any, j: number) => (
            <Text key={j} style={s.actItem}>• {a.desc}</Text>
          ))}
          {rdo.activities?.length > 3 && (
            <Text style={s.moreActs}>+{rdo.activities.length-3} atividades</Text>
          )}
          {rdo.notes ? <Text style={s.rdoNotes}>{rdo.notes}</Text> : null}
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
    </ScrollView>
  );
}

function Row({label, value}: {label: string; value: string}) {
  return (
    <View style={r.row}>
      <Text style={r.label}>{label}</Text>
      <Text style={r.value}>{value}</Text>
    </View>
  );
}

const r = StyleSheet.create({
  row:{flexDirection:'row',justifyContent:'space-between',paddingVertical:6,
    borderBottomWidth:1,borderBottomColor:'rgba(38,51,84,0.5)'},
  label:{color:Colors.ink2,fontSize:13},
  value:{color:Colors.ink,fontSize:13,fontWeight:'500',flex:1,textAlign:'right'},
});

const s = StyleSheet.create({
  container:{flex:1,backgroundColor:Colors.bg},
  content:{padding:16,paddingTop:60,paddingBottom:100},
  header:{marginBottom:16},
  screenTitle:{fontSize:22,fontWeight:'700',color:Colors.ink},
  projectName:{fontSize:13,color:Colors.cyan,marginTop:2},
  statsRow:{flexDirection:'row',gap:10,marginBottom:16},
  statCard:{flex:1,backgroundColor:Colors.bg1,borderWidth:1,borderColor:Colors.line,
    borderRadius:10,padding:12,alignItems:'center'},
  statNum:{fontSize:22,fontWeight:'700',color:Colors.cyan},
  statLabel:{fontSize:9,color:Colors.ink2,fontWeight:'600',letterSpacing:0.5,marginTop:2},
  infoCard:{backgroundColor:Colors.bg1,borderWidth:1,borderColor:Colors.line,
    borderRadius:12,padding:16,marginBottom:16},
  cardTitle:{fontSize:11,fontWeight:'600',color:Colors.ink2,textTransform:'uppercase',
    letterSpacing:0.6,marginBottom:12},
  shareBtn:{backgroundColor:Colors.cyan,borderRadius:12,padding:16,alignItems:'center',marginBottom:20},
  shareBtnText:{color:Colors.bg,fontWeight:'700',fontSize:15},
  sectionHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12},
  sectionTitle:{fontSize:14,fontWeight:'700',color:Colors.ink},
  refreshText:{color:Colors.cyan,fontSize:13,fontWeight:'600'},
  rdoCard:{backgroundColor:Colors.bg1,borderWidth:1,borderColor:Colors.line,
    borderRadius:10,padding:14,marginBottom:10},
  rdoHeader:{flexDirection:'row',justifyContent:'space-between',marginBottom:4},
  rdoDate:{color:Colors.cyan,fontWeight:'600',fontSize:14},
  rdoWeather:{color:Colors.ink2,fontSize:13},
  rdoMeta:{color:Colors.ink3,fontSize:12,marginBottom:8},
  actItem:{color:Colors.ink2,fontSize:13,lineHeight:20},
  moreActs:{color:Colors.ink3,fontSize:12,marginTop:4,fontStyle:'italic'},
  rdoNotes:{color:Colors.ink2,fontSize:12,marginTop:8,fontStyle:'italic',
    borderTopWidth:1,borderTopColor:Colors.line,paddingTop:8},
  loadMore:{backgroundColor:Colors.bg2,borderRadius:8,padding:14,alignItems:'center',margin:4},
  loadMoreText:{color:Colors.cyan,fontWeight:'600'},
  empty:{textAlign:'center',color:Colors.ink3,marginTop:40,fontSize:14},
  noProject:{color:Colors.ink,fontSize:15,fontWeight:'600'},
});
