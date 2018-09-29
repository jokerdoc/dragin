import util from 'jo-util';
import Dragin from './dragin.js';

new Dragin(util.getEls('.box')[0], {
  clone: () => '<div>123</div>',
  dir: 'hor',
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
  limitX: [120, 320],
  limitY: [10, 210],
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
