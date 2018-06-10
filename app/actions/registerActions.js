import * as types from './actionTypes';

export function registerRequest(email, password) {
  return {
    type: types.REGISTER.REQUEST,
		inviteCode,
		userName,
		emailAddress,
		password,
		passwordConfirm,
		firstName,
		lastName,
		phoneNumber,
		allowNotifications,
		acceptedTerms,
		school,
		club,
		city,
		careerLocation,
		objective,
		chapter
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
