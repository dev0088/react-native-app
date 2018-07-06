import React from 'react'
import { take, put, call, fork, select } from 'redux-saga/effects'
import * as types from '../actions/actionTypes'
import config from '../config'
import { registerSuccess, registerFailure } from '../actions/registerActions'

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
      config.apiKey +
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
    fetch(`${config.url}/api/Account/Register`, {
      credentials: 'include',
      method: 'post',
      headers: config.formHeaders,
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
        console.log('SAGA REGISTER SUCCESS: ', response)
        yield put(registerSuccess(response))
      } else {
        let errorMsg =
          response.ValidationErrors == null ||
          response.ValidationErrors == undefined
            ? 'Unexpected error!'
            : response.ValidationErrors[0]
        console.log('SAGA REGISTER UNEXPECTED ERR: ', response)
        if (
          response.ValidationErrors != null &&
          response.ValidationErrors != undefined
        )
          errorMsg = response.ValidationErrors[0]
        else if (
          response.ModelState != null &&
          response.ModelState != undefined
        ) {
          Object.keys(response.ModelState).forEach(function(key) {
            errorMsg = response.ModelState[key][0]
            return
          })
        }
        yield put(registerFailure(errorMsg))
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
