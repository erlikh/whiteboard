import io from 'socket.io-client'
import actions from './actions'

export default function(){
  var socket = io();
  socket.on('draw:fromServer', actions.drawingFetched);
}
