import { combineReducers } from 'redux';
import counter from './counter';
import user from './user';
import register from './register';
import entities from './entities'

export default combineReducers({
  counter,
  user,
	register,
  //entities,
});
