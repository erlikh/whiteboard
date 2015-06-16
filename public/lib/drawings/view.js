import canvas from './canvas'
import actions from './actions'
import {canvasSize} from '../constants'

export default store => canvas(canvasSize.w, canvasSize.h, actions, store)
