export function create(canvasWidth, canvasHeight){
  let canvasDiv = document.getElementById('canvasDiv');
  let canvas = document.createElement('canvas');
  canvas.setAttribute('width', canvasWidth);
  canvas.setAttribute('height', canvasHeight);
  canvas.setAttribute('id', 'canvas');
  canvasDiv.appendChild(canvas);
  if(typeof G_vmlCanvasManager !== 'undefined') {
    canvas = G_vmlCanvasManager.initElement(canvas);
  }
  let context = canvas.getContext("2d");
  return context;
}

export function redraw(xs, ys, drags, context){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  context.strokeStyle = "#df4b26";
  context.lineJoin = "round";
  context.lineWidth = 5;

  for(var i=0; i < xs.length; i++) {
    context.beginPath();
    if(drags[i] && i){
      context.moveTo(xs[i-1], ys[i-1]);
    }else{
      context.moveTo(xs[i]-1, ys[i]);
    }
    context.lineTo(xs[i], ys[i]);
    context.closePath();
    context.stroke();
  }
}
