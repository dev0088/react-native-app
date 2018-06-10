import * as types from './actionTypes';

export function loginRequest(email, password) {
  return {
    type: types.LOGIN.REQUEST,
    email,
    password,
  }
}

export function loginSuccess(payload) {
  return {
    type: types.LOGIN.SUCCESS,
    ...payload
  }
}

export function loginFailure(err) {
  return {
    type: types.LOGIN.FAILURE,
    err,
  }
}

export function logout() {
  return {
    type: types.LOGOUT,
  }
}