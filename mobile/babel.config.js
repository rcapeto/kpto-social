module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {
            '~': './src/',
            '@components': './src/components/',
            '@contexts': './src/contexts/',
            '@hooks': './src/hooks/',
            '@http': './src/lib/http/',
            '@events': './src/lib/events/',
            '@services': './src/services/',
            '@config': './src/config/',
            '@utils': './src/utils/',
            '@interfaces': './src/interfaces/',
            '@routes': './src/routes/',
          },
        },
      ],
    ],
  }
}
