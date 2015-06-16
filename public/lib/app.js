import $ from 'jquery'
import Canvas from './canvas'
import io from 'socket.io-client'

var socket = io();

let canv = new Canvas(500, 500);

var canvas = $('#canvas');
var paint;

canvas.mousedown(function(e){
  let mouseX = e.pageX - this.offsetLeft;
  let mouseY = e.pageY - this.offsetTop;

  paint = true;
  commit(mouseX, mouseY);
});

canvas.mousemove(function(e){
  if(paint){
    commit(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
  }
});

canvas.mouseup(function(e){
  paint = false;
});

canvas.mouseleave(function(e){
  paint = false;
});

var xs = [], ys = [], drags = [];

function changeModel(x, y, dragging){
  xs.push(x);
  ys.push(y);
  drags.push(dragging);
  canv.redraw(xs, ys, drags);
}

function commit(x, y, dragging){
  changeModel(x, y, dragging);
  socket.emit('draw:committed', x, y, dragging, socket.id);
}

socket.on('draw:fromServer', function(x, y, dragging){
  changeModel(x, y, dragging);
});
