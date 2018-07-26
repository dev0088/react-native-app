import * as types from './actionTypes'
import { Actions } from 'react-native-router-flux'

export function loginRequestFromRegistration(userName, password) {
  return {
    type: types.LOGIN_FROM_REGISTRATION.REQUEST,
    userName,
    password
  }
}

export function loginInitFromRegistration() {
  return {
    type: types.LOGIN_FROM_REGISTRATION.INIT
  }
}

export function loginSuccessFromRegistration(payload) {
  Actions.push('welcome')
  return {
    type: types.LOGIN_FROM_REGISTRATION.SUCCESS,
    ...payload
  }
}

export function loginFailureFromRegistration(payload) {
	Actions.push('login')
  return {
    type: types.LOGIN_FROM_REGISTRATION.FAILURE,
    userName: payload.userName,
    password: payload.password,
    err: payload.err
  }
}
