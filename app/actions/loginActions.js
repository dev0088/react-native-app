import * as types from './actionTypes'
import { Actions } from 'react-native-router-flux'
import * as userActions from './userActions'

export function loginRequest(userName, password) {
  return {
    type: types.LOGIN.REQUEST,
    userName,
    password
  }
}

export function loginInit() {
  return {
    type: types.LOGIN.INIT
  }
}

export function loginSuccess(payload) {
	Actions.push('home')
	// Actions.push('welcome')

  return {
    type: types.LOGIN.SUCCESS,
    ...payload
  }
}

export function loginFailure(err) {
  return {
    type: types.LOGIN.FAILURE,
    err
  }
}


export function logoutRequest(payload) {
	loginInit()
  Actions.push('login')
  return {
    type: types.LOGOUT.REQUEST
  }
}

export function logoutSuccess(payload) {
	loginInit()
  Actions.push('login')
  return {
    type: types.LOGOUT.SUCCESS
  }
}

export function logoutFailure(payload) {
	loginInit()
  Actions.push('login')
  return {
    type: types.LOGOUT.FAILURE
  }
}
