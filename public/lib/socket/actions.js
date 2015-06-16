import PubSub from 'pubsub-js'
import {events} from '../constants'

export default {
  drawingFetched: function(data){
    PubSub.publish(events.DRAWING_FETCHED, data);
  }
};
