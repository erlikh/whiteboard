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
