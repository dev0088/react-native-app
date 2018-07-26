import React from 'react'
import { take, put, call, fork, select } from 'redux-saga/effects'
import * as types from '../actions/actionTypes'
import apiConfig from '../constants/api';
import { registerSuccess, registerFailure } from '../actions/registerActions'
import { loginRequestFromRegistration } from '../actions/loginFromRegistrationActions'
import { generateErrorMessage } from './utils'

function registerCall({
  emailAddress,
  password,
  passwordConfirm,
  firstName,
  lastName,
  phoneNumber,
  inviteCode,
  userName
}) {
  return new Promise((resolve, reject) => {
    let body
    body =
      `ApiKey=` +
      apiConfig.apiKey +
      `&InviteCode=` +
      inviteCode +
      `&Username=` +
      userName +
      `&EmailAddress=` +
      emailAddress +
      `&Password=` +
      password +
      `&PasswordConfirm=` +
      passwordConfirm +
      `&FirstName=` +
      firstName +
      `&LastName=` +
      lastName +
      `&PhoneNumber=` +
      phoneNumber +
      `&AllowNotifications=true` +
      `&AcceptedTerms=true` +
      `&School=` +
      'school_name' +
      `&Objective=` +
      'objective_name' +
      `&Chapter=` +
      'chapter_name'
    fetch(`${apiConfig.url}/api/Account/Register`, {
      credentials: 'include',
      method: 'post',
      headers: apiConfig.formHeaders,
      body: body
    })
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          reject({ status: response.error_description || response.error })
        } else {
          resolve(response)
        }
      })
      .catch(error => {
        reject({ status: 'invalid registration value.' })
      })
  })
}

function* watchRegisterRequest() {
  while (true) {
    const {
      emailAddress,
      password,
      passwordConfirm,
      firstName,
      lastName,
      phoneNumber,
      inviteCode,
      userName
    } = yield take(types.REGISTER.REQUEST)

    try {
      const payload = {
        emailAddress,
        password,
        passwordConfirm,
        firstName,
        lastName,
        phoneNumber,
        inviteCode,
        userName
      }
      const response = yield call(registerCall, payload)

      if (response.Success) {
        yield put(registerSuccess(response))
        // Try to auto-login
        yield put(loginRequestFromRegistration(userName, password))
      } else {
        yield put(registerFailure(generateErrorMessage(response)))
      }
    } catch (err) {
      console.log('SAGA REGISTER ERR: ', err)
      yield put(registerFailure(err.status))
    }
  }
}

export default function* root() {
  yield fork(watchRegisterRequest)
}
