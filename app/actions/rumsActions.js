import * as types from './actionTypes'
import { Actions } from 'react-native-router-flux'

export function rumsCreateRequest(access_token, token_type, value) {
  return {
    type: types.RUMS_CREATE.REQUEST,
		access_token,
		token_type,
    value
  }
}

export function rumsCreateInit() {
  return {
    type: types.RUMS_CREATE.INIT
  }
}

export function rumsCreateSuccess(payload) {
  return {
    type: types.RUMS_CREATE.SUCCESS,
    ...payload
  }
}

export function rumsCreateFailure(err) {
  return {
    type: types.RUMS_CREATE.FAILURE,
    err
  }
}

export function rumsUpdateRequest(access_token, token_type, value) {
  return {
    type: types.RUMS_UPDATE.REQUEST,
		access_token,
		token_type,
    value
  }
}

export function rumsUpdateInit() {
  return {
    type: types.RUMS_UPDATE.INIT
  }
}

export function rumsUpdateSuccess(payload) {
  return {
    type: types.RUMS_UPDATE.SUCCESS,
    ...payload
  }
}

export function rumsUpdateFailure(err) {
  return {
    type: types.RUMS_UPDATE.FAILURE,
    err
  }
}

export function rumsDeleteRequest(access_token, token_type, value) {
  return {
    type: types.RUMS_DELETE.REQUEST,
		access_token,
		token_type,
    value
  }
}

export function rumsDeleteInit() {
  return {
    type: types.RUMS_DELETE.INIT
  }
}

export function rumsDeleteSuccess(payload) {
  return {
    type: types.RUMS_DELETE.SUCCESS,
    ...payload
  }
}

export function rumsDeleteFailure(err) {
  return {
    type: types.RUMS_DELETE.FAILURE,
    err
  }
}

export function rumsSortRequest(access_token, token_type, value) {
  return {
    type: types.RUMS_SORT.REQUEST,
		access_token,
		token_type,
    value
  }
}

export function rumsSortInit() {
  return {
    type: types.RUMS_SORT.INIT
  }
}

export function rumsSortSuccess(payload) {
  return {
    type: types.RUMS_SORT.SUCCESS,
    ...payload
  }
}

export function rumsSortFailure(err) {
  return {
    type: types.RUMS_SORT.FAILURE,
    err
  }
}
