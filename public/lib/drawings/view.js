import actions from './actions'

class DrawingsCanvas {
  constructor(store){
    var canvas = document.getElementById('drawingsCanvas');
    this.context = canvas.getContext('2d');
    this.store = store;

    canvas.addEventListener('mousedown', actions.mouseDown);
    canvas.addEventListener('mousemove', actions.mouseMove);
    canvas.addEventListener('mouseup', actions.mouseUp);
    canvas.addEventListener('mouseleave', actions.mouseLeave);

    store.registerObserver(this.storeUpdated.bind(this));
  }

  storeUpdated(){
    this.redraw(this.store.data);
  }

  clear(){
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  setDefaultDrawingStyle(){
    this.context.strokeStyle = "#df4b26";
    this.context.lineJoin = "round";
    this.context.lineWidth = 5;
  }

  redraw(diffs){
    var cx = this.context;
    this.clear();
    this.setDefaultDrawingStyle();

    diffs.forEach((diff, i) => {
      cx.beginPath();

      if (diff.dragging && i) {
        cx.moveTo(diffs[i - 1].x, diffs[i - 1].y);
      } else {
        cx.moveTo(diff.x-1, diff.y);
      }

      cx.lineTo(diff.x, diff.y);
      cx.closePath();
      cx.stroke();
    });
  }
}

export default function(store){
  return new DrawingsCanvas(store);
}
