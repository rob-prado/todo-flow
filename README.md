# TODO Flow

Solução desenvolvida para o desafio técnico de Desenvolvedor React Native da PWI Sistemas. A aplicação consiste numa tela de "To Do List" com operações CRUD completas (criar, ler, atualizar, eliminar), com um forte foco na fluidez da interface e micro-interações nativas.

## 🚀 Build e Execução

Este projeto foi gerado com React Native CLI (Bare Workflow) e TypeScript. A documentação a seguir contém as instruções necessárias para correr a solução.

**Pré-requisitos:** Node.js, Watchman, Ruby (para iOS/CocoaPods) e ambiente nativo configurado (Android Studio / Xcode).

1. Clone o repositório.
2. Instale as dependências: `npm install` ou `yarn install`
3. Instale os pods (iOS): `cd ios && pod-install && cd ..`
4. Corra o projeto:
   - iOS: `npm run ios` ou `yarn ios`
   - Android: `npm run android` ou `yarn android`
5. Execute os testes: `npm run test` ou `yarn test`

## 🛠 Tecnologias e Ecosistema

- **React Native (Bare Workflow)** + **TypeScript**: Tipagem estrita com zero tolerância a `any` em produção. Contratos de dados definidos via interfaces (`TodoDTO`) para garantir consistência entre store e componentes.
- **Zustand**: State management minimalista e desacoplado. A store global (`useTodoStore`) centraliza o estado das tarefas e modo de visualização, eliminando prop-drilling e simplificando a injeção de estado em testes.
- **Zod (v3)**: Validação de schemas em runtime que complementa o TypeScript. Garante que dados de entrada do utilizador e entidades `TodoDTO` respeitem contratos mesmo em fronteiras externas (input de texto, persistência futura).
- **React Native Reanimated (v3/v4)**: Motor de animações nativas que roda na UI Thread. Utilizado para transições de layout (`LinearTransition`), animações de entrada/saída (`FadeInDown`, `FadeOut`) e micro-interações a 60FPS (animação do indicador de status e opacidade do card ao concluir).
- **React Native Gesture Handler**: Gestos fluidos e responsivos na UI Thread. Integração com `ReanimatedSwipeable` para ação de exclusão via swipe no modo lista.
- **Lucide React Native**: Biblioteca de ícones vetoriais leves e consistentes.
- **React Native Safe Area Context**: Gestão programática de insets nativos (`useSafeAreaInsets`), garantindo que a UI respeite as áreas seguras de cada dispositivo sem depender de wrappers opacos.

## 🏗 Arquitetura e Design

- **KISS & Locality**: Estrutura simplificada e coesa. A aplicação é de uma tela única, portanto a arquitetura evita fragmentação desnecessária. A lógica de negócio reside na store Zustand (`store/useTodoStore.ts`), enquanto os componentes visuais (`TodoList`, `TodoItem`, `TodoInput`) são puramente reativos e desacoplados, consumindo estado via seletores.
- **State Management**: O **Zustand** atua como Single Source of Truth. O `App.tsx` orquestra a composição dos componentes, mas não mantém estado local de tarefas. Isso permite:
  - Reset determinístico do estado entre testes (`useTodoStore.setState(...)`);
  - Alteração de modo de visualização (`list` ↔ `grid`) sem re-renderização cascata de componentes não afetados.
- **Segurança de Borda (Zod)**: Schemas validam dados em duas camadas:
  - **Input** (`TodoInputSchema`): `safeParse` no `TodoInput` rejeita títulos vazios, espaços puros e textos >100 caracteres antes de tocar na store, exibindo feedback visual (borda vermelha + label);
  - **Entidade** (`TodoDTOSchema`): `parse` na store garante que todo objeto `TodoDTO` criado internamente respeite o contrato completo (`id`, `title`, `completed`, `createdAt`).
- **Design System**: Tema centralizado em `theme/colors.ts` com identidade visual da PWI Sistemas — Paleta Dark Mode composta por Azul Escuro (`#1A2639`), Cyan (`#38BDF8`) e Verde (`#A3E635`). Tipografia e espaçamentos seguem consistência rigorosa para alto contraste e legibilidade.
- **Visualização Adaptativa**: Comportamentos de UI adaptam-se dinamicamente ao contexto:
  - **Modo Lista**: Exclusão via gesto de swipe (`ReanimatedSwipeable`) com ação destrutiva à direita;
  - **Modo Grade**: Botão contextual de exclusão visível em cada card, acionando `Alert` nativo de confirmação antes da remoção, dado o espaço reduzido e a impossibilidade de swipe em grids multi-coluna.

## 🧪 Qualidade de Código e Testes

