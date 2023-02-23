import { combineReducers } from 'redux'
import chats from './chats'
import contacts from './contact'
import notification from './notification'
export default combineReducers({
  chats,
  contacts,
  notification
})