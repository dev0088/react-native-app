import React from 'react';
import { take, put, call, fork, select } from 'redux-saga/effects'
import * as types from '../actions/actionTypes';
import apiConfig from '../constants/api';
import { loginSuccessFromRegistration, loginFailureFromRegistration } from '../actions/loginFromRegistrationActions'
import { userInit, userRequest } from '../actions/userActions'

function loginCallFromRegistration({userName, password}) {
  return new Promise((resolve, reject) => {
    fetch(`${apiConfig.url}/token`, {
      credentials: 'include',
      method: 'post',
      headers: apiConfig.formHeaders,
      body: `grant_type=password&username=${userName}&password=${password}`
    })
      .then(response => response.json())
      .then((userData) => {
        // console.log(userData)
        if(userData.error) {
          reject({status: userData.error_description || userData.error});
        }
        else {
          resolve(userData);
        }
      })
      .catch(error => {
        reject({status: 'wrong user name or password'});
      });
  })
}

function *watchLoginRequestFromRegistration() {
  while(true) {
		console.log('=== Auto logging in...')
    const { userName, password } = yield take(types.LOGIN_FROM_REGISTRATION.REQUEST);
    try {
      const payload = {
        userName,
        password,
      }
      const response = yield call(loginCallFromRegistration, payload);

      yield put(loginSuccessFromRegistration(response));
      yield put(userInit());
      yield put(userRequest(response.access_token, response.token_type))
    // console.log('SAGA AUTO LOGIN SUCCESS: ', response);
    } catch (err) {
      // console.log('SAGA AUTO LOGIN ERR: ', err);
      yield put(loginFailureFromRegistration({
        userName: userName,
        password: password,
        err: err.status
      }));
    }
  }
}


export default function* root() {
  yield fork(watchLoginRequestFromRegistration);
}
