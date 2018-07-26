import React from 'react';
import { take, put, call, fork, select } from 'redux-saga/effects'
import * as types from '../actions/actionTypes';
import apiConfig from '../constants/api';
import { loginSuccess, loginFailure, logoutSuccess, logoutFailure } from '../actions/loginActions'
import { userInit, userRequest } from '../actions/userActions'

function loginCall({userName, password}) {
  return new Promise((resolve, reject) => {
    fetch(`${apiConfig.url}/token`, {
      credentials: 'include',
      method: 'post',
      headers: apiConfig.formHeaders,
      body: `grant_type=password&username=${userName}&password=${password}`
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
        reject({status: 'wrong email or password'});
      });
  })
}

function logoutCall({access_toke, token_type}) {
  return new Promise((resolve, reject) => {
		headers = apiConfig.formHeaders
		headers[apiConfig.authenticationHeaderName] = `${token_type} ${access_token}`
    fetch(`${apiConfig.url}/api/Account/Logout`, {
      credentials: 'include',
      method: 'post',
      headers: headers,
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
        reject({ status: error.message })
      })
  })
}

function *watchLoginRequest() {
  while(true) {
    const { userName, password } = yield take(types.LOGIN.REQUEST);
    try {
      const payload = {
				userName,
				password
      }
      const response = yield call(loginCall, payload);

      yield put(loginSuccess(response));
      // console.log('SAGA LOGIN SUCCESS: ', response);
      yield put(userInit());
      yield put(userRequest(response.access_token, response.token_type))
    } catch (err) {
      // console.log('SAGA LOGIN ERR: ', err);
      yield put(loginFailure(err.status));
    }
  }
}


function *watchLogoutRequest() {
  while(true) {
    const { access_toke, token_type } = yield take(types.LOGOUT.REQUEST);
    try {
      const payload = {
        userName,
        password,
      }
      const response = yield call(logoutCall, payload);
      yield put(logoutSuccess(response));
    } catch (err) {
      yield put(logoutFailure(err.status));
    }
  }
}


export default function* root() {
  yield fork(watchLoginRequest);
	yield fork(watchLogoutRequest);
}
