import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import scss from 'rollup-plugin-scss';

export default {
  input: 'lib/dragin.js',
  output: {
    file: './dist/dragin.js',
    format: 'umd',
    name: 'Dragin'
  },
  external: ['jo-util'],
  plugins: [
    resolve({
      jsnext: true
    }),
    scss({
      output: 'dist/dragin.css'
    }),
    babel({
      runtimeHelpers: true,
      babelrc: false,
      presets: [['@babel/preset-env', { modules: false }]]
    })
  ]
};
