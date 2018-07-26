import React from 'react'
import { take, put, call, fork, select } from 'redux-saga/effects'
import * as types from '../actions/actionTypes'
import apiConfig from '../constants/api'
import {
  accountUserInfoSuccess,
  accountUserInfoFailure,
  accountManageInfoSuccess,
  accountManageInfoFailure,
  // accountChangePasswordSuccess,
  // accountChangePasswordFailure,
} from '../actions/accountActions'
import { generateErrorMessage } from './utils'

function accountUserInfoCall({access_token, token_type}) {
  return new Promise((resolve, reject) => {
		headers = apiConfig.formHeaders
		headers[apiConfig.authenticationHeaderName] = `${token_type} ${access_token}`
    fetch(`${apiConfig.url}/api/Account/UserInfo`, {
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

function* watchAccountUserInfoRequest() {
  while (true) {
    const {
      access_token,
			token_type
    } = yield take(types.ACCOUNT_USERINFO.REQUEST)

    try {
      const payload = {
				access_token,
				token_type
      }
      const response = yield call(accountUserInfoCall, payload)
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

// Account ManageInfo
function accountManageInfoCall(
  {
    returnUrl,
    generateState,
  	access_token,
  	token_type
  }
) {
  return new Promise((resolve, reject) => {
		headers = apiConfig.formHeaders
		headers[apiConfig.authenticationHeaderName] = `${token_type} ${access_token}`
    fetch(`${apiConfig.url}/api/Account/ManageInfo?returnUrl=${returnUrl}&generateState=${generateState}`, {
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

function* watchAccountManageInfoRequest() {
  while (true) {
    const {
      returnUrl,
      generateState,
    	access_token,
    	token_type
    } = yield take(types.ACCOUNT_MANAGEINFO.REQUEST)

    try {
      const payload = {
        returnUrl,
        generateState,
      	access_token,
      	token_type
      }
      const response = yield call(accountManageInfoCall, payload)

      if (response.Success) {
        yield put(accountManageInfoSuccess(response))
      } else {
        let errorMsg = generateErrorMessage(response)
        yield put(accountManageInfoFailure(errorMsg))
      }
    } catch (err) {
      yield put(accountManageInfoFailure(err.status))
    }
  }
}

export default function* root() {
  yield fork(watchAccountUserInfoRequest)
  yield fork(watchAccountManageInfoRequest)
}
