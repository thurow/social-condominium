import { combineReducers } from 'redux';
import loginReducer from './auth/loginAuth'

export const Reducers = combineReducers({
  loginState: loginReducer
});