- **Acessibilidade (A11y)**: Alvos de toque respeitam o mínimo de 44×44pt (áreas de toque invisíveis sobrepostas a elementos visuais pequenos, como os indicadores de status). Uso estrito de `accessibilityLabel` e `accessibilityRole` em todos os elementos interativos, tornando a aplicação navegável por leitores de tela e, como efeito colateral, fornecendo ancoras robustas para testes automatizados.
- **Testes Automatizados**: Suite completa de integração implementada com `@testing-library/react-native`, adotando a filosofia de **User-Centric Testing**. Os testes validam fluxos de negócio reais (CRUD completo) — adição com validação de entrada, edição inline por blur/submit, alternância de status, exclusão com confirmação em modal nativo (`Alert`) e limpeza de histórico — sem acoplar-se a detalhes de implementação visual.

  A estratégia de queries baseia-se em **acessibilidade** (`accessibilityLabel` e texto visível), o que tornou a suite naturalmente resiliente à profunda refatoração da Fase 2 (mudança de layout linear para grid, introdução de `react-native-reanimated`, `ReanimatedSwipeable`, transições animadas e validação com Zod). O estado global do Zustand é resetado antes de cada teste, garantindo isolamento total entre cenários.

  - **Cobertura de fluxos**:
    - Validação de entrada via Zod (rejeita textos vazios ou apenas espaços, exibe erro visual);
    - Edição de título via pressão no texto e submissão do teclado;
    - Exclusão contextual no modo grade com confirmação via `Alert.alert`;
    - Conclusão de tarefas e limpeza de histórico de concluídas.
  - **Infraestrutura de Testes**: Ambiente de testes conta com mocks completos para bibliotecas nativas complexas:
    - `react-native-reanimated` — mock com `__esModule: true` e factory de componentes animados (`Animated.FlatList`, `Animated.View`, hooks de estilo);
    - `react-native-gesture-handler/ReanimatedSwipeable` — mock simplificado para evitar dependências de UI Thread no ambiente Node;
    - `react-native-worklets` — stubs para `runOnUI` e `runOnJS`;
    - `lucide-react-native` — proxy que renderiza `View` inertes, eliminando a necessidade de mockar ícones individualmente.
  - Para executar: `npm run test` ou `yarn test`

## 📁 Estrutura de Diretórios

```
__mocks__/
└── react-native-gesture-handler/
    └── ReanimatedSwipeable.tsx
├── react-native-reanimated.ts
└── react-native-worklets.ts

src/
├── __tests__/
│   └── App.test.tsx
├── App.tsx
├── components/
│   ├── index.tsx
│   ├── TodoInput/
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── TodoItem/
│   │   ├── index.tsx
│   │   └── styles.ts
│   └── TodoList/
│       ├── index.tsx
│       └── styles.ts
├── store/
│   └── useTodoStore.ts
├── theme/
│   └── colors.ts
└── types/
    ├── index.ts
    └── jest-reanimated.d.ts

jest.config.js
jest.setup.ts
```

## ⚖️ Decisões Técnicas & Trade-offs

| Decisão                                     | Motivação                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Zustand em vez de Context API**           | Para uma tela única, Context API introduziria boilerplate desnecessário (Providers, `useReducer`). Zustand oferece API mais concisa, melhor performance em atualizações frequentes (seletores evitam re-renders) e testabilidade superior (injeção direta de estado).                                                                          |
| **Zod v3 em vez de v4**                     | O Zod v4 introduz sintaxe `export * as` que exige plugin adicional do Babel no React Native CLI. A v3 oferece a mesma API de schemas (`safeParse`, `z.infer`, `.pipe`, `.transform`) com compatibilidade imediata, sem alterar a configuração de build.                                                                                        |
| **Mock de Reanimated no Jest**              | Reanimated v3/v4 depende de C++ nativo e Worklet Runtime, inexistentes no ambiente Node. O mock factory no `jest.setup.ts` com `__esModule: true` garante que `import Animated from 'react-native-reanimated'` resolva corretamente, permitindo que componentes com `Animated.FlatList` e `Animated.View` renderizem sem erros de `undefined`. |
| **Edição via `onBlur` + `onSubmitEditing`** | Em vez de modais ou telas separadas, a edição inline reduz atrito cognitivo. O `TextInput` substitui o `Text` condicionalmente, mantendo o foco contextual e minimizando mudanças de layout.                                                                                                                                                   |
| **Separação de Pendentes e Concluídas**     | A lista principal (`FlatList`) renderiza apenas pendentes para otimizar o VirtualizedList. Concluídas são renderizadas como `ListFooterComponent`, evitando complexidade de seções múltiplas enquanto mantém a hierarquia visual clara.                                                                                                        |
| **Exclusão diferenciada por modo**          | Swipe é desabilitado no modo grid (`numColumns={2}`) porque o `ReanimatedSwipeable` não comporta bem layouts multi-coluna. O botão contextual com `Alert` de confirmação no grid evita exclusões acidentais em cards menores.                                                                                                                  |
| **Padrão `index.tsx` por componente**       | Cada componente reside numa pasta própria com `index.tsx` e `styles.ts`. Isso padroniza imports (`components/TodoItem`), simplifica refatorações futuras (adicionar sub-componentes ou hooks locais) e mantém o barrel export (`components/index.tsx`) limpo.                                                                                  |
