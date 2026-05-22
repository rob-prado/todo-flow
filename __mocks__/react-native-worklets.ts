export const runOnUI = (fn: () => void) => fn
export const runOnJS = (fn: () => void) => fn
export const createSerializable = (_fn: (...args: unknown[]) => unknown) => ({
  set: (_val: unknown) => {},
  get: () => undefined,
})
