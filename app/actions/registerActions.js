import * as types from './actionTypes'
import { Actions } from 'react-native-router-flux'

export function registerRequest(
  emailAddress,
  password,
  passwordConfirm,
  firstName,
  lastName,
  phoneNumber,
  inviteCode,
  userName
) {
  return {
    type: types.REGISTER.REQUEST,
    emailAddress,
    password,
    passwordConfirm,
    firstName,
    lastName,
    phoneNumber,
    inviteCode,
    userName
  }
}

export function registerInit() {
  return {
    type: types.REGISTER.INIT
  }
}

export function registerSuccess(payload) {
  return {
    type: types.REGISTER.SUCCESS,
    ...payload
  }
}

export function registerFailure(err) {
  return {
    type: types.REGISTER.FAILURE,
    err
  }
}
