class DrawingsStore {
  constructor(){
    this.xs = [];
    this.ys = [];
    this.draggs = [];
  }

  update(x,y,dragging){
    xs.push(x);
    ys.push(y);
    drags.push(dragging);
    canv.redraw(xs, ys, drags)
  }

  commit(x, y, dragging){
    changeModel(x, y, dragging);
    socket.emit('draw:committed', x, y, dragging, socket.id);
  }
}

export default function(){ return new DrawingsStore() }
