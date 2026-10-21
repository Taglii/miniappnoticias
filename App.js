import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CardNoticia from './src/components/CardNoticia';
import { NOTICIAS_ESPORTES, NOTICIAS_TECNOLOGIA } from './src/data/noticiasData';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const StackTecnologia = createNativeStackNavigator();
const StackEsportes = createNativeStackNavigator();

// --- TELA DE DETALHES ---
function DetalhesNoticiaScreen({ route, navigation }) {
  const { noticia } = route.params;

  // Customização dinâmica do título do Header (navigation.setOptions)
  useLayoutEffect(() => {
    navigation.setOptions({
      title: noticia.titulo,
    });
  }, [navigation, noticia]);

  return (
    <View style={styles.containerDetalhe}>
      <Text style={styles.categoriaDetalhe}>{noticia.categoria}</Text>
      <Text style={styles.tituloDetalhe}>{noticia.titulo}</Text>
      <Text style={styles.conteudoDetalhe}>{noticia.conteudo}</Text>
    </View>
  );
}

// --- FLUXO TECNOLOGIA (STACK) ---
function ListaTecnologiaScreen({ navigation }) {
  return (
    <View style={styles.containerLista}>
      <Text style={styles.secaoTitulo}>Tecnologia</Text>
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

function StackTecnologiaNavigator() {
  return (
    <StackTecnologia.Navigator>
      <StackTecnologia.Screen 
        name="ListaTecnologia" 
        component={ListaTecnologiaScreen} 
        options={{ headerShown: false }} 
      />
      <StackTecnologia.Screen 
        name="DetalhesNoticia" 
        component={DetalhesNoticiaScreen} 
        options={{ headerShown: true }} 
      />
    </StackTecnologia.Navigator>
  );
}

// --- FLUXO ESPORTES (STACK) ---
function ListaEsportesScreen({ navigation }) {
  return (
    <View style={styles.containerLista}>
      <Text style={styles.secaoTitulo}>Esportes</Text>
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

function StackEsportesNavigator() {
  return (
    <StackEsportes.Navigator>
      <StackEsportes.Screen 
        name="ListaEsportes" 
        component={ListaEsportesScreen} 
        options={{ headerShown: false }} 
      />
      <StackEsportes.Screen 
        name="DetalhesNoticia" 
        component={DetalhesNoticiaScreen} 
        options={{ headerShown: true }} 
      />
    </StackEsportes.Navigator>
  );
}

// --- TAB NAVIGATOR (TECNOLOGIA / ESPORTES) ---
function NoticiasTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tab.Screen
        name="TecnologiaTab"
        component={StackTecnologiaNavigator}
        options={{
          title: 'Tecnologia',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cpu-64-bit" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="EsportesTab"
        component={StackEsportesNavigator}
        options={{
          title: 'Esportes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// --- TELA SOBRE ---
function SobreScreen({ navigation }) {
  return (
    <View style={styles.containerSobre}>
      <Text style={styles.tituloSobreScreen}>Sobre</Text>
      
      <View style={styles.iconeSobreBox}>
        <Ionicons name="newspaper-outline" size={90} color="#000" />
      </View>

      <View style={styles.divider} />

      <ScrollView style={{ flex: 1 }}>
        <Text style={styles.textoSobre}>
          Esse é o Mini App de Notícias.{'\n'}
          Você vai praticar diferentes tipos de navegação com React-Native:
        </Text>
        <Text style={styles.itemSobre}>• Drawer (raiz)</Text>
        <Text style={styles.itemSobre}>• Tabs (Tecnologia/Esportes)</Text>
        <Text style={styles.itemSobre}>• Stacks (Lista → Detalhes)</Text>
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

// --- DRAWER NAVIGATOR (RAIZ DO APP) ---
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Noticias">
        <Drawer.Screen
          name="Noticias"
          component={NoticiasTabNavigator}
          options={{
            title: 'Notícias',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="newspaper-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Sobre"
          component={SobreScreen}
          options={{
            title: 'Sobre',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="information-circle-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  containerLista: { flex: 1, backgroundColor: '#F8FAFC', paddingTop: 16 },
  secaoTitulo: { fontSize: 24, fontWeight: 'bold', marginLeft: 16, marginBottom: 12, color: '#0F172A' },
  
  containerDetalhe: { flex: 1, padding: 20, backgroundColor: '#FFFFFF' },
  categoriaDetalhe: { fontSize: 12, fontWeight: 'bold', color: '#64748B', marginBottom: 6, textTransform: 'uppercase' },
  tituloDetalhe: { fontSize: 22, fontWeight: 'bold', color: '#0F172A', marginBottom: 16 },
  conteudoDetalhe: { fontSize: 16, color: '#334155', lineHeight: 24 },

  containerSobre: { flex: 1, padding: 24, backgroundColor: '#FFFFFF' },
  tituloSobreScreen: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 16, color: '#0F172A' },
  iconeSobreBox: { alignItems: 'center', marginVertical: 10 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 16 },
  textoSobre: { fontSize: 15, color: '#334155', lineHeight: 22, marginBottom: 12 },
  itemSobre: { fontSize: 15, color: '#475569', marginLeft: 8, marginVertical: 2 },
  
  botaoVoltar: { backgroundColor: '#2196F3', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  textoBotaoVoltar: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
});