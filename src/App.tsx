import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { ActivityIndicator, View, StatusBar } from 'react-native';
import { auth } from './firebase';

import LoginScreen from './screens/LoginScreen';
import ProjectsScreen from './screens/ProjectsScreen';
import RDOScreen from './screens/RDOScreen';
import FotosScreen from './screens/FotosScreen';
import ChecklistScreen from './screens/ChecklistScreen';
import RelatorioScreen from './screens/RelatorioScreen';
import AnotacaoScreen from './screens/AnotacaoScreen';
import { ProjectContext } from './context/ProjectContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const COLORS = {
  bg: '#0a0e1a',
  cyan: '#00d4ff',
  ink2: '#94a3b8',
  line: '#263354',
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(10,14,26,0.97)',
          borderTopColor: COLORS.line,
          paddingBottom: 8,
          paddingTop: 4,
          height: 62,
        },
        tabBarActiveTintColor: COLORS.cyan,
        tabBarInactiveTintColor: COLORS.ink2,
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, string> = {
            Projetos: 'building',
            RDO: 'clipboard-list',
            Fotos: 'camera',
            Checklist: 'check-square',
            Relatorio: 'file-alt',
            Anotacao: 'pen-nib',
          };
          return <FontAwesome5 name={icons[route.name] || 'circle'} size={size - 2} color={color} solid />;
        },
      })}>
      <Tab.Screen name="Projetos" component={ProjectsScreen} />
      <Tab.Screen name="RDO" component={RDOScreen} />
      <Tab.Screen name="Fotos" component={FotosScreen} />
      <Tab.Screen name="Checklist" component={ChecklistScreen} />
      <Tab.Screen name="Relatorio" component={RelatorioScreen} />
      <Tab.Screen name="Anotacao" component={AnotacaoScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentProject, setCurrentProject] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      if (u) {
        setUser(u);
        setLoading(false);
      } else {
        signInAnonymously(auth)
          .then(cred => { setUser(cred.user); setLoading(false); })
          .catch(() => setLoading(false));
      }
    });
    return unsub;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.bg }}>
        <ActivityIndicator size="large" color={COLORS.cyan} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ProjectContext.Provider value={{ currentProject, setCurrentProject, user }}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!user ? (
              <Stack.Screen name="Login" component={LoginScreen} />
            ) : (
              <Stack.Screen name="Main" component={MainTabs} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ProjectContext.Provider>
    </SafeAreaProvider>
  );
}
