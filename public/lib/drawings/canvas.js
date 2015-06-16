class Canvas {
  constructor(width, height, actions, store){
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
    this.redraw(this.store.xs, this.store.ys, this.store.draggs);
  }

  clear(){
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  setDefaultDrawingStyle(){
    this.context.strokeStyle = "#df4b26";
    this.context.lineJoin = "round";
    this.context.lineWidth = 5;
  }

  redraw(xs, ys, drags){
    var context = this.context;
    this.clear();
    this.setDefaultDrawingStyle();

    for (let i = 0; i < xs.length; i++) {
      context.beginPath();
      if (drags[i] && i) {
        context.moveTo(xs[i - 1], ys[i - 1]);
      } else {
        context.moveTo(xs[i]-1, ys[i]);
      }
      context.lineTo(xs[i], ys[i]);
      context.closePath();
      context.stroke();
    }
  }
}

export default function(w, h, actions, store){
  return new Canvas(w, h, actions, store);
}
