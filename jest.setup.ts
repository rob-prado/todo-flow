import 'react-native-gesture-handler/jestSetup'

jest.mock('react-native-nitro-modules', () => ({
  NitroModules: {
    createHybridObject: jest.fn(),
  },
}))

const mockMmkvStorage = new Map<string, string>()

jest.mock('react-native-mmkv', () => ({
  createMMKV: jest.fn().mockImplementation(() => ({
    getString: (key: string) => mockMmkvStorage.get(key) ?? undefined,
    set: (key: string, value: string) => mockMmkvStorage.set(key, value),
    delete: (key: string) => mockMmkvStorage.delete(key),
    getAllKeys: () => Array.from(mockMmkvStorage.keys()),
    clearAll: () => mockMmkvStorage.clear(),
  })),
  existsMMKV: () => false,
  deleteMMKV: () => true,
}))

jest.mock('react-native-reanimated', () => {
  const RN = jest.requireActual('react-native') as typeof import('react-native')
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
  const RN = jest.requireActual('react-native') as typeof import('react-native')
  return new Proxy({}, { get: () => RN.View })
})

jest.mock('react-native-worklets', () => ({
  runOnUI: (fn: () => void) => fn,
  runOnJS: (fn: () => void) => fn,
  createSerializable: () => ({ set: () => {}, get: () => undefined }),
}))
