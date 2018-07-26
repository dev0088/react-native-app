import * as types from './actionTypes'
import { Actions } from 'react-native-router-flux'

export function rumslistRequest(access_token, token_type) {
  return {
    type: types.RUMSLIST.REQUEST,
		access_token,
		token_type
  }
}

export function rumslistInit() {
  return {
    type: types.RUMSLIST.INIT
  }
}

export function rumslistSuccess(payload) {
  return {
    type: types.RUMSLIST.SUCCESS,
    ...payload
  }
}

export function rumslistFailure(err) {
  return {
    type: types.RUMSLIST.FAILURE,
    err
  }
}
