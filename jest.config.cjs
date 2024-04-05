// jest.config.mjs
export default {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|mjs)$': require.resolve('react-native/jest/preprocessor.js'),
  },
};
