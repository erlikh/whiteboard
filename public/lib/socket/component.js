import io from 'socket.io-client'
import PubSub from 'pubsub-js'
import {events} from '../constants'

var socketActions = {
  drawingFetched: function(x, y, dragging){
    PubSub.publish(events.DRAWING_FETCHED, {x: x, y: y, dragging: dragging});
  }
};

export default function(){
  var socket = io();
  socket.on('draw:fromServer', socketActions.drawingFetched);
}
