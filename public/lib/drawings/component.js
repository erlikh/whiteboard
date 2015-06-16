import drawingsStore from './drawings-store'
import drawingsView from './drawings-view'

export default function(){
  var store = drawingsStore();
  drawingsView(store);
}
