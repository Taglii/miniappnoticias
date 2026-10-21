# Mini App de Notícias — React Native & Expo

Projeto desenvolvido para a disciplina de Desenvolvimento Móvel, focado na implementação de estruturas de navegação complexas e encadeadas (Drawer, Bottom Tabs e Stack Navigation) utilizando React Native e Expo CLI.

---

## Objetivos do Projeto

- Implementar uma arquitetura de navegação multi-nível sem a utilização do Expo Router.
- Criar componentes reutilizáveis para exibição de listas dinâmicas.
- Customizar dinamicamente o cabeçalho (Header) com o título da notícia selecionada.
- Garantir uma experiência de usuário fluida em dispositivos Android e iOS.

---

## Arquitetura de Navegação

O aplicativo utiliza uma estrutura hierárquica de navegação composta por:

1. Drawer Navigator (Nível Raiz):
   - Notícias: Acesso à tela principal de notícias.
   - Sobre: Tela institucional com informações do projeto e botão de retorno.

2. Bottom Tab Navigator (Nível Intermediário):
   - Tecnologia: Aba com listagem de notícias do setor tecnológico.
   - Esportes: Aba com listagem de notícias do setor esportivo.

3. Native Stack Navigator (Nível Interno):
   - Gerencia a transição da lista de notícias (ListaScreen) para a leitura detalhada (DetalhesNoticiaScreen).

---

## Estrutura do Projeto

```text
MiniAppNoticias/
├── assets/                  # Ícones e imagens do aplicativo
├── src/
│   ├── components/
│   │   └── CardNoticia.js   # Componente reutilizável do card de notícia
│   └── data/
│       └── noticiasData.js  # Mapeamento e dados fictícios de notícias
├── App.js                   # Configuração principal da navegação e telas
├── app.json                 # Configurações do Expo
├── package.json             # Dependências e scripts do projeto
└── README.md                # Documentação do repositório

## Como Executar o Projeto

Pré-requisitos
Node.js instalado.

Android Studio com um emulador configurado (ex: Pixel 6) ou o aplicativo Expo Go no smartphone.

Passo a passo
Clonar o repositório:

Bash
git clone <LINK_DO_SEU_REPOSITORIO>
cd MiniAppNoticias
Instalar as dependências:

Bash
npm install --legacy-peer-deps
Iniciar o Metro Bundler:

Bash
npx expo start
Executar na plataforma desejada:

Android: Pressione a no terminal (garanta que o emulador está aberto).

iOS / Dispositivo Físico: Escaneie o QR Code gerado no terminal usando a câmera ou o app Expo Go.

Tecnologias Utilizadas
React Native (v0.72+)

Expo (SDK)

React Navigation

@react-navigation/native

@react-navigation/drawer

@react-navigation/bottom-tabs

@react-navigation/native-stack

Expo Vector Icons (Ionicons, MaterialCommunityIcons)