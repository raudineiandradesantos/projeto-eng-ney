import React, {useState, useEffect, useCallback} from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, FlatList,
  Image, Alert, ActivityIndicator, RefreshControl, Modal,
  TextInput,
} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import {Colors} from '../theme';
import {useProject} from '../context/ProjectContext';

interface Photo {
  id: string; uri: string; caption: string; createdAt: string;
}

const PAGE_SIZE = 10;

export default function FotosScreen() {
  const {currentProject, user} = useProject();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [viewPhoto, setViewPhoto] = useState<Photo|null>(null);
  const [captionInput, setCaptionInput] = useState('');

  const docId = currentProject && user ? currentProject.id + '_' + user.uid : null;

  const loadPhotos = useCallback(async () => {
    if (!docId) return;
    try {
      const snap = await firestore().collection('photos').doc(docId).get();
      if (snap.exists()) {
        const data = snap.data();
        setPhotos((data?.photos || []) as Photo[]);
      } else {
        setPhotos([]);
      }
    } catch (e: any) {
      Alert.alert('Erro', 'Falha ao carregar fotos: ' + e.message);
    } finally {
      setRefreshing(false);
    }
  }, [docId]);

  useEffect(() => { setPage(1); loadPhotos(); }, [currentProject]);

  async function savePhotos(list: Photo[]) {
    if (!docId) return;
    await firestore().collection('photos').doc(docId).set({photos: list});
  }

  async function pickPhoto(fromCamera: boolean) {
    const result = fromCamera
      ? await launchCamera({mediaType: 'photo', quality: 0.7, includeBase64: true})
      : await launchImageLibrary({mediaType: 'photo', quality: 0.7, includeBase64: true, selectionLimit: 5});

    if (result.didCancel || !result.assets) return;
    setLoading(true);
    try {
      const newPhotos: Photo[] = result.assets.map(a => ({
        id: Date.now().toString() + Math.random().toString(36).slice(2),
        uri: 'data:image/jpeg;base64,' + a.base64,
        caption: a.fileName || '',
        createdAt: new Date().toISOString(),
      }));
      const updated = [...newPhotos, ...photos];
      setPhotos(updated);
      await savePhotos(updated);
    } catch (e: any) {
      Alert.alert('Erro', e.message);
    } finally {
      setLoading(false);
    }
  }

  async function deletePhoto(id: string) {
    Alert.alert('Excluir', 'Remover esta foto?', [
      {text: 'Cancelar', style: 'cancel'},
      {text: 'Excluir', style: 'destructive', onPress: async () => {
        const updated = photos.filter(p => p.id !== id);
        setPhotos(updated);
        await savePhotos(updated);
      }},
    ]);
  }

  const paged = photos.slice(0, page * PAGE_SIZE);
  const hasMore = paged.length < photos.length;

  if (!currentProject) return (
    <View style={[s.container, {justifyContent:'center',alignItems:'center'}]}>
      <Text style={s.noProject}>Selecione um projeto primeiro</Text>
    </View>
  );

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.screenTitle}>Fotos</Text>
        <Text style={s.projectName}>{currentProject.name}</Text>
      </View>

      <View style={s.actions}>
        <TouchableOpacity style={s.actionBtn} onPress={() => pickPhoto(false)} disabled={loading}>
          <Text style={s.actionBtnText}>Galeria</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.actionBtn} onPress={() => pickPhoto(true)} disabled={loading}>
          <Text style={s.actionBtnText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.refreshBtn} onPress={() => {setRefreshing(true); loadPhotos();}}>
          <Text style={s.refreshText}>Atualizar</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator color={Colors.cyan} style={{marginVertical:16}} />}

      <FlatList
        data={paged}
        keyExtractor={i => i.id}
        numColumns={2}
        contentContainerStyle={s.grid}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{setRefreshing(true);loadPhotos();}} tintColor={Colors.cyan}/>}
        ListEmptyComponent={<Text style={s.empty}>Nenhuma foto. Adicione da galeria ou câmera.</Text>}
        ListFooterComponent={hasMore ? (
          <TouchableOpacity style={s.loadMore} onPress={() => setPage(p => p + 1)}>
            <Text style={s.loadMoreText}>Carregar mais ({photos.length - paged.length} restantes)</Text>
          </TouchableOpacity>
        ) : null}
        renderItem={({item}) => (
          <TouchableOpacity style={s.photoCard} onPress={() => setViewPhoto(item)} onLongPress={() => deletePhoto(item.id)}>
            <Image source={{uri: item.uri}} style={s.photo} resizeMode="cover" />
            <Text style={s.caption} numberOfLines={1}>{item.caption || 'Sem legenda'}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal visible={!!viewPhoto} transparent animationType="fade" onRequestClose={() => setViewPhoto(null)}>
        <View style={s.modalOverlay}>
          <TouchableOpacity style={s.closeArea} onPress={() => setViewPhoto(null)} />
          {viewPhoto && (
            <View style={s.photoModal}>
              <Image source={{uri: viewPhoto.uri}} style={s.fullPhoto} resizeMode="contain" />
              <TextInput style={s.captionInput} value={captionInput}
                onChangeText={setCaptionInput} placeholder="Legenda..."
                placeholderTextColor={Colors.ink3} />
              <TouchableOpacity style={s.saveCaption} onPress={async () => {
                const updated = photos.map(p => p.id === viewPhoto.id ? {...p, caption: captionInput} : p);
                setPhotos(updated);
                await savePhotos(updated);
                setViewPhoto(null);
              }}>
                <Text style={s.saveCaptionText}>Salvar legenda</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setViewPhoto(null)}>
                <Text style={s.closeBtn}>Fechar</Text>
              </TouchableOpacity>
            </View>
          )}
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
  actions:{flexDirection:'row',gap:10,padding:16,paddingBottom:8},
  actionBtn:{flex:1,backgroundColor:Colors.cyan,borderRadius:8,padding:10,alignItems:'center'},
  actionBtnText:{color:Colors.bg,fontWeight:'700',fontSize:13},
  refreshBtn:{borderWidth:1,borderColor:Colors.line,borderRadius:8,padding:10,paddingHorizontal:14},
  refreshText:{color:Colors.cyan,fontSize:13,fontWeight:'600'},
  grid:{padding:8,paddingBottom:100},
  photoCard:{flex:1,margin:4,backgroundColor:Colors.bg1,borderWidth:1,
    borderColor:Colors.line,borderRadius:8,overflow:'hidden'},
  photo:{width:'100%',aspectRatio:1},
  caption:{color:Colors.ink2,fontSize:11,padding:6,textAlign:'center'},
  empty:{textAlign:'center',color:Colors.ink3,marginTop:40,fontSize:14},
  loadMore:{backgroundColor:Colors.bg2,borderRadius:8,padding:14,alignItems:'center',margin:8},
  loadMoreText:{color:Colors.cyan,fontWeight:'600'},
  noProject:{color:Colors.ink,fontSize:15,fontWeight:'600'},
  modalOverlay:{flex:1,backgroundColor:'rgba(0,0,0,0.9)'},
  closeArea:{flex:1},
  photoModal:{backgroundColor:Colors.bg1,borderTopLeftRadius:20,borderTopRightRadius:20,
    padding:20,paddingBottom:40},
  fullPhoto:{width:'100%',height:260,borderRadius:8,marginBottom:16},
  captionInput:{backgroundColor:Colors.bg2,borderWidth:1,borderColor:Colors.line,
    borderRadius:8,padding:12,color:Colors.ink,marginBottom:12,fontSize:14},
  saveCaption:{backgroundColor:Colors.cyan,borderRadius:8,padding:12,alignItems:'center',marginBottom:8},
  saveCaptionText:{color:Colors.bg,fontWeight:'700'},
  closeBtn:{textAlign:'center',color:Colors.ink2,fontSize:14,paddingVertical:8},
});
