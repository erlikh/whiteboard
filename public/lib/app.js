import io from 'socket.io-client'
import PubSub from 'pubsub-js'
import drawingsStore from './drawings/drawings-store'
import drawingsView from './drawings/drawings-view'
import {events} from './constants'


var store = drawingsStore();
var view = drawingsView(store);

var socket = io();
var socketActions = {
  drawingFetched: function(x, y, dragging){
    PubSub.publish(events.DRAWING_FETCHED, {x: x, y: y, dragging: dragging});
  }
};

socket.on('draw:fromServer', socketActions.drawingFetched);
