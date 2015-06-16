import PubSub from 'pubsub-js'
import {events} from '../constants'

export default {
  drawingFetched: function(x, y, dragging){
    PubSub.publish(events.DRAWING_FETCHED, {x: x, y: y, dragging: dragging});
  }
};
