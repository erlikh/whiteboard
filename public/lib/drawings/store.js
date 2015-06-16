import PubSub from 'pubsub-js'
import {events} from '../constants'
import io from 'socket.io-client'

var socket = io();

class DrawingsStore {
  constructor(){
    this.xs = [];
    this.ys = [];
    this.draggs = [];
    this.observers = [];
    PubSub.subscribe(events.DRAWING_CREATED, this.commit.bind(this));
    PubSub.subscribe(events.DRAWING_FETCHED, this.update.bind(this));
  }

  update(_, data){
    this.xs.push(data.x);
    this.ys.push(data.y);
    this.draggs.push(data.dragging);
    this.notifyObservers();
  }

  commit(_, data){
    this.update(null, data);
    socket.emit('draw:committed', data.x, data.y, data.dragging, socket.id);
  }

  registerObserver(cb){
    this.observers.push(cb)
  }

  notifyObservers(){
    this.observers.forEach((cb) => cb())
  }
}

export default function(){ return new DrawingsStore() }
