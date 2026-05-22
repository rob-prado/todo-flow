import { FlatList, View, ScrollView } from 'react-native'

const AnimatedObj = {
  FlatList,
  View,
  ScrollView,
}

export default AnimatedObj
export const Animated = AnimatedObj
export const createAnimatedComponent = (c: unknown) => c
export const useAnimatedStyle = () => ({})
export const useSharedValue = (initialValue: unknown) => ({ value: initialValue })
export const withSpring = (v: unknown) => v
export const withTiming = (v: unknown) => v
export const FadeInDown = { duration: (t: number) => ({ duration: t }) }
export const FadeOut = { duration: (t: number) => ({ duration: t }) }
export const LinearTransition = { duration: (t: number) => ({ duration: t }) }
export const interpolate = (value: unknown) => value
