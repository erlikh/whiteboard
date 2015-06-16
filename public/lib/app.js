import $ from 'jquery'
import io from 'socket.io-client'
import PubSub from 'pubsub-js'
import canvas from './canvas'
import drawings from './drawings-store'
import {events} from './constants'

var socket = io();
var canvasElem = $('#canvas');

var actions = {
  paint: false,

  mouseDown: function(e){
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;

    this.paint = true;
    PubSub.publish(events.DRAWING_CREATED, {x: mouseX, y: mouseY});
  },

  mouseUp: function(e){
    this.paint = false;
  },

  mouseLeave: function(e){
    this.paint = false;
  },

  mouseMove: function(e){
    if(this.paint){
      PubSub.publish(events.DRAWING_CREATED, {x:e.pageX - this.offsetLeft, y: e.pageY - this.offsetTop, dragging: true});
    }
  },

  drawingFetched: function(x, y, dragging){
    PubSub.publish(events.DRAWING_FETCHED, {x: x, y: y, dragging: dragging});
  }
};

var store = drawings();
var view = canvas(500, 500, actions, store);

socket.on('draw:fromServer', actions.drawingFetched);
