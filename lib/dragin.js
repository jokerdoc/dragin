/**
 * 拖拽
 */

import util from 'lemon-util';
import './dragin.scss';

class Dragin {
  constructor(elem, options) {
    this.elem = elem;
    this.mirror = null;
    this.setOptions(options);
    this.setup();
  }

  // 设置配置
  setOptions({ clone = false, dir = 'hor,ver', limitX = [], limitY = [], start = util.noop, move = util.noop, end = util.noop }) {
    this.clone = clone;
    let temp = dir.split(',');
    this.hasHor = temp.indexOf('hor') > -1;
    this.hasVer = temp.indexOf('ver') > -1;
    this.limitX = limitX;   // 限制X的范围
    this.limitY = limitY;   // 限制Y的范围
    this.callback = { start, move, end };
  }

  // 启动
  setup() {

    // this.elem.classList.add('dragin');
    // util.addClass(this.elem, 'dragin-source');
    util.addEvent(this.elem, 'mousedown', (e) => {
      this.start(e);
    }, false)
  }

  create() {
    this.mirror = this.elem.cloneNode(true);
    this.mirror.style.left = this.cx + 'px';
    this.mirror.style.top = this.cy + 'px';
    util.addClass(this.mirror, 'dragin-mirror');
    document.body.appendChild(this.mirror);
  }

  remove() {
    if (this.mirror) {
      document.body.removeChild(this.mirror);
      this.mirror = null;
    }
  }

  start(e) {

    const point = util.getOffset(this.elem);
    // this.elem.style.ev
    this.cx = point.x;
    this.cy = point.y;
    // 偏差值
    this.disX = this.cx - e.clientX;
    this.disY = this.cy - e.clientY;

    this.unbind = util.addEvent(document, 'mousemove', (e) => {
      this.move(e);
      e.preventDefault();
    });

    this.unbind2 = util.addEvent(document, 'mouseup', () => {
      this.end();
    });

    this.callback.start.call(this, this.cx, this.cy);
  }

  move(e) {

    if (!this.mirror) {
      if (this.clone) {
        this.create();
      }
      else {
        this.mirror = this.elem;
      }
    }

    this.cx = e.clientX + this.disX;
    this.cy = e.clientY + this.disY;

    // 限制移动
    if (this.cx < this.limitX[0]) {
      this.cx = this.limitX[0];
    }
    else if (this.cx > this.limitX[1] - this.mirror.offsetWidth) {
      this.cx = this.limitX[1] - this.mirror.offsetWidth;
    }

    if (this.cy < this.limitY[0]) {
      this.cy = this.limitY[0];
    }
    else if (this.cy > this.limitY[1] - this.mirror.offsetHeight) {
      this.cy = this.limitY[1] - this.mirror.offsetHeight;
    }

    if (this.hasHor) {
      this.mirror.style.left = this.cx + 'px';
    }
    else {
      this.cx = this.mirror.offsetLeft;
    }

    if (this.hasVer) {
      this.mirror.style.top = this.cy + 'px';
    }
    else {
      this.cy = this.mirror.offsetTop;
    }

    this.callback.move.call(this, this.cx, this.cy);
  }

  end() {
    if (this.clone) {
      this.remove();
    }

    // 释放事件
    this.unbind();
    this.unbind2();
    this.callback.end.call(this, this.cx, this.cy);
  }
}

export default Dragin;
