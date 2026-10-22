import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useLayoutEffect, useState } from 'react';
import { FlatList, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import CardNoticia from './src/components/CardNoticia';
import { NOTICIAS_ESPORTES, NOTICIAS_MOMENTO, NOTICIAS_TECNOLOGIA } from './src/data/noticiasData';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const StackMomento = createNativeStackNavigator();
const StackTecnologia = createNativeStackNavigator();
const StackEsportes = createNativeStackNavigator();

function DetalhesNoticiaScreen({ route, navigation, isDarkMode, marcouComoLida }) {
  const { noticia } = route.params;

  useLayoutEffect(() => {
    marcouComoLida(noticia.id);

    navigation.setOptions({
      title: noticia.titulo,
      headerStyle: { backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF' },
      headerTintColor: isDarkMode ? '#F8FAFC' : '#0F172A',
    });
  }, [navigation, noticia, isDarkMode]);

  const imagemUri = noticia.imagem 
    ? noticia.imagem 
    : 'https://via.placeholder.com/600x300.png?text=Sem+Imagem';

  const currentStyles = isDarkMode ? darkStyles : lightStyles;

  const abrirLinkNoticia = () => {
    if (noticia.url) {
      Linking.openURL(noticia.url).catch((err) =>
        console.error('Erro ao abrir a URL:', err)
      );
    }
  };

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF' }}
      contentContainerStyle={currentStyles.containerDetalhe}
    >
      <Image 
        source={{ uri: imagemUri }} 
        style={styles.imagemNoticia} 
        resizeMode="cover"
      />
      <Text style={currentStyles.categoriaDetalhe}>{noticia.categoria}</Text>
      <Text style={currentStyles.tituloDetalhe}>{noticia.titulo}</Text>
      <Text style={currentStyles.conteudoDetalhe}>{noticia.conteudo}</Text>

      {noticia.url && (
        <TouchableOpacity style={styles.botaoLinkExterno} onPress={abrirLinkNoticia}>
          <Text style={styles.textoBotaoLink}>Link para conteúdo completo</Text>
          <Ionicons name="open-outline" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

function ListaMomentoScreen({ navigation, isDarkMode }) {
  const currentStyles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={currentStyles.containerLista}>
      <Text style={currentStyles.secaoTitulo}>Notícias do Momento</Text>
      <FlatList
        data={NOTICIAS_MOMENTO}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardNoticia
            categoria={item.categoria}
            titulo={item.titulo}
            resumo={item.resumo}
            onPress={() => navigation.navigate('DetalhesNoticia', { noticia: item })}
          />
        )}
      />
    </View>
  );
}

function StackMomentoNavigator({ isDarkMode, marcouComoLida }) {
  return (
    <StackMomento.Navigator>
      <StackMomento.Screen name="ListaMomento" options={{ headerShown: false }}>
        {(props) => <ListaMomentoScreen {...props} isDarkMode={isDarkMode} />}
      </StackMomento.Screen>
      <StackMomento.Screen name="DetalhesNoticia" options={{ headerShown: true }}>
        {(props) => <DetalhesNoticiaScreen {...props} isDarkMode={isDarkMode} marcouComoLida={marcouComoLida} />}
      </StackMomento.Screen>
    </StackMomento.Navigator>
  );
}

function ListaTecnologiaScreen({ navigation, isDarkMode }) {
  const currentStyles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={currentStyles.containerLista}>
      <Text style={currentStyles.secaoTitulo}>Tecnologia</Text>
      <FlatList
        data={NOTICIAS_TECNOLOGIA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardNoticia
            categoria={item.categoria}
            titulo={item.titulo}
            resumo={item.resumo}
            onPress={() => navigation.navigate('DetalhesNoticia', { noticia: item })}
          />
        )}
      />
    </View>
  );
}

function StackTecnologiaNavigator({ isDarkMode, marcouComoLida }) {
  return (
    <StackTecnologia.Navigator>
      <StackTecnologia.Screen name="ListaTecnologia" options={{ headerShown: false }}>
        {(props) => <ListaTecnologiaScreen {...props} isDarkMode={isDarkMode} />}
      </StackTecnologia.Screen>
      <StackTecnologia.Screen name="DetalhesNoticia" options={{ headerShown: true }}>
        {(props) => <DetalhesNoticiaScreen {...props} isDarkMode={isDarkMode} marcouComoLida={marcouComoLida} />}
      </StackTecnologia.Screen>
    </StackTecnologia.Navigator>
  );
}

