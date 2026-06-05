import React, {useState, useEffect, useCallback} from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, Alert, ActivityIndicator, RefreshControl,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Colors} from '../theme';
import {useProject} from '../context/ProjectContext';

interface Activity {
  id: string; desc: string; equipe: string; qty: string; unit: string;
}

interface RDO {
  date: string; weather: string; activities: Activity[];
  notes: string; workers: number; savedAt?: any;
}

const WEATHER = ['Ensolarado','Nublado','Parcial','Chuvoso','Tempestade'];

export default function RDOScreen() {
  const {currentProject, user} = useProject();
  const [rdo, setRdo] = useState<RDO>({
    date: new Date().toISOString().slice(0,10),
    weather: 'Ensolarado', activities: [], notes: '', workers: 0,
  });
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [actForm, setActForm] = useState({desc:'',equipe:'',qty:'',unit:''});
  const [showActForm, setShowActForm] = useState(false);
  const [rdoId, setRdoId] = useState<string|null>(null);

  const loadRDO = useCallback(async () => {
    if (!currentProject || !user) return;
    try {
      const snap = await firestore()
        .collection('rdos')
        .where('projectId','==',currentProject.id)
        .where('owner','==',user.uid)
        .where('date','==',rdo.date)
        .limit(1)
        .get();
      if (!snap.empty) {
        const d = snap.docs[0];
        setRdo(d.data() as RDO);
        setRdoId(d.id);
      }
    } catch (e) {}
    setRefreshing(false);
  }, [currentProject, user, rdo.date]);

  useEffect(() => { loadRDO(); }, [currentProject, rdo.date]);

  async function saveRDO() {
    if (!currentProject || !user) {
      Alert.alert('Aviso', 'Selecione um projeto primeiro'); return;
    }
    setLoading(true);
    try {
      const data = {
        ...rdo, projectId: currentProject.id, owner: user.uid,
        savedAt: firestore.FieldValue.serverTimestamp(),
      };
      if (rdoId) {
        await firestore().collection('rdos').doc(rdoId).set(data, {merge: true});
      } else {
        const ref = await firestore().collection('rdos').add(data);
        setRdoId(ref.id);
      }
      Alert.alert('Sucesso', 'RDO salvo com sucesso!');
    } catch (e: any) {
      Alert.alert('Erro', e.message);
    } finally {
      setLoading(false);
    }
  }

  function addActivity() {
    if (!actForm.desc.trim()) { Alert.alert('Erro', 'Descrição obrigatória'); return; }
    const act: Activity = {
      id: Date.now().toString(), desc: actForm.desc.trim(),
      equipe: actForm.equipe.trim(), qty: actForm.qty, unit: actForm.unit.trim(),
    };
    setRdo(r => ({...r, activities: [...r.activities, act]}));
    setActForm({desc:'',equipe:'',qty:'',unit:''});
    setShowActForm(false);
  }

  function removeActivity(id: string) {
    setRdo(r => ({...r, activities: r.activities.filter(a => a.id !== id)}));
  }

  if (!currentProject) return (
    <View style={[s.container, {justifyContent:'center',alignItems:'center'}]}>
      <Text style={s.noProject}>Nenhum projeto selecionado</Text>
      <Text style={s.noProjectSub}>Vá para a aba Projetos e selecione um</Text>
    </View>
  );

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{setRefreshing(true);loadRDO();}} tintColor={Colors.cyan}/>}>

      <View style={s.header}>
        <Text style={s.screenTitle}>RDO</Text>
        <Text style={s.projectName}>{currentProject.name}</Text>
      </View>

      <View style={s.card}>
        <Text style={s.cardTitle}>Data</Text>
        <TextInput style={s.input} value={rdo.date}
          onChangeText={v => setRdo(r => ({...r, date: v}))}
          placeholder="AAAA-MM-DD" placeholderTextColor={Colors.ink3} />
      </View>

      <View style={s.card}>
        <Text style={s.cardTitle}>Condições do Tempo</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={s.chips}>
            {WEATHER.map(w => (
              <TouchableOpacity key={w} style={[s.chip, rdo.weather===w && s.chipActive]}
                onPress={() => setRdo(r => ({...r, weather: w}))}>
                <Text style={[s.chipText, rdo.weather===w && s.chipTextActive]}>{w}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={s.card}>
        <Text style={s.cardTitle}>Trabalhadores</Text>
        <TextInput style={s.input} value={String(rdo.workers)}
          onChangeText={v => setRdo(r => ({...r, workers: parseInt(v)||0}))}
          keyboardType="numeric" placeholder="0" placeholderTextColor={Colors.ink3} />
      </View>

      <View style={s.card}>
        <View style={s.sectionHeader}>
          <Text style={s.cardTitle}>Atividades ({rdo.activities.length})</Text>
          <TouchableOpacity style={s.addBtn} onPress={() => setShowActForm(!showActForm)}>
            <Text style={s.addBtnText}>+ Adicionar</Text>
          </TouchableOpacity>
        </View>
        {showActForm && (
          <View style={s.actForm}>
            <TextInput style={s.input} value={actForm.desc} onChangeText={v=>setActForm(f=>({...f,desc:v}))}
              placeholder="Descrição da atividade*" placeholderTextColor={Colors.ink3} />
            <TextInput style={s.input} value={actForm.equipe} onChangeText={v=>setActForm(f=>({...f,equipe:v}))}
              placeholder="Equipe" placeholderTextColor={Colors.ink3} />
            <View style={s.row}>
              <TextInput style={[s.input, s.flex]} value={actForm.qty} onChangeText={v=>setActForm(f=>({...f,qty:v}))}
                placeholder="Qtd" keyboardType="numeric" placeholderTextColor={Colors.ink3} />
              <TextInput style={[s.input, s.flex]} value={actForm.unit} onChangeText={v=>setActForm(f=>({...f,unit:v}))}
                placeholder="Unidade" placeholderTextColor={Colors.ink3} />
            </View>
            <TouchableOpacity style={s.saveBtn} onPress={addActivity}>
              <Text style={s.saveBtnText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        )}
        {rdo.activities.map(act => (
          <View key={act.id} style={s.actItem}>
            <View style={s.flex}>
              <Text style={s.actDesc}>{act.desc}</Text>
              {act.equipe ? <Text style={s.actSub}>Equipe: {act.equipe}</Text> : null}
              {act.qty ? <Text style={s.actSub}>{act.qty} {act.unit}</Text> : null}
            </View>
            <TouchableOpacity onPress={() => removeActivity(act.id)}>
              <Text style={s.removeBtn}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={s.card}>
        <Text style={s.cardTitle}>Observações</Text>
        <TextInput style={[s.input, s.textarea]} value={rdo.notes}
          onChangeText={v => setRdo(r => ({...r, notes: v}))}
          multiline numberOfLines={4} placeholder="Anotações gerais..."
          placeholderTextColor={Colors.ink3} textAlignVertical="top" />
      </View>

      <TouchableOpacity style={s.mainBtn} onPress={saveRDO} disabled={loading}>
        {loading ? <ActivityIndicator color={Colors.bg} /> :
          <Text style={s.mainBtnText}>Salvar RDO</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container:{flex:1,backgroundColor:Colors.bg},
  content:{padding:16,paddingTop:60,paddingBottom:100},
  header:{marginBottom:16},
  screenTitle:{fontSize:22,fontWeight:'700',color:Colors.ink},
  projectName:{fontSize:13,color:Colors.cyan,marginTop:2},
  card:{backgroundColor:Colors.bg1,borderWidth:1,borderColor:Colors.line,
    borderRadius:12,padding:16,marginBottom:12},
  cardTitle:{fontSize:11,fontWeight:'600',color:Colors.ink2,textTransform:'uppercase',
    letterSpacing:0.6,marginBottom:12},
  input:{backgroundColor:Colors.bg2,borderWidth:1,borderColor:Colors.line,
    borderRadius:8,padding:12,color:Colors.ink,marginBottom:8,fontSize:14},
  textarea:{height:100},
  chips:{flexDirection:'row',gap:8},
  chip:{borderWidth:1,borderColor:Colors.line,borderRadius:20,paddingHorizontal:12,paddingVertical:6},
  chipActive:{backgroundColor:Colors.cyan3,borderColor:Colors.cyan},
  chipText:{color:Colors.ink2,fontSize:13},
  chipTextActive:{color:Colors.cyan},
  sectionHeader:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:12},
  addBtn:{borderWidth:1,borderColor:Colors.cyan,borderRadius:8,paddingHorizontal:10,paddingVertical:5},
  addBtnText:{color:Colors.cyan,fontSize:12,fontWeight:'600'},
  actForm:{backgroundColor:Colors.bg2,borderRadius:8,padding:12,marginBottom:12},
  row:{flexDirection:'row',gap:8},
  flex:{flex:1},
  saveBtn:{backgroundColor:Colors.cyan,borderRadius:8,padding:10,alignItems:'center'},
  saveBtnText:{color:Colors.bg,fontWeight:'700'},
  actItem:{flexDirection:'row',alignItems:'center',gap:12,paddingVertical:10,
    borderBottomWidth:1,borderBottomColor:Colors.line},
  actDesc:{color:Colors.ink,fontSize:14,fontWeight:'500'},
  actSub:{color:Colors.ink2,fontSize:12,marginTop:2},
  removeBtn:{color:Colors.red,fontSize:16,fontWeight:'700'},
  mainBtn:{backgroundColor:Colors.cyan,borderRadius:12,padding:16,
    alignItems:'center',marginTop:8},
  mainBtnText:{color:Colors.bg,fontWeight:'700',fontSize:16},
  noProject:{color:Colors.ink,fontSize:16,fontWeight:'600'},
  noProjectSub:{color:Colors.ink2,fontSize:13,marginTop:8},
});
