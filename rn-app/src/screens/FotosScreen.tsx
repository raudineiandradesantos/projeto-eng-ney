import React, {useState, useEffect, useCallback} from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, FlatList,
  Image, Alert, ActivityIndicator, RefreshControl, Modal,
  TextInput, Dimensions,
} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import {Colors} from '../theme';
import {useProject} from '../context/ProjectContext';

interface Photo {
  id: string; uri: string; caption: string; createdAt: string;
}

const PAGE_SIZE = 10;
const {width} = Dimensions.get('window');
const PHOTO_SIZE = (width - 36) / 2;

export default function FotosScreen() {
  const {currentProject, user} = useProject();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [page, setPage] = useState(1);
  const [viewPhoto, setViewPhoto] = useState<Photo | null>(null);
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

  useEffect(() => {
    setPage(1);
    setPhotos([]);
    loadPhotos();
  }, [currentProject]);

  async function savePhotos(list: Photo[]) {
    if (!docId) return;
    await firestore().collection('photos').doc(docId).set({
      photos: list,
      updatedAt: new Date().toISOString(),
    });
  }

  async function pickPhoto(fromCamera: boolean) {
    if (!currentProject || !user) {
      Alert.alert('Atencao', 'Selecione um projeto primeiro');
      return;
    }
    const result = fromCamera
      ? await launchCamera({mediaType: 'photo', quality: 0.7, includeBase64: true})
      : await launchImageLibrary({mediaType: 'photo', quality: 0.7, includeBase64: true, selectionLimit: 5});

    if (result.didCancel || !result.assets || result.assets.length === 0) return;

    setUploading(true);
    try {
      const newPhotos: Photo[] = result.assets
        .filter(a => a.base64)
        .map(a => ({
          id: Date.now().toString() + Math.random().toString(36).slice(2),
          uri: 'data:image/jpeg;base64,' + a.base64,
          caption: a.fileName || 'Foto ' + new Date().toLocaleDateString('pt-BR'),
          createdAt: new Date().toISOString(),
        }));
      if (newPhotos.length === 0) {
        Alert.alert('Erro', 'Nenhuma imagem valida selecionada');
        return;
      }
      const updated = [...newPhotos, ...photos];
      setPhotos(updated);
      await savePhotos(updated);
      Alert.alert('Sucesso', newPhotos.length + ' foto(s) adicionada(s)!');
    } catch (e: any) {
      Alert.alert('Erro', 'Falha ao salvar foto: ' + e.message);
    } finally {
      setUploading(false);
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

  async function saveCaption() {
    if (!viewPhoto) return;
    const updated = photos.map(p => p.id === viewPhoto.id ? {...p, caption: captionInput} : p);
    setPhotos(updated);
    await savePhotos(updated);
    setViewPhoto(null);
  }

  const paged = photos.slice(0, page * PAGE_SIZE);
  const hasMore = paged.length < photos.length;

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
        <Text style={s.screenTitle}>Fotos</Text>
        <Text style={s.projectName}>{currentProject.name}</Text>
      </View>

      <View style={s.actions}>
        <TouchableOpacity style={s.actionBtn} onPress={() => pickPhoto(false)} disabled={uploading}>
          <Text style={s.actionBtnText}>Galeria</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.actionBtn} onPress={() => pickPhoto(true)} disabled={uploading}>
          <Text style={s.actionBtnText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.refreshBtn} onPress={() => {setRefreshing(true); loadPhotos();}}>
          <Text style={s.refreshText}>Atualizar</Text>
        </TouchableOpacity>
      </View>

      {(uploading || loading) && (
        <View style={s.loadingBar}>
          <ActivityIndicator color={Colors.cyan} size="small" />
          <Text style={s.loadingText}>{uploading ? 'Salvando fotos...' : 'Carregando...'}</Text>
        </View>
      )}

      <FlatList
        data={paged}
        keyExtractor={i => i.id}
        numColumns={2}
        contentContainerStyle={s.grid}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => {setRefreshing(true); loadPhotos();}} tintColor={Colors.cyan} />
        }
        ListEmptyComponent={
          !loading && !uploading ? (
            <View style={s.emptyContainer}>
              <Text style={s.empty}>Nenhuma foto ainda</Text>
              <Text style={s.emptySub}>Use os botoes acima para adicionar</Text>
            </View>
          ) : null
        }
        ListFooterComponent={hasMore ? (
          <TouchableOpacity style={s.loadMore} onPress={() => setPage(p => p + 1)}>
            <Text style={s.loadMoreText}>Carregar mais ({photos.length - paged.length} restantes)</Text>
          </TouchableOpacity>
        ) : null}
        renderItem={({item}) => (
          <TouchableOpacity
            style={s.photoCard}
            onPress={() => {setViewPhoto(item); setCaptionInput(item.caption || '');}}
            onLongPress={() => deletePhoto(item.id)}
            activeOpacity={0.85}>
            <Image
              source={{uri: item.uri}}
              style={[s.photo, {width: PHOTO_SIZE, height: PHOTO_SIZE}]}
              resizeMode="cover"
            />
            <Text style={s.caption} numberOfLines={1}>{item.caption || 'Sem legenda'}</Text>
            <Text style={s.photoDate}>{new Date(item.createdAt).toLocaleDateString('pt-BR')}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={!!viewPhoto}
        transparent
        animationType="fade"
        onRequestClose={() => setViewPhoto(null)}>
        <View style={s.modalOverlay}>
          {viewPhoto && (
            <View style={s.photoModal}>
              <Image
                source={{uri: viewPhoto.uri}}
                style={s.fullPhoto}
                resizeMode="contain"
              />
              <TextInput
                style={s.captionInput}
                value={captionInput}
                onChangeText={setCaptionInput}
                placeholder="Legenda da foto..."
                placeholderTextColor={Colors.ink3}
              />
              <View style={s.modalBtns}>
                <TouchableOpacity style={s.saveCaption} onPress={saveCaption}>
                  <Text style={s.saveCaptionText}>Salvar legenda</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={s.deleteCaptionBtn}
                  onPress={() => {setViewPhoto(null); deletePhoto(viewPhoto.id);}}>
                  <Text style={s.deleteCaptionText}>Excluir foto</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={s.closeBtn} onPress={() => setViewPhoto(null)}>
                <Text style={s.closeBtnText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.bg},
  header: {paddingHorizontal: 16, paddingTop: 60, paddingBottom: 12,
    borderBottomWidth: 1, borderBottomColor: Colors.line},
  screenTitle: {fontSize: 22, fontWeight: '700', color: Colors.ink},
  projectName: {fontSize: 13, color: Colors.cyan, marginTop: 2},
  actions: {flexDirection: 'row', gap: 10, padding: 16, paddingBottom: 8},
  actionBtn: {flex: 1, backgroundColor: Colors.cyan, borderRadius: 8, padding: 11, alignItems: 'center'},
  actionBtnText: {color: Colors.bg, fontWeight: '700', fontSize: 13},
  refreshBtn: {borderWidth: 1, borderColor: Colors.line, borderRadius: 8,
    padding: 10, paddingHorizontal: 14},
  refreshText: {color: Colors.cyan, fontSize: 13, fontWeight: '600'},
  loadingBar: {flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: 16, paddingBottom: 8},
  loadingText: {color: Colors.ink2, fontSize: 13},
  grid: {padding: 8, paddingBottom: 100},
  photoCard: {margin: 4, backgroundColor: Colors.bg1, borderWidth: 1,
    borderColor: Colors.line, borderRadius: 10, overflow: 'hidden'},
  photo: {backgroundColor: Colors.bg2},
  caption: {color: Colors.ink2, fontSize: 11, padding: 6, paddingBottom: 2, textAlign: 'center'},
  photoDate: {color: Colors.ink3, fontSize: 10, textAlign: 'center', paddingBottom: 6},
  emptyContainer: {alignItems: 'center', marginTop: 60},
  empty: {textAlign: 'center', color: Colors.ink, fontSize: 16, fontWeight: '600'},
  emptySub: {textAlign: 'center', color: Colors.ink3, fontSize: 13, marginTop: 4},
  loadMore: {backgroundColor: Colors.bg2, borderRadius: 8, padding: 14,
    alignItems: 'center', margin: 8},
  loadMoreText: {color: Colors.cyan, fontWeight: '600'},
  noProject: {color: Colors.ink, fontSize: 16, fontWeight: '600'},
  noProjectSub: {color: Colors.ink3, fontSize: 13, marginTop: 6},
  modalOverlay: {flex: 1, backgroundColor: 'rgba(0,0,0,0.92)', justifyContent: 'center', padding: 16},
  photoModal: {backgroundColor: Colors.bg1, borderRadius: 16, padding: 16,
    borderWidth: 1, borderColor: Colors.line},
  fullPhoto: {width: '100%', height: 260, borderRadius: 10, marginBottom: 14, backgroundColor: Colors.bg2},
  captionInput: {backgroundColor: Colors.bg2, borderWidth: 1, borderColor: Colors.line,
    borderRadius: 8, padding: 12, color: Colors.ink, marginBottom: 12, fontSize: 14},
  modalBtns: {flexDirection: 'row', gap: 10, marginBottom: 10},
  saveCaption: {flex: 1, backgroundColor: Colors.cyan, borderRadius: 8,
    padding: 12, alignItems: 'center'},
  saveCaptionText: {color: Colors.bg, fontWeight: '700', fontSize: 13},
  deleteCaptionBtn: {flex: 1, borderWidth: 1, borderColor: '#ff3b3b',
    borderRadius: 8, padding: 12, alignItems: 'center'},
  deleteCaptionText: {color: '#ff3b3b', fontWeight: '700', fontSize: 13},
  closeBtn: {alignItems: 'center', paddingVertical: 8},
  closeBtnText: {color: Colors.ink2, fontSize: 14},
});
