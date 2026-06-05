import React, {useState, useEffect, useCallback} from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet, FlatList,
    Modal, TextInput, Alert, ActivityIndicator, RefreshControl,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Colors} from '../theme';
import {useProject} from '../context/ProjectContext';

const PROJECT_TYPES = ['Residencial','Comercial','Industrial','Reforma','Infraestrutura','Outro'];
const STATUS_OPTIONS = ['Ativo','Pausado','Concluído'];
const PAGE_SIZE = 10;

interface Project {
    id: string; name: string; type: string; address: string;
    client: string; status: string; owner: string; createdAt: any;
}

export default function ProjectsScreen() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [page, setPage] = useState(1);
    const [form, setForm] = useState({name:'',type:'Residencial',address:'',client:'',status:'Ativo'});
    const [saving, setSaving] = useState(false);
    const {currentProject, setCurrentProject, user} = useProject();

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
                // Auto-seleciona o primeiro projeto se nenhum estiver selecionado
          if (!currentProject && list.length > 0) {
                    setCurrentProject(list[0]);
          }
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
                const updated = [proj, ...projects];
                setProjects(updated);
                setCurrentProject(proj);
                setModalVisible(false);
                setForm({name:'',type:'Residencial',address:'',client:'',status:'Ativo'});
                Alert.alert('Sucesso', `Projeto "${proj.name}" criado e selecionado!`);
        } catch (e: any) {
                Alert.alert('Erro', e.message);
        } finally {
                setSaving(false);
        }
  }

  function selectProject(proj: Project) {
        setCurrentProject(proj);
        Alert.alert('Projeto Selecionado', `"${proj.name}" agora é o projeto ativo.`);
  }

  const paged = projects.slice(0, page * PAGE_SIZE);
    const hasMore = paged.length < projects.length;

  return (
        <View style={s.container}>
                <View style={s.header}>
                          <Text style={s.screenTitle}>Projetos</Text>Text>
                  {currentProject && (
                    <View style={s.activeBadge}>
                                  <Text style={s.activeBadgeText}>Ativo: {currentProject.name}</Text>Text>
                    </View>View>
                  )}
                </View>View>

                <View style={s.topBar}>
                          <TouchableOpacity style={s.newBtn} onPress={() => setModalVisible(true)}>
                                      <Text style={s.newBtnText}>+ Novo Projeto</Text>Text>
                          </TouchableOpacity>TouchableOpacity>
                          <TouchableOpacity style={s.refreshBtn} onPress={() => {setRefreshing(true); loadProjects();}}>
                                      <Text style={s.refreshText}>Atualizar</Text>Text>
                          </TouchableOpacity>TouchableOpacity>
                </View>View>

          {loading ? (
                  <ActivityIndicator color={Colors.cyan} style={{marginTop: 40}} />
                ) : (
                  <FlatList
                              data={paged}
                              keyExtractor={i => i.id}
                              contentContainerStyle={s.list}
                              refreshControl={
                                            <RefreshControl refreshing={refreshing} onRefresh={() => {setRefreshing(true); loadProjects();}} tintColor={Colors.cyan}/>
                              }
                              ListEmptyComponent={<Text style={s.empty}>Nenhum projeto. Crie o primeiro!</Text>Text>}
                            ListFooterComponent={hasMore ? (
                                            <TouchableOpacity style={s.loadMore} onPress={() => setPage(p => p + 1)}>
                                                          <Text style={s.loadMoreText}>Carregar mais ({projects.length - paged.length} restantes)</Text>Text>
                                            </TouchableOpacity>TouchableOpacity>
                                          ) : null}
                            renderItem={({item}) => {
                                            const isActive = currentProject?.id === item.id;
                                            return (
                                                            <TouchableOpacity
                                                                              style={[s.card, isActive && s.cardActive]}
                                                                              onPress={() => selectProject(item)}
                                                                              activeOpacity={0.8}>
                                                                            <View style={s.cardHeader}>
                                                                                              <Text style={[s.cardName, isActive && s.cardNameActive]}>{item.name}</Text>Text>
                                                                              {isActive && <View style={s.activeDot}><Text style={s.activeDotText}>ATIVO</Text>Text></View>View>}
                                                                            </View>View>
                                                                            <View style={s.cardMeta}>
                                                                                              <Text style={s.metaText}>{item.type}</Text>Text>
                                                                                              <Text style={s.metaSep}>•</Text>Text>
                                                                                              <Text style={[s.metaText, {color: item.status === 'Ativo' ? Colors.cyan : Colors.ink3}]}>
                                                                                                {item.status}
                                                                                                </Text>Text>
                                                                            </View>View>
                                                              {item.client ? <Text style={s.clientText}>Cliente: {item.client}</Text>Text> : null}
                                                              {item.address ? <Text style={s.addressText}>{item.address}</Text>Text> : null}
                                                            </TouchableOpacity>TouchableOpacity>
                                                          );
                              }}
                          />
                        )}
                  
                        <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
                                <View style={s.modalOverlay}>
                    <View style={s.modalCard}>
                                <Text style={s.modalTitle}>Novo Projeto</Text>Text>
                    
                                <Text style={s.fieldLabel}>Nome *</Text>Text>
                                <TextInput style={s.input} value={form.name} onChangeText={t => setForm(f => ({...f, name: t}))}
                                                placeholder="Nome do projeto" placeholderTextColor={Colors.ink3} />
                    
                                <Text style={s.fieldLabel}>Tipo</Text>Text>
                                <View style={s.chips}>
                                  {PROJECT_TYPES.map(t => (
                                                <TouchableOpacity key={t} style={[s.chip, form.type === t && s.chipActive]}
                                                                    onPress={() => setForm(f => ({...f, type: t}))}>
                                                                  <Text style={[s.chipText, form.type === t && s.chipTextActive]}>{t}</Text>Text>
                                                </TouchableOpacity>TouchableOpacity>
                                              ))}
                                </View>View>
                    
                                <Text style={s.fieldLabel}>Status</Text>Text>
                                <View style={s.chips}>
                                  {STATUS_OPTIONS.map(st => (
                                                <TouchableOpacity key={st} style={[s.chip, form.status === st && s.chipActive]}
                                                                    onPress={() => setForm(f => ({...f, status: st}))}>
                                                                  <Text style={[s.chipText, form.status === st && s.chipTextActive]}>{st}</Text>Text>
                                                </TouchableOpacity>TouchableOpacity>
                                              ))}
                                </View>View>
                    
                                <Text style={s.fieldLabel}>Cliente</Text>Text>
                                <TextInput style={s.input} value={form.client} onChangeText={t => setForm(f => ({...f, client: t}))}
                                                placeholder="Nome do cliente" placeholderTextColor={Colors.ink3} />
                    
                                <Text style={s.fieldLabel}>Endereço</Text>Text>
                                <TextInput style={s.input} value={form.address} onChangeText={t => setForm(f => ({...f, address: t}))}
                                                placeholder="Endereço da obra" placeholderTextColor={Colors.ink3} />
                    
                                <View style={s.modalBtns}>
                                              <TouchableOpacity style={s.cancelBtn} onPress={() => setModalVisible(false)}>
                                                              <Text style={s.cancelText}>Cancelar</Text>Text>
                                              </TouchableOpacity>TouchableOpacity>
                                              <TouchableOpacity style={s.saveBtn} onPress={createProject} disabled={saving}>
                                                {saving ? <ActivityIndicator color={Colors.bg} /> : <Text style={s.saveBtnText}>Criar</Text>Text>}
                                              </TouchableOpacity>TouchableOpacity>
                                </View>View>
                    </View>View>
                                </View>View>
                        </Modal>Modal>
                  </FlatList>View>
          );
          }
        
        const s = StyleSheet.create({
            container: {flex:1, backgroundColor: Colors.bg},
          header: {paddingHorizontal:16, paddingTop:60, paddingBottom:10, borderBottomWidth:1, borderBottomColor:Colors.line},
          screenTitle: {fontSize:22, fontWeight:'700', color:Colors.ink, marginBottom:4},
          activeBadge: {backgroundColor:'rgba(0,212,255,0.12)', borderWidth:1, borderColor:Colors.cyan,
            borderRadius:6, paddingHorizontal:10, paddingVertical:4, alignSelf:'flex-start'},
          activeBadgeText: {color:Colors.cyan, fontSize:12, fontWeight:'600'},
          topBar: {flexDirection:'row', gap:10, padding:16, paddingBottom:8},
          newBtn: {flex:1, backgroundColor:Colors.cyan, borderRadius:8, padding:12, alignItems:'center'},
          newBtnText: {color:Colors.bg, fontWeight:'700', fontSize:13},
          refreshBtn: {borderWidth:1, borderColor:Colors.line, borderRadius:8, padding:12, paddingHorizontal:16},
          refreshText: {color:Colors.cyan, fontSize:13, fontWeight:'600'},
          list: {padding:12, paddingBottom:100},
          card: {backgroundColor:Colors.bg1, borderWidth:1, borderColor:Colors.line,
            borderRadius:10, padding:14, marginBottom:10},
          cardActive: {borderColor:Colors.cyan, backgroundColor:'rgba(0,212,255,0.06)'},
          cardHeader: {flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:6},
          cardName: {fontSize:16, fontWeight:'700', color:Colors.ink, flex:1},
          cardNameActive: {color:Colors.cyan},
          activeDot: {backgroundColor:Colors.cyan, borderRadius:4, paddingHorizontal:8, paddingVertical:2, marginLeft:8},
          activeDotText: {color:Colors.bg, fontSize:10, fontWeight:'800'},
          cardMeta: {flexDirection:'row', alignItems:'center', gap:6, marginBottom:4},
          metaText: {fontSize:12, color:Colors.ink2},
          metaSep: {color:Colors.ink3, fontSize:12},
          clientText: {fontSize:12, color:Colors.ink3, marginTop:2},
          addressText: {fontSize:11, color:Colors.ink3, marginTop:2},
          empty: {textAlign:'center', color:Colors.ink3, marginTop:40, fontSize:14},
          loadMore: {backgroundColor:Colors.bg2, borderRadius:8, padding:14, alignItems:'center', margin:8},
          loadMoreText: {color:Colors.cyan, fontWeight:'600'},
          modalOverlay: {flex:1, backgroundColor:'rgba(0,0,0,0.7)', justifyContent:'flex-end'},
          modalCard: {backgroundColor:Colors.bg1, borderTopLeftRadius:20, borderTopRightRadius:20,
            padding:20, paddingBottom:40, borderTopWidth:1, borderTopColor:Colors.line, maxHeight:'85%'},
          modalTitle: {fontSize:18, fontWeight:'700', color:Colors.ink, marginBottom:16},
          fieldLabel: {fontSize:12, color:Colors.ink2, fontWeight:'600', textTransform:'uppercase',
            letterSpacing:0.5, marginBottom:6},
          input: {backgroundColor:Colors.bg2, borderWidth:1, borderColor:Colors.line, borderRadius:8,
            padding:12, color:Colors.ink, marginBottom:14, fontSize:14},
          chips: {flexDirection:'row', flexWrap:'wrap', gap:8, marginBottom:14},
          chip: {borderWidth:1, borderColor:Colors.line, borderRadius:6, paddingHorizontal:10, paddingVertical:5},
          chipActive: {backgroundColor:'rgba(0,212,255,0.15)', borderColor:Colors.cyan},
          chipText: {color:Colors.ink2, fontSize:12},
          chipTextActive: {color:Colors.cyan, fontWeight:'600'},
          modalBtns: {flexDirection:'row', gap:10, marginTop:6},
          cancelBtn: {flex:1, borderWidth:1, borderColor:Colors.line, borderRadius:8, padding:13, alignItems:'center'},
          cancelText: {color:Colors.ink2, fontWeight:'600'},
          saveBtn: {flex:1, backgroundColor:Colors.cyan, borderRadius:8, padding:13, alignItems:'center'},
          saveBtnText: {color:Colors.bg, fontWeight:'700'},
          });</FlatList>
