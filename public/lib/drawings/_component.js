import drawingsStore from './store'
import drawingsView from './view'

export default function(){
  var store = drawingsStore();
  drawingsView(store);
}
