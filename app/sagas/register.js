import React from 'react';
import { take, put, call, fork, select } from 'redux-saga/effects'
import * as types from '../actions/actionTypes';
import config from '../config';
import { registerSuccess, registerFailure } from '../actions/registerActions'

function registerCall({
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
      }) {
  return new Promise((resolve, reject) => {
    let body;
    body = `ApiKey=`         + config.apiKey + 
      `&InviteCode=`         + inviteCode + 
      `&Username=`           + userName + 
      `&EmailAddress=`       + emailAddress + 
      `&Password=`           + password + 
      `&PasswordConfirm=`    + passwordConfirm + 
      `&FirstName=`          + firstName + 
      `&LastName=`           + lastName +
      `&PhoneNumber=`        + phoneNumber + 
      `&AllowNotifications=true`   + 
      `&AcceptedTerms=true`  + 
      `&School=`             + school + 
      `&Objective=`          + objective + 
      `&Chapter=`            + chapter;
    fetch(`${config.url}/api/Account/Register`, {
      credentials: 'include',
      method: 'post',
      headers: config.formHeaders,
      body: body
    })
      .then(response => response.json())
      .then((response) => {
        if(response.error) {
          reject({status: response.error_description || response.error});
        }
        else {
          resolve(response);
        }
      })
      .catch(error => {
        reject({status: 'invalid registration value.'});
      });
  })
}

function *watchRegisterRequest() {
  while(true) {
    const {
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
		} = yield take(types.REGISTER.REQUEST);

    try {
      const payload = {
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
      const response = yield call(registerCall, payload);

      if (response.Success)
        yield put(registerSuccess(response));
      else
        yield put(registerFailure(response.ValidationErrors[0]));  
      console.log('SAGA REGISTER SUCCESS: ', response);
    } catch (err) {
      console.log('SAGA REGISTER ERR: ', err);
      yield put(registerFailure(err.status));
    }
  }
}


export default function* root() {
  yield fork(watchRegisterRequest);
}
