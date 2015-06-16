import $ from 'jquery'
import io from 'socket.io-client'
import canvas from './canvas'

var socket = io();
var canv = canvas(500, 500);
var canvasElem = $('#canvas');
var paint;

canvasElem.mousedown(function(e){
  let mouseX = e.pageX - this.offsetLeft;
  let mouseY = e.pageY - this.offsetTop;

  paint = true;
  commit(mouseX, mouseY);
});

canvasElem.mousemove(function(e){
  if(paint){
    commit(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
  }
});

canvasElem.mouseup(function(e){
  paint = false;
});

canvasElem.mouseleave(function(e){
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
