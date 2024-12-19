module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./src/'],
        alias: {
          '@RootNavigation': './src/routes/RootNavigation',
          '@assets': './src/assets',
        },
        extensions: ['.ios.js', '.android.js', '.js', '.json'],
      },
    ],
    'react-native-reanimated/plugin',
    ['@babel/plugin-transform-private-methods', { loose: true }],
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};
