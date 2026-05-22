# TODO Flow

Solução desenvolvida para o desafio técnico de Desenvolvedor React Native da PWI Sistemas. O aplicativo consiste em uma tela "To Do List" com operações CRUD completas (criar, ler, atualizar, deletar).

## 🚀 Build e Execução

Este projeto foi gerado com React Native CLI (Bare Workflow) e TypeScript. A documentação a seguir contém as instruções necessárias para rodar a solução.

**Pré-requisitos:** Node.js, Watchman, Ruby (para iOS/CocoaPods) e ambiente nativo configurado (Android Studio / Xcode).

1. Clone o repositório.
2. Instale as dependências: `npm install` ou `yarn install`
3. Instale os pods (iOS): `npx pod-install`
4. Rode o projeto:
   - iOS: `npm run ios`
   - Android: `npm run android`

## 🏗 Arquitetura e Design

- **KISS & Locality**: Estrutura simplificada em raiz única (`App.tsx` e `components/`), focada na clareza e evitando fragmentação prematura para o escopo de tela única.
- **State Management**: As responsabilidades estão bem definidas. O estado reside no `App.tsx` (Single Source of Truth), enquanto os componentes visuais (`TodoList`, `TodoItem`, `TodoInput`) são desacoplados e controlados via props.
- **Identidade Visual**: Implementado usando a identidade de cores solicitada (Azul `#004B87`).
- **Funcionalidades Adicionais**: Além do CRUD básico, possui alternância de visualização (Lista / Grade) e limpeza em lote das tarefas concluídas.

## 🧪 Qualidade de Código e Testes

- **Acessibilidade (A11y)**: Alvos de toque com mínimo de 44x44pt para melhor UX, e uso estrito de `accessibilityLabel` e `accessibilityRole`.
- **Testes Automatizados**: Implementados com `@testing-library/react-native`. A escolha desta biblioteca foca em testar o comportamento do usuário (User-Centric Testing) e não os detalhes de implementação, o que torna os testes extremamente resilientes a refatorações (ex: mudar uma View para ScrollView não quebra o teste).
  - Para executar: `npm run test`
