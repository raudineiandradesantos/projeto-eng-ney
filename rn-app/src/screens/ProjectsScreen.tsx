import React, {useState, useEffect, useCallback} from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, FlatList,
  Modal, TextInput, Alert, ActivityIndicator, RefreshControl,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Colors} from '../theme';
import {useProject} from '../context/ProjectContext';
import {useNavigation} from '@react-navigation/native';

const PROJECT_TYPES = ['Residencial','Comercial','Industrial','Reforma','Infraestrutura','Outro'];
const STATUS_OPTIONS = ['Ativo','Pausado','Concluído'];

interface Project {
  id: string; name: string; type: string; address: string;
  client: string; status: string; owner: string; createdAt: any;
}

export default function ProjectsScreen() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({name:'',type:'Residencial',address:'',client:'',status:'Ativo'});
  const [saving, setSaving] = useState(false);
  const {setCurrentProject, user} = useProject();
  const nav = useNavigation<any>();

  const loadProjects = useCallback(async () => {
    if (!user) return;
    try {
      const snap = await firestore()
        .collection('projects')
        .where('owner', '==', user.uid)
        .orderBy('createdAt', 'desc')
        .get();
      const list: Project[] = snap.docs.map(d => ({id: d.id, ...(d.data() as any)}));
      setProjects(list);
    } catch (e: any) {
      Alert.alert('Erro', 'Falha ao carregar projetos: ' + e.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user]);

  useEffect(() => { loadProjects(); }, [loadProjects]);

  async function createProject() {
    if (!form.name.trim()) { Alert.alert('Erro', 'Nome do projeto obrigatório'); return; }
    setSaving(true);
    try {
      const ref = firestore().collection('projects').doc();
      const proj: Project = {
        id: ref.id, name: form.name.trim(), type: form.type,
        address: form.address.trim(), client: form.client.trim(),
        status: form.status, owner: user.uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
      };
      await ref.set(proj);
      setProjects(prev => [proj, ...prev]);
      setCurrentProject(proj);
      setModalVisible(false);
      setForm({name:'',type:'Residencial',address:'',client:'',status:'Ativo'});
      nav.navigate('RDO');
    } catch (e: any) {
      Alert.alert('Erro', e.message);
    } finally {
      setSaving(false);
    }
  }

  function selectProject(p: Project) {
    setCurrentProject(p);
    nav.navigate('RDO');
  }

  function statusColor(s: string) {
    if (s === 'Ativo') return Colors.green;
    if (s === 'Pausado') return Colors.amber;
    return Colors.ink3;
  }

  if (loading) return (
    <View style={[s.container, {justifyContent:'center',alignItems:'center'}]}>
      <ActivityIndicator color={Colors.cyan} size="large" />
    </View>
  );

  return (
    <View style={s.container}>
      <View style={s.header}>
        <View style={s.headerLeft}>
          <View style={s.dot} />
          <Text style={s.title}>EngNey RDO</Text>
        </View>
        <TouchableOpacity onPress={() => auth().signOut()}>
          <Text style={s.logout}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={s.stats}>
        <View style={s.statCard}>
          <Text style={s.statNum}>{projects.length}</Text>
          <Text style={s.statLabel}>PROJETOS</Text>
        </View>
        <View style={s.statCard}>
          <Text style={s.statNum}>{projects.filter(p=>p.status==='Ativo').length}</Text>
          <Text style={s.statLabel}>ATIVOS</Text>
        </View>
      </View>

      <TouchableOpacity style={s.newBtn} onPress={() => setModalVisible(true)}>
        <Text style={s.newBtnText}>+ Novo Projeto</Text>
      </TouchableOpacity>

      <FlatList
        data={projects}
        keyExtractor={i => i.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {setRefreshing(true);loadProjects();}} tintColor={Colors.cyan} />}
        contentContainerStyle={s.list}
        ListEmptyComponent={<Text style={s.empty}>Nenhum projeto. Crie seu primeiro!</Text>}
        renderItem={({item}) => (
          <TouchableOpacity style={s.projectItem} onPress={() => selectProject(item)} activeOpacity={0.7}>
            <View style={s.projectIcon}>
              <Text style={s.projectIconText}>{item.name.charAt(0).toUpperCase()}</Text>
            </View>
            <View style={s.projectInfo}>
              <Text style={s.projectName}>{item.name}</Text>
              <Text style={s.projectSub}>{item.type} • {item.address || 'Sem endereço'}</Text>
            </View>
            <View style={[s.statusBadge, {borderColor: statusColor(item.status)}]}>
              <Text style={[s.statusText, {color: statusColor(item.status)}]}>{item.status}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={s.modalOverlay}>
          <View style={s.modalCard}>
            <Text style={s.modalTitle}>Novo Projeto</Text>
            <TextInput style={s.input} value={form.name} onChangeText={v=>setForm(f=>({...f,name:v}))}
              placeholder="Nome do projeto*" placeholderTextColor={Colors.ink3} />
            <TextInput style={s.input} value={form.client} onChangeText={v=>setForm(f=>({...f,client:v}))}
              placeholder="Cliente" placeholderTextColor={Colors.ink3} />
            <TextInput style={s.input} value={form.address} onChangeText={v=>setForm(f=>({...f,address:v}))}
              placeholder="Endereço" placeholderTextColor={Colors.ink3} />
            <Text style={s.label}>Tipo</Text>
            <View style={s.chips}>
              {PROJECT_TYPES.map(t=>(
                <TouchableOpacity key={t} style={[s.chip, form.type===t && s.chipActive]}
                  onPress={()=>setForm(f=>({...f,type:t}))}>
                  <Text style={[s.chipText, form.type===t && s.chipTextActive]}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={s.modalBtns}>
              <TouchableOpacity style={s.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={s.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.saveBtn} onPress={createProject} disabled={saving}>
                {saving ? <ActivityIndicator color={Colors.bg} /> : <Text style={s.saveText}>Criar</Text>}
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
  header:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',
    paddingHorizontal:16,paddingTop:52,paddingBottom:12,
    borderBottomWidth:1,borderBottomColor:Colors.line,backgroundColor:'rgba(10,14,26,0.97)'},
  headerLeft:{flexDirection:'row',alignItems:'center',gap:8},
  dot:{width:8,height:8,borderRadius:4,backgroundColor:Colors.cyan},
  title:{fontSize:16,fontWeight:'700',color:Colors.ink},
  logout:{color:Colors.red,fontSize:13,fontWeight:'600'},
  stats:{flexDirection:'row',gap:12,padding:16},
  statCard:{flex:1,backgroundColor:Colors.bg1,borderWidth:1,borderColor:Colors.line,
    borderRadius:12,padding:16,alignItems:'center'},
  statNum:{fontSize:28,fontWeight:'700',color:Colors.cyan},
  statLabel:{fontSize:10,color:Colors.ink2,fontWeight:'600',letterSpacing:0.5,marginTop:2},
  newBtn:{marginHorizontal:16,backgroundColor:Colors.cyan,borderRadius:10,
    padding:14,alignItems:'center',marginBottom:12},
  newBtnText:{color:Colors.bg,fontWeight:'700',fontSize:15},
  list:{paddingHorizontal:16,paddingBottom:100},
  projectItem:{flexDirection:'row',alignItems:'center',gap:12,
    backgroundColor:Colors.bg1,borderWidth:1,borderColor:Colors.line,
    borderRadius:10,padding:14,marginBottom:10},
  projectIcon:{width:40,height:40,borderRadius:20,backgroundColor:Colors.cyan3,
    justifyContent:'center',alignItems:'center'},
  projectIconText:{color:Colors.cyan,fontWeight:'700',fontSize:16},
  projectInfo:{flex:1},
  projectName:{color:Colors.ink,fontWeight:'600',fontSize:15},
  projectSub:{color:Colors.ink2,fontSize:12,marginTop:2},
  statusBadge:{borderWidth:1,borderRadius:20,paddingHorizontal:10,paddingVertical:3},
  statusText:{fontSize:11,fontWeight:'600'},
  empty:{textAlign:'center',color:Colors.ink3,marginTop:40,fontSize:14},
  modalOverlay:{flex:1,backgroundColor:'rgba(0,0,0,0.7)',justifyContent:'flex-end'},
  modalCard:{backgroundColor:Colors.bg1,borderTopLeftRadius:20,borderTopRightRadius:20,
    borderWidth:1,borderColor:Colors.line,padding:24,paddingBottom:40},
  modalTitle:{fontSize:18,fontWeight:'700',color:Colors.ink,marginBottom:20},
  input:{backgroundColor:Colors.bg2,borderWidth:1,borderColor:Colors.line,
    borderRadius:8,padding:12,color:Colors.ink,marginBottom:12,fontSize:14},
  label:{fontSize:12,color:Colors.ink2,fontWeight:'600',marginBottom:8,textTransform:'uppercase'},
  chips:{flexDirection:'row',flexWrap:'wrap',gap:8,marginBottom:20},
  chip:{borderWidth:1,borderColor:Colors.line,borderRadius:20,paddingHorizontal:12,paddingVertical:6},
  chipActive:{backgroundColor:Colors.cyan3,borderColor:Colors.cyan},
  chipText:{color:Colors.ink2,fontSize:13},
  chipTextActive:{color:Colors.cyan},
  modalBtns:{flexDirection:'row',gap:12},
  cancelBtn:{flex:1,borderWidth:1,borderColor:Colors.line,borderRadius:10,
    padding:14,alignItems:'center'},
  cancelText:{color:Colors.ink2,fontWeight:'600'},
  saveBtn:{flex:1,backgroundColor:Colors.cyan,borderRadius:10,padding:14,alignItems:'center'},
  saveText:{color:Colors.bg,fontWeight:'700'},
});
