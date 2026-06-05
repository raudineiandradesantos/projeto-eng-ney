import React, {useState} from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Colors} from '../theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  async function handleSubmit() {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha e-mail e senha');
      return;
    }
    setLoading(true);
    try {
      if (isRegister) {
        await auth().createUserWithEmailAndPassword(email.trim(), password);
      } else {
        await auth().signInWithEmailAndPassword(email.trim(), password);
      }
    } catch (e: any) {
      const msg: Record<string, string> = {
        'auth/user-not-found': 'Usuário não encontrado',
        'auth/wrong-password': 'Senha incorreta',
        'auth/email-already-in-use': 'E-mail já cadastrado',
        'auth/invalid-email': 'E-mail inválido',
        'auth/weak-password': 'Senha muito fraca (mínimo 6 caracteres)',
      };
      Alert.alert('Erro', msg[e.code] || e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={s.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">
        <View style={s.logo}>
          <View style={s.logoDot} />
          <Text style={s.logoText}>EngNey RDO</Text>
        </View>
        <Text style={s.subtitle}>Sistema de Relatório Diário de Obra</Text>

        <View style={s.card}>
          <Text style={s.cardTitle}>{isRegister ? 'Criar conta' : 'Entrar'}</Text>

          <Text style={s.label}>E-mail</Text>
          <TextInput
            style={s.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="seu@email.com"
            placeholderTextColor={Colors.ink3}
          />

          <Text style={s.label}>Senha</Text>
          <TextInput
            style={s.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="••••••••"
            placeholderTextColor={Colors.ink3}
          />

          <TouchableOpacity style={s.btn} onPress={handleSubmit} disabled={loading}>
            {loading ? (
              <ActivityIndicator color={Colors.bg} />
            ) : (
              <Text style={s.btnText}>{isRegister ? 'Criar conta' : 'Entrar'}</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
            <Text style={s.toggle}>
              {isRegister ? 'Já tenho conta — Entrar' : 'Criar nova conta'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  flex: {flex: 1, backgroundColor: Colors.bg},
  container: {flexGrow: 1, justifyContent: 'center', padding: 24},
  logo: {flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8},
  logoDot: {width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.cyan,
    shadowColor: Colors.cyan, shadowOffset: {width: 0, height: 0}, shadowOpacity: 1, shadowRadius: 8},
  logoText: {fontSize: 22, fontWeight: '700', color: Colors.ink, letterSpacing: -0.5},
  subtitle: {fontSize: 13, color: Colors.ink2, marginBottom: 32},
  card: {backgroundColor: Colors.bg1, borderWidth: 1, borderColor: Colors.line,
    borderRadius: 12, padding: 20},
  cardTitle: {fontSize: 18, fontWeight: '600', color: Colors.ink, marginBottom: 20},
  label: {fontSize: 12, fontWeight: '600', color: Colors.ink2, marginBottom: 6,
    textTransform: 'uppercase', letterSpacing: 0.5},
  input: {backgroundColor: Colors.bg2, borderWidth: 1, borderColor: Colors.line,
    borderRadius: 8, padding: 12, color: Colors.ink, marginBottom: 16, fontSize: 14},
  btn: {backgroundColor: Colors.cyan, borderRadius: 8, padding: 14, alignItems: 'center', marginTop: 4},
  btnText: {color: Colors.bg, fontWeight: '700', fontSize: 15},
  toggle: {textAlign: 'center', color: Colors.cyan, marginTop: 16, fontSize: 13},
});
