import PubSub from 'pubsub-js'
import {events} from '../constants'

export default {
  paint: false,

  mouseDown: function(e){
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;

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
  }
};
