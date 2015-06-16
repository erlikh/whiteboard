class Canvas {
  constructor(width, height, actions, store){
    var canvasDiv = document.getElementById('canvasDiv');
    var canvas = document.createElement('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    canvas.setAttribute('id', 'canvas');
    canvasDiv.appendChild(canvas);

    if (typeof G_vmlCanvasManager !== 'undefined') {
      canvas = G_vmlCanvasManager.initElement(canvas);
    }

    this.context = canvas.getContext("2d");

    //TODO: remove jQuery
    var $canvas = $(canvas);
    $canvas.on('mousedown', actions.mouseDown);
    $canvas.on('mousemove', actions.mouseMove);
    $canvas.on('mouseup', actions.mouseUp);
    $canvas.on('mouseleave', actions.mouseLeave);

    this.store = store;
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
