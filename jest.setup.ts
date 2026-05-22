/* eslint-disable @typescript-eslint/no-require-imports */
import 'react-native-gesture-handler/jestSetup'

jest.mock('react-native-reanimated', () => {
  const RN = require('react-native')
  const createAnimatedComponent = (c: unknown) => c

  return {
    __esModule: true,
    default: {
      FlatList: RN.FlatList,
      View: RN.View,
      ScrollView: RN.ScrollView,
      createAnimatedComponent,
    },
    Animated: {
      FlatList: RN.FlatList,
      View: RN.View,
      ScrollView: RN.ScrollView,
      createAnimatedComponent,
    },
    LinearTransition: { duration: (t: number) => ({ duration: t }) },
    FadeInDown: { duration: (t: number) => ({ duration: t }) },
    FadeOut: { duration: (t: number) => ({ duration: t }) },
    useAnimatedStyle: () => ({}),
    useSharedValue: (v: unknown) => ({ value: v }),
    withSpring: (v: unknown) => v,
    withTiming: (v: unknown) => v,
    interpolate: (v: unknown) => v,
    createAnimatedComponent,
  }
})

jest.mock('lucide-react-native', () => {
  const { View } = require('react-native')
  return new Proxy({}, { get: () => View })
})

jest.mock('react-native-worklets', () => ({
  runOnUI: (fn: () => void) => fn,
  runOnJS: (fn: () => void) => fn,
  createSerializable: () => ({ set: () => {}, get: () => undefined }),
}))
