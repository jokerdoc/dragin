import util from 'lemon-util';
import Dragin from './dragin.js';

new Dragin(util.getEls('.box')[0], {
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

new Dragin(util.getEls('.box')[1], {
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
