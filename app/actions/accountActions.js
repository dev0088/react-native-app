import * as types from './actionTypes'
import { Actions } from 'react-native-router-flux'


// user info
export function accountUserInfoRequest(access_token, token_type) {
  return {
    type: types.ACCOUNT_USERINFO.REQUEST,
    access_token,
    token_type
  }
}

export function accountUserInfoInit() {
  return {
    type: types.ACCOUNT_USERINFO.INIT
  }
}

export function accountUserInfoSuccess(payload) {
  return {
    type: types.ACCOUNT_USERINFO.SUCCESS,
    ...payload
  }
}

export function accountUserInfoFailure(err) {
  return {
    type: types.ACCOUNT_USERINFO.FAILURE,
    err
  }
}

// manage info
export function accountManageInfoRequest(
  returnUrl,
  generateState,
  access_token,
  token_type
) {
  return {
    type: types.ACCOUNT_MANAGEINFO.REQUEST,
    returnUrl,
    generateState,
		access_token,
		token_type
  }
}

export function accountManageInfoInit() {
  return {
    type: types.ACCOUNT_MANAGEINFO.INIT
  }
}

export function accountManageInfoSuccess(payload) {
  return {
    type: types.ACCOUNT_MANAGEINFO.SUCCESS,
    ...payload
  }
}

export function accountManageInfoFailure(err) {
  return {
    type: types.ACCOUNT_MANAGEINFO.FAILURE,
    err
  }
}

// change password
export function changePasswordRequest(
  oldPassword,
  newPassword,
  ConfirmPassword,
  access_token,
  token_type
) {
  return {
    type: types.ACCOUNT_CHANGEPASSWORD.REQUEST,
		access_token,
		token_type
  }
}

export function changePasswordInit() {
  return {
    type: types.ACCOUNT_CHANGEPASSWORD.INIT
  }
}

export function changePasswordSuccess(payload) {
  return {
    type: types.ACCOUNT_CHANGEPASSWORD.SUCCESS,
    ...payload
  }
}

export function changePasswordFailure(err) {
  return {
    type: types.ACCOUNT_CHANGEPASSWORD.FAILURE,
    err
  }
}
