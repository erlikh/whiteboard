import $ from 'jquery'
import Canvas from './canvas'

let canv = new Canvas(500, 500);

var canvas = $('#canvas');
var paint;

canvas.mousedown(function(e){
  let mouseX = e.pageX - this.offsetLeft;
  let mouseY = e.pageY - this.offsetTop;

  paint = true;
  addClick(mouseX, mouseY);
});

canvas.mousemove(function(e){
  if(paint){
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
  }
});

canvas.mouseup(function(e){
  paint = false;
});

canvas.mouseleave(function(e){
  paint = false;
});

var xs = [], ys = [], drags = [];

function addClick(x, y, dragging){
  xs.push(x);
  ys.push(y);
  drags.push(dragging);
  canv.redraw(xs, ys, drags);
}
