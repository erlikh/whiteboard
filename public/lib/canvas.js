class Canvas {
  constructor(width, height, actions){
    let canvasDiv = document.getElementById('canvasDiv');
    let canvas = document.createElement('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    canvas.setAttribute('id', 'canvas');
    canvasDiv.appendChild(canvas);

    if (typeof G_vmlCanvasManager !== 'undefined') {
      canvas = G_vmlCanvasManager.initElement(canvas);
    }

    this.context = canvas.getContext("2d");
    console.log(actions);

    //TODO: remove jQuery
    let $canvas = $(canvas);
    $canvas.on('mousedown', actions.mouseDown);
    $canvas.on('mousemove', actions.mouseMove);
    $canvas.on('mouseup', actions.mouseUp);
    $canvas.on('mouseleave', actions.mouseLeave);
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
    let context = this.context;
    this.clear();
    this.setDefaultDrawingStyle();

    for (var i = 0; i < xs.length; i++) {
      context.beginPath();
      if (drags[i] && i) {
        context.moveTo(xs[i - 1], ys[i - 1]);
      } else {
        context.moveTo(xs[i] - 1, ys[i]);
      }
      context.lineTo(xs[i], ys[i]);
      context.closePath();
      context.stroke();
    }
  }
}

export default function(w, h, actions){
  return new Canvas(w, h, actions);
}
