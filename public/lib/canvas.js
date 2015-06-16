class Canvas {
  constructor(width, height){
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
  }

  clear(){
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  }

  setDefaultDrawingStyle(){
    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 5;
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

export default Canvas
