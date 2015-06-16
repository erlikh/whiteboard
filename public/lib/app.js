import $ from 'jquery'
import io from 'socket.io-client'
import pubsub from 'pubsub-js'
import canvas from './canvas'
import drawings from './drawings'

var socket = io();
var canvasElem = $('#canvas');

class App {
  constructor(){
    this.events = {
      DRAWING_CREATED: 'DRAWING_CREATED',
      DRAWING_FETCHED: 'DRAWING_FETCHED'
    };

    this.actions = {
      paint: false,

      mouseDown: function(e){
        console.log(this);
        let mouseX = e.pageX - this.offsetLeft;
        let mouseY = e.pageY - this.offsetTop;

        this.paint = true;
        commit(mouseX, mouseY);
      },

      mouseUp: function(e){
        this.paint = false;
      },

      mouseLeave: function(e){
        this.paint = false;
      },

      mouseMove: function(e){
        if(this.paint){
          commit(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        }
      },

      drawingFetched: function(x, y, dragging){
        changeModel(x, y, dragging);
      }
    };

    this.view = canvas(500, 500, this.actions);
    this.store = drawings();

    socket.on('draw:fromServer', this.actions.drawingFetched);
  }
}

new App();
