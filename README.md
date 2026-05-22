# TODO Flow

Solução desenvolvida para o desafio técnico de Desenvolvedor React Native da PWI Sistemas. A aplicação consiste num ecrã "To Do List" com operações CRUD completas (criar, ler, atualizar, eliminar), com um forte foco na fluidez da interface e micro-interações nativas.

## 🚀 Build e Execução

Este projeto foi gerado com React Native CLI (Bare Workflow) e TypeScript. A documentação a seguir contém as instruções necessárias para correr a solução.

**Pré-requisitos:** Node.js, Watchman, Ruby (para iOS/CocoaPods) e ambiente nativo configurado (Android Studio / Xcode).

1. Clone o repositório.
2. Instale as dependências: `npm install` ou `yarn install`
3. Instale os pods (iOS): `cd ios && pod-install && cd ..`
4. Corra o projeto:
   - iOS: `npm run ios` ou `yarn ios`
   - Android: `npm run android` ou `yarn android`

## 🛠 Tecnologias e Ecosistema

- **React Native (Bare Workflow)** + **TypeScript**: Tipagem estrita e sem uso de `any`.
- **React Native Reanimated (v3/v4)**: Transições de layout (`LinearTransition`), animações de entrada/saída (`FadeInDown`, `FadeOut`) e micro-interações a 60FPS na UI Thread.
- **React Native Gesture Handler**: Gestos fluidos na UI Thread (utilização do `ReanimatedSwipeable` para exclusão de itens).
- **Lucide React Native**: Biblioteca de ícones vetoriais leves.

## 🏗 Arquitetura e Design

- **KISS & Locality**: Estrutura simplificada em raiz única (`App.tsx` e `components/`), focada na clareza e evitando abstrações prematuras ou fragmentação para o escopo de ecrã único.
- **State Management**: As responsabilidades estão bem definidas. O estado local reside no `App.tsx` (Single Source of Truth), enquanto os componentes visuais (`TodoList`, `TodoItem`, `TodoInput`) são desacoplados e controlados via props.
- **Identidade Visual e UX**: Design System construído com base na identidade visual da PWI Sistemas (Paleta Dark Mode com Azul Escuro `#1A2639`, Cyan `#38BDF8` e Verde `#A3E635`).
- **Visualização Adaptativa**: Implementação de visualização mista (Lista / Grade). Os comportamentos adaptam-se ao contexto (Swipe para eliminar na lista; botão contextual com `Alert` de confirmação na grade).

## 🧪 Qualidade de Código e Testes

- **Acessibilidade (A11y)**: Alvos de toque com o mínimo de 44x44pt para melhor UX (áreas de toque invisíveis sobrepostas a elementos visuais pequenos, como os indicadores de status), e uso estrito de `accessibilityLabel` e `accessibilityRole`.
- **Testes Automatizados**: Implementados com `@testing-library/react-native`. A escolha desta biblioteca foca em testar o comportamento do utilizador (User-Centric Testing) e não os detalhes de implementação, o que tornou os testes extremamente resilientes à profunda refatoração visual e de animações aplicada na Fase 2.
  - Para executar: `npm run test` ou `yarn test`
