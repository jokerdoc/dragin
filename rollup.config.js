import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import scss from 'rollup-plugin-scss';

export default {
  input: 'lib/dragin.js',
  output: {
    file: './dist/dragin.js',
    format: 'umd',
    name: 'joDragin',
  },
  external: ['jo-util'],
  plugins: [
    resolve({
      jsnext: true
    }),
    commonjs(),
    scss({
      output: 'dist/dragin.css'
    }),
    babel({
      runtimeHelpers: true,
      babelrc: false,
      presets: [['@babel/preset-env', { modules: false }]]
    })
  ],
};
