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
    setOptions({ clone = false, start = util.noop, move = util.noop, end = util.noop }) {
      this.clone = clone;
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

      this.callback.start(this.cx, this.cy);
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
      this.mirror.style.left = this.cx + 'px';
      this.mirror.style.top = this.cy + 'px';

      this.callback.move(this.cx, this.cy);
    }

    end() {
      if (this.clone) {
        this.remove();
      }

      // 释放事件
      this.unbind();
      this.unbind2();
      this.callback.end();
    }
}

export default Dragin;
