import * as types from './actionTypes';

export function registerRequest(emailAddress, password, 
    passwordConfirm, firstName, lastName, phoneNumber, inviteCode,
    userName, school, objective, chapter) {
  return {
    type: types.REGISTER.REQUEST,
		emailAddress,
    password,
    passwordConfirm,
    firstName,
    lastName,
    phoneNumber,
    inviteCode,
    userName,
    school,
    objective,
    chapter
  }
}

export function registerInit() {
  return {
    type: types.REGISTER.INIT,
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
    err,
  }
}