function ListaEsportesScreen({ navigation, isDarkMode }) {
  const currentStyles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={currentStyles.containerLista}>
      <Text style={currentStyles.secaoTitulo}>Esportes</Text>
      <FlatList
        data={NOTICIAS_ESPORTES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardNoticia
            categoria={item.categoria}
            titulo={item.titulo}
            resumo={item.resumo}
            onPress={() => navigation.navigate('DetalhesNoticia', { noticia: item })}
          />
        )}
      />
    </View>
  );
}

function StackEsportesNavigator({ isDarkMode, marcouComoLida }) {
  return (
    <StackEsportes.Navigator>
      <StackEsportes.Screen name="ListaEsportes" options={{ headerShown: false }}>
        {(props) => <ListaEsportesScreen {...props} isDarkMode={isDarkMode} />}
      </StackEsportes.Screen>
      <StackEsportes.Screen name="DetalhesNoticia" options={{ headerShown: true }}>
        {(props) => <DetalhesNoticiaScreen {...props} isDarkMode={isDarkMode} marcouComoLida={marcouComoLida} />}
      </StackEsportes.Screen>
    </StackEsportes.Navigator>
  );
}

function NoticiasTabNavigator({ isDarkMode, noticiasLidas, marcouComoLida }) {
  const naoLidasMomento = NOTICIAS_MOMENTO.filter((n) => !noticiasLidas.includes(n.id)).length;
  const naoLidasTecnologia = NOTICIAS_TECNOLOGIA.filter((n) => !noticiasLidas.includes(n.id)).length;
  const naoLidasEsportes = NOTICIAS_ESPORTES.filter((n) => !noticiasLidas.includes(n.id)).length;

  return (
    <Tab.Navigator
      initialRouteName="MomentoTab"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: isDarkMode ? '#94A3B8' : '#8E8E93',
        tabBarStyle: { 
          backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarBadgeStyle: {
          fontSize: 10,
          maxHeight: 18,
          minWidth: 18,
          lineHeight: 16,
        },
      }}
    >
      <Tab.Screen
        name="MomentoTab"
        options={{
          title: 'Do Momento',
          tabBarBadge: naoLidasMomento > 0 ? naoLidasMomento : null,
          tabBarIcon: ({ color }) => (
            <Ionicons name="flame-outline" size={22} color={color} />
          ),
        }}
      >
        {() => <StackMomentoNavigator isDarkMode={isDarkMode} marcouComoLida={marcouComoLida} />}
      </Tab.Screen>

      <Tab.Screen
        name="TecnologiaTab"
        options={{
          title: 'Tecnologia',
          tabBarBadge: naoLidasTecnologia > 0 ? naoLidasTecnologia : null,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cpu-64-bit" size={22} color={color} />
          ),
        }}
      >
        {() => <StackTecnologiaNavigator isDarkMode={isDarkMode} marcouComoLida={marcouComoLida} />}
      </Tab.Screen>

      <Tab.Screen
        name="EsportesTab"
        options={{
          title: 'Esportes',
          tabBarBadge: naoLidasEsportes > 0 ? naoLidasEsportes : null,
          tabBarIcon: ({ color }) => (
            <Ionicons name="trophy-outline" size={22} color={color} />
          ),
        }}
      >
        {() => <StackEsportesNavigator isDarkMode={isDarkMode} marcouComoLida={marcouComoLida} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

function SobreScreen({ navigation, isDarkMode }) {
  const currentStyles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={currentStyles.containerSobre}>
      <Text style={currentStyles.tituloSobreScreen}>Sobre</Text>
      
      <View style={styles.iconeSobreBox}>
        <Ionicons name="newspaper-outline" size={90} color={isDarkMode ? '#F8FAFC' : '#000'} />
      </View>

      <View style={styles.divider} />

      <ScrollView style={{ flex: 1 }}>
        <Text style={currentStyles.textoSobre}>
          Esse é o Mini App de Notícias.{'\n'}
          Você vai praticar diferentes tipos de navegação com React-Native:
        </Text>
        <Text style={currentStyles.itemSobre}>• Drawer (raiz)</Text>
        <Text style={currentStyles.itemSobre}>• Tabs (Do Momento/Tecnologia/Esportes)</Text>
        <Text style={currentStyles.itemSobre}>• Stacks (Lista → Detalhes)</Text>
      </ScrollView>

      <TouchableOpacity 
        style={styles.botaoVoltar} 
        onPress={() => navigation.navigate('Noticias')}
      >
        <Text style={styles.textoBotaoVoltar}>VOLTAR</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [noticiasLidas, setNoticiasLidas] = useState([]);

  const marcouComoLida = (idNoticia) => {
    setNoticiasLidas((prevLidas) => {
      if (!prevLidas.includes(idNoticia)) {
        return [...prevLidas, idNoticia];
      }
      return prevLidas;
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator 
          initialRouteName="Noticias"
          screenOptions={{
            headerStyle: { backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF' },
            headerTintColor: isDarkMode ? '#F8FAFC' : '#0F172A',
            drawerStyle: { backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF' },
            drawerActiveTintColor: '#007AFF',
            drawerInactiveTintColor: isDarkMode ? '#94A3B8' : '#334155',
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => setIsDarkMode(!isDarkMode)} 
                style={{ marginRight: 16 }}
              >
                <Ionicons 
                  name={isDarkMode ? 'sunny-outline' : 'moon-outline'} 
                  size={24} 
                  color={isDarkMode ? '#F8FAFC' : '#0F172A'} 
                />
              </TouchableOpacity>
            ),
          }}
        >
          <Drawer.Screen
            name="Noticias"
            options={{
              title: 'Notícias',
              drawerIcon: ({ color, size }) => (
                <Ionicons name="newspaper-outline" size={size} color={color} />
              ),
            }}
          >
            {() => (
              <NoticiasTabNavigator 
                isDarkMode={isDarkMode} 
                noticiasLidas={noticiasLidas} 
                marcouComoLida={marcouComoLida} 
              />
            )}
          </Drawer.Screen>
          <Drawer.Screen
            name="Sobre"
            options={{
              title: 'Sobre',
              drawerIcon: ({ color, size }) => (
                <Ionicons name="information-circle-outline" size={size} color={color} />
              ),
            }}
          >
            {(props) => <SobreScreen {...props} isDarkMode={isDarkMode} />}
          </Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  imagemNoticia: { width: '100%', height: 200, borderRadius: 8, marginBottom: 16 },
  iconeSobreBox: { alignItems: 'center', marginVertical: 10 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 16 },
  botaoVoltar: { backgroundColor: '#2196F3', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  textoBotaoVoltar: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
  botaoLinkExterno: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  textoBotaoLink: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

const lightStyles = StyleSheet.create({
  containerLista: { flex: 1, backgroundColor: '#F8FAFC', paddingTop: 16 },
  secaoTitulo: { fontSize: 24, fontWeight: 'bold', marginLeft: 16, marginBottom: 12, color: '#0F172A' },
  containerDetalhe: { padding: 20, backgroundColor: '#FFFFFF', flexGrow: 1 }, // <--- flexGrow: 1
  categoriaDetalhe: { fontSize: 12, fontWeight: 'bold', color: '#64748B', marginBottom: 6, textTransform: 'uppercase' },
  tituloDetalhe: { fontSize: 22, fontWeight: 'bold', color: '#0F172A', marginBottom: 16, flexShrink: 1 },
  conteudoDetalhe: { fontSize: 16, color: '#334155', lineHeight: 24, flexShrink: 1 },
  containerSobre: { flex: 1, padding: 24, backgroundColor: '#FFFFFF' },
  tituloSobreScreen: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 16, color: '#0F172A' },
  textoSobre: { fontSize: 15, color: '#334155', lineHeight: 22, marginBottom: 12 },
  itemSobre: { fontSize: 15, color: '#475569', marginLeft: 8, marginVertical: 2 },
});

const darkStyles = StyleSheet.create({
  containerLista: { flex: 1, backgroundColor: '#0F172A', paddingTop: 16 },
  secaoTitulo: { fontSize: 24, fontWeight: 'bold', marginLeft: 16, marginBottom: 12, color: '#F8FAFC' },
  containerDetalhe: { padding: 20, backgroundColor: '#1E293B', flexGrow: 1 }, // <--- flexGrow: 1
  categoriaDetalhe: { fontSize: 12, fontWeight: 'bold', color: '#94A3B8', marginBottom: 6, textTransform: 'uppercase' },
  tituloDetalhe: { fontSize: 22, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 16, flexShrink: 1 },
  conteudoDetalhe: { fontSize: 16, color: '#CBD5E1', lineHeight: 24, flexShrink: 1 },
  containerSobre: { flex: 1, padding: 24, backgroundColor: '#1E293B' },
  tituloSobreScreen: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 16, color: '#F8FAFC' },
  textoSobre: { fontSize: 15, color: '#CBD5E1', lineHeight: 22, marginBottom: 12 },
  itemSobre: { fontSize: 15, color: '#94A3B8', marginLeft: 8, marginVertical: 2 },
});