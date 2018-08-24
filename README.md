# dragin
拖拽

### 在项目中安装
```bash
npm install jo-dragin --save
# 或
yarn add jo-dragin
```

### 使用
```js
import Dragin from 'jo-dragin';

new Dragin(docment.querySelector('#box'), {
  clone: true,
  start(x, y) {
    console.log('start', x, y);
  },
  move(x, y) {
    console.log('move', x, y);
  },
  end() {
    console.log('end');
  }
})
```
