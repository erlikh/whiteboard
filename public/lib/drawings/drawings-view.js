import canvas from './drawings-canvas'
import actions from './drawings-actions'

export default store => canvas(500, 500, actions, store)
