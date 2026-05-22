module.exports = {
  preset: '@react-native/jest-preset',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    'react-native-gesture-handler/ReanimatedSwipeable':
      '<rootDir>/src/__mocks__/ReanimatedSwipeable.tsx',
  },
}
