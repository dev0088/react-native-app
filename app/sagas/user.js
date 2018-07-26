import React from 'react'
import { take, put, call, fork, select } from 'redux-saga/effects'
import * as types from '../actions/actionTypes'
import apiConfig from '../constants/api'
import {
  userRequest, userSuccess, userFailure,
  userUpdateSuccess, userUpdateFailure
} from '../actions/userActions'
import { generateErrorMessage } from './utils'

function userCall({access_token, token_type}) {
  return new Promise((resolve, reject) => {
		headers = apiConfig.formHeaders
		headers[apiConfig.authenticationHeaderName] = `${token_type} ${access_token}`
    fetch(`${apiConfig.url}/api/user`, {
      credentials: 'include',
      method: 'get',
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

function* watchUserRequest() {
  while (true) {
    const {
      access_token,
			token_type
    } = yield take(types.USER.REQUEST)

    try {
      const payload = {
				access_token,
				token_type
      }
      const response = yield call(userCall, payload)

      if (response.Success) {
        console.log('SAGA USER SUCCESS: ', response)
        yield put(userSuccess(response))
      } else {
        let errorMsg = generateErrorMessage(response)
        yield put(userFailure(errorMsg))
      }
    } catch (err) {
      console.log('SAGA USER ERR: ', err)
      yield put(userFailure(err.status))
    }
  }
}

function userUpdateCall({access_token, token_type, person}) {
  return new Promise((resolve, reject) => {
    headers = apiConfig.jsonHeaders
		headers[apiConfig.authenticationHeaderName] = `${token_type} ${access_token}`
    fetch(`${apiConfig.url}/api/user/update`, {
      credentials: 'include',
      method: 'post',
      headers: headers,
      body: JSON.stringify(person)
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

function* watchUserUpdateRequest() {
  while (true) {
    const {
      access_token,
			token_type,
      person
    } = yield take(types.USER_UPDATE.REQUEST)

    try {
      const payload = {
				access_token,
				token_type,
        person
      }
      const response = yield call(userUpdateCall, payload)

      if (response.Success) {
        yield put(userRequest(access_token, token_type))
        yield put(userUpdateSuccess(response))
      } else {
        let errorMsg = generateErrorMessage(response)
        yield put(userUpdateFailure(errorMsg))
      }
    } catch (err) {
      console.log('SAGA USER UPDATE ERR: ', err)
      yield put(userUpdateFailure(err.status))
    }
  }
}

export default function* root() {
  yield fork(watchUserRequest)
  yield fork(watchUserUpdateRequest)
}
