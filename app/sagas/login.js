import React from 'react';
import { take, put, call, fork, select } from 'redux-saga/effects'
import * as types from '../actions/actionTypes';
import config from '../config';
import { loginSuccess, loginFailure } from '../actions/loginActions'

function loginCall({email, password}) {
  return new Promise((resolve, reject) => {
    fetch(`${config.url}/token`, {
      credentials: 'include',
      method: 'post',
      headers: config.formHeaders,
      body: `grant_type=password&username=${email}&password=${password}`
    })
      .then(response => response.json())
      .then((userData) => {
        console.log(userData)
        if(userData.error) {
          reject({status: userData.error_description || userData.error});
        }
        else {
          resolve(userData);
        }
      })
      .catch(error => {
        reject({status: 'wrong email or password'});
      });
  })
}

function *watchLoginRequest() {
  while(true) {
    const { email, password } = yield take(types.LOGIN.REQUEST);

    try {
      const payload = {
        email,
        password,
      }
      const response = yield call(loginCall, payload);

      yield put(loginSuccess(response));
      console.log('SAGA LOGIN SUCCESS: ', response);
    } catch (err) {
      console.log('SAGA LOGIN ERR: ', err);
      yield put(loginFailure(err.status));
    }
  }
}


export default function* root() {
  yield fork(watchLoginRequest);
}
