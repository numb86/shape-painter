const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        safari: '13',
      },
      useBuiltIns: 'usage',
      corejs: '3',
    },
  ],
  [
    '@babel/preset-react',
    {
      development: process.env.NODE_ENV === 'development',
    },
  ],
  ['@babel/preset-typescript'],
];

const plugins = ['babel-plugin-styled-components'];

if (process.env.NODE_ENV === 'test') {
  presets.push(['power-assert']);
}

if (process.env.NODE_ENV !== 'test') {
  plugins.push('react-remove-properties');
}

const config = {
  presets,
  plugins,
};

module.exports = config;
