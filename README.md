# Mini App de Notícias — React Native & Expo

Projeto desenvolvido para a disciplina de **Desenvolvimento Móvel**, focado na implementação prática de uma arquitetura de navegação encadeada em múltiplos níveis (**Drawer**, **Bottom Tabs** e **Native Stack**) utilizando **React Native** e **Expo**.

---

##  Objetivos do Projeto

- **Navegação Encadeada em 3 Níveis:** Integrar navegação lateral (Drawer), abas inferiores (Bottom Tabs) e pilha de telas (Stack) sem conflitos de rotas.
- **Componentização:** Criação do componente reutilizável `CardNoticia` para exibição dinâmica dos dados.
- **Passagem de Parâmetros:** Envio de dados da notícia selecionada na lista para a tela de detalhes.
- **Cabeçalho Dinâmico:** Atualização do título da barra de navegação de acordo com a notícia aberta através do hook `useLayoutEffect`.
- **Experiência Multiplataforma:** Compatível com Android (emulador e Expo Go), iOS e Web.

---

##  Arquitetura de Navegação

A navegação foi estruturada de forma hierárquica e modular:

```text
Drawer Navigator (Raiz)
├── Sobre (Tela institucional com informações do projeto)
└── Notícias (Bottom Tabs)
    ├── Tecnologia (Stack)
    │   ├── Lista de Notícias (Tecnologia)
    │   └── Detalhes da Notícia
    └── Esportes (Stack)
        ├── Lista de Notícias (Esportes)
        └── Detalhes da Notícia
```

1. **Drawer Navigator (Menu Lateral - Raiz):**
   - **Notícias:** Direciona para o fluxo principal de leitura com abas.
   - **Sobre:** Tela informativa sobre a proposta do aplicativo com botão para voltar às notícias.

2. **Bottom Tab Navigator (Abas Inferiores):**
   - **Tecnologia:** Lista de notícias do setor tecnológico (ícone de chip/processador).
   - **Esportes:** Lista de notícias do setor esportivo (ícone de troféu).

3. **Native Stack Navigator (Pilha Interna):**
   - Presente de forma independente dentro de cada aba.
   - Transita da lista principal (`ListaTecnologiaScreen` ou `ListaEsportesScreen`) para a tela de leitura aprofundada (`DetalhesNoticiaScreen`).

---

##  Estrutura de Arquivos

```text
MiniAppNoticias/
├── src/
│   ├── components/
│   │   └── CardNoticia.js     # Componente visual reutilizável de cada notícia
│   └── data/
│       └── noticiasData.js    # Dados mockados (Tecnologia e Esportes)
├── App.js                     # Configuração de rotas, navegadores e telas
├── app.json                   # Configuração e metadados do Expo
├── babel.config.js            # Configuração do compilador Babel e Reanimated
├── package.json               # Dependências e scripts de execução
└── README.md                  # Documentação do projeto
```

---

##  Tecnologias Utilizadas

- **[React Native](https://reactnative.dev/)**
- **[Expo](https://expo.dev/)**
- **[React Navigation](https://reactnavigation.org/):**
  - `@react-navigation/native`
  - `@react-navigation/drawer`
  - `@react-navigation/bottom-tabs`
  - `@react-navigation/native-stack`
- **[React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)**
- **[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)**
- **[Expo Vector Icons](https://icons.expo.fyi/)**

---

##  Como Executar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado no computador (versão LTS recomendada).
- Aplicativo **Expo Go** instalado no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779)) **ou** um emulador Android configurado via Android Studio.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone <URL_DO_SEU_REPOSITORIO>
   cd MiniAppNoticias
   ```

2. **Instale as dependências:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Inicie o servidor de desenvolvimento (Metro Bundler):**
   ```bash
   npx expo start -c
   ```

4. **Escolha como visualizar a aplicação:**
   - **No Celular Físico:** Abra o aplicativo **Expo Go** no celular e escaneie o QR Code exibido no terminal.
   - **No Navegador (Web):** Pressione a tecla **`w`** no terminal.
   - **No Emulador Android:** Com o emulador do Android Studio já aberto e em execução, pressione a tecla **`a`** no terminal.
