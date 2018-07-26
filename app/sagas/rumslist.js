import React from 'react'
import { take, put, call, fork, select } from 'redux-saga/effects'
import * as types from '../actions/actionTypes'
import apiConfig from '../constants/api'
import { rumslistSuccess, rumslistFailure } from '../actions/rumslistActions'

function rumslistCall({access_token, token_type}) {
  return new Promise((resolve, reject) => {
		headers = apiConfig.formHeaders
		headers[apiConfig.authenticationHeaderName] = `${token_type} ${access_token}`
    fetch(`${apiConfig.url}/api/user/rums/list`, {
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

function* watchRumslistRequest() {
  while (true) {
    const {
      access_token,
			token_type
    } = yield take(types.RUMSLIST.REQUEST)

    try {
      const payload = {
				access_token,
				token_type
      }
      const response = yield call(rumslistCall, payload)

      if (response.Success) {
        console.log('SAGA RUMSLIST SUCCESS: ', response)
        yield put(rumslistSuccess(response))
      } else {
        let errorMsg =
          response.ValidationErrors == null ||
          response.ValidationErrors == undefined
            ? 'Unexpected error!'
            : response.ValidationErrors[0]
        console.log('SAGA RUMSLIST UNEXPECTED ERR: ', response)
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
        yield put(rumslistFailure(errorMsg))
      }
    } catch (err) {
      console.log('SAGA RUMSLIST ERR: ', err)
      yield put(rumslistFailure(err.status))
    }
  }
}

export default function* root() {
  yield fork(watchRumslistRequest)
}
