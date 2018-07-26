import React from 'react'
import { take, put, call, fork, select } from 'redux-saga/effects'
import * as types from '../actions/actionTypes'
import apiConfig from '../constants/api'
import {
  rumsCreateSuccess,
  rumsCreateFailure,
  rumsUpdateSuccess,
  rumsUpdateFailure,
  rumsDeleteSuccess,
  rumsDeleteFailure,
  rumsSortSuccess,
  rumsSortFailure
} from '../actions/rumsActions'
import { generateErrorMessage } from './utils'

function rumsCreateCall({access_token, token_type, value}) {
  return new Promise((resolve, reject) => {
		headers = apiConfig.formHeaders
		headers[apiConfig.authenticationHeaderName] = `${token_type} ${access_token}`
    fetch(`${apiConfig.url}/api/user/rums/create`, {
      credentials: 'include',
      method: 'post',
      headers: headers,
      body: value
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

function* watchRumsCreateRequest() {
  while (true) {
    const {
      access_token,
			token_type,
      value
    } = yield take(types.RUMS_CREATE.REQUEST)

    try {
      const payload = {
				access_token,
				token_type,
        value
      }
      const response = yield call(rumsCreateCall, payload)
      if (response.Success) {
        yield put(accountUserInfoSuccess(response))
      } else {
        let errorMsg = generateErrorMessage(response)
        yield put(accountUserInfoFailure(errorMsg))
      }
    } catch (err) {
      yield put(accountUserInfoFailure(err.status))
    }
  }
}

// RUMs update
function rumsUpdateCall(
  {
    access_token,
  	token_type,
    value
  }
) {
  return new Promise((resolve, reject) => {
		headers = apiConfig.formHeaders
		headers[apiConfig.authenticationHeaderName] = `${token_type} ${access_token}`
    fetch(`${apiConfig.url}/api/user/rums/update`, {
      credentials: 'include',
      method: 'post',
      headers: headers,
      value: value
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

function* watchRumsUpdateRequest() {
  while (true) {
    const {
      access_token,
    	token_type,
      value
    } = yield take(types.RUMS_UPDATE.REQUEST)

    try {
      const payload = {
        access_token,
      	token_type,
        value
      }
      const response = yield call(rumsUpdateCall, payload)

      if (response.Success) {
        yield put(rumsUpdateSuccess(response))
      } else {
        let errorMsg = generateErrorMessage(response)
        yield put(rumsUpdateFailure(errorMsg))
      }
    } catch (err) {
      yield put(rumsUpdateFailure(err.status))
    }
  }
}

// RUMs delete
function rumsDeleteCall(
  {
    access_token,
  	token_type,
    value
  }
) {
  return new Promise((resolve, reject) => {
		headers = apiConfig.formHeaders
		headers[apiConfig.authenticationHeaderName] = `${token_type} ${access_token}`
    fetch(`${apiConfig.url}/api/user/rums/delete`, {
      credentials: 'include',
      method: 'post',
      headers: headers,
      body: value
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

function* watchRumsDeleteRequest() {
  while (true) {
    const {
      access_token,
    	token_type,
      value
    } = yield take(types.RUMS_DELETE.REQUEST)

    try {
      const payload = {
        access_token,
      	token_type,
        value
      }
      const response = yield call(rumsDeleteCall, payload)

      if (response.Success) {
        yield put(rumsUpdateSuccess(response))
      } else {
        let errorMsg = generateErrorMessage(response)
        yield put(rumsDeleteFailure(errorMsg))
      }
    } catch (err) {
      yield put(rumsDeleteFailure(err.status))
    }
  }
}

// RUMs sort
function rumsSortCall(
  {
    access_token,
  	token_type,
    value
  }
) {
  return new Promise((resolve, reject) => {
		headers = apiConfig.formHeaders
		headers[apiConfig.authenticationHeaderName] = `${token_type} ${access_token}`
    fetch(`${apiConfig.url}/api/user/rums/sort`, {
      credentials: 'include',
      method: 'post',
      headers: headers,
      body: value
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

function* watchRumsSortRequest() {
  while (true) {
    const {
      access_token,
    	token_type,
      value
    } = yield take(types.RUMS_SORT.REQUEST)

    try {
      const payload = {
        access_token,
      	token_type,
        value
      }
      const response = yield call(rumsSortCall, payload)

      if (response.Success) {
        yield put(rumsSortSuccess(response))
      } else {
        let errorMsg = generateErrorMessage(response)
        yield put(rumsSortFailure(errorMsg))
      }
    } catch (err) {
      yield put(rumsSortFailure(err.status))
    }
  }
}

export default function* root() {
  yield fork(watchRumsCreateRequest)
  yield fork(watchRumsUpdateRequest)
  yield fork(watchRumsDeleteRequest)
  yield fork(watchRumsSortRequest)
}
