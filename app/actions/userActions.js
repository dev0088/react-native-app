import * as types from './actionTypes'
import { Actions } from 'react-native-router-flux'

export function userRequest(access_token, token_type) {
  return {
    type: types.USER.REQUEST,
		access_token,
		token_type
  }
}

export function userInit() {
  return {
    type: types.USER.INIT
  }
}

export function userSuccess(payload) {
  return {
    type: types.USER.SUCCESS,
    ...payload
  }
}

export function userFailure(err) {
  return {
    type: types.USER.FAILURE,
    err
  }
}

// update user
export function userUpdateRequest(access_token, token_type, person) {
  return {
    type: types.USER_UPDATE.REQUEST,
		access_token,
		token_type,
    person
  }
}

export function userUpdateInit() {
  return {
    type: types.USER_UPDATE.INIT
  }
}

export function userUpdateSuccess(payload) {
  return {
    type: types.USER_UPDATE.SUCCESS,
    ...payload
  }
}

export function userUpdateFailure(err) {
  return {
    type: types.USER_UPDATE.FAILURE,
    err
  }
}
