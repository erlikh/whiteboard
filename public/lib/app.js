import $ from 'jquery'
import { create, redraw } from './canvas'

var context = create(500, 500);
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
  redraw(xs, ys, drags, context);
}
