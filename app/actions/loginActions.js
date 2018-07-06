import * as types from './actionTypes'
import { Actions } from 'react-native-router-flux'

export function loginRequest(email, password) {
  return {
    type: types.LOGIN.REQUEST,
    email,
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

export function logout() {
  Actions.push('login')
  return {
    type: types.LOGOUT
  }
}
