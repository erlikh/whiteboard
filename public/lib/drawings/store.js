import PubSub from 'pubsub-js'
import {events} from '../constants'
import io from 'socket.io-client'

var socket = io();

class DrawingsStore {
  constructor(){
    this.diffs = [];
    this.observers = [];

    PubSub.subscribe(events.DRAWING_CREATED, this.commit.bind(this));
    PubSub.subscribe(events.DRAWING_FETCHED, this.update.bind(this));
  }

  get data() {
    return this.diffs
  }

  update(_, data){
    this.diffs.push(data);
    this.notifyObservers();
  }

  commit(_, data){
    this.update(null, data);
    socket.emit('draw:committed', data);
  }

  registerObserver(cb){
    this.observers.push(cb)
  }

  notifyObservers(){
    this.observers.forEach((cb) => cb())
  }
}

export default function(){ return new DrawingsStore() }
