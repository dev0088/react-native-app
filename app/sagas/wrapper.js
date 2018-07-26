import React from 'react'
import { take, put, call, fork, select } from 'redux-saga/effects'
import * as types from '../actions/actionTypes'
import apiConfig from '../constants/api'
import { rumslistSuccess, rumslistFailure } from '../actions/rumslistActions'
import { generateErrorMessage } from './utils'

function wrapperRequest(method = 'get', subUrl, params = null, headers = null, body = null) {
  return new Promise((resolve, reject) => {
		headers = apiConfig.formHeaders

    let strParams = ''
    if (params) {
      Object.keys(params).map(function(key, index) {
         strParams = strParams + '&' + key + '=' + params[key]
      });
      if (strParams !== '') {
        strParams = '?' + strParams
      }
    }

    let mergedHeaders = Object.assign(apiConfig.formHeaders, headers)

    let fetchData = {
      credentials: 'include',
      method: method,
      header: mergedHeaders
    }
    if (body) {
      fetchData['body'] = body
    }

    fetch(`${apiConfig.url}/api${subUrl}${strParams}`, fetchData)
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

function* watchWrapperRequest(
  {
    actionName,
    method,
    subUrl,
    params,
    headers,
    body,
    successCallback,
    failureCallback
  }
) {
  while (true) {
    const {
      actionName,
      method,
      subUrl,
      params,
      headers,
      body
    } = yield take(types[actionName].REQUEST, successCallback, failureCallback)

    try {
      const payload = {
        actionName,
        method,
        subUrl,
        params,
        headers,
        body
      }
      const response = yield call(wrapperRequest, payload)

      if (response.Success) {
        console.log('SAGA ' + actionName + ' SUCCESS: ', response)
        yield put(successCallback(response))
      } else {
        let errorMsg = generateErrorMessage(response)
        yield put(failureCallback(errorMsg))
      }
    } catch (err) {
      console.log('SAGA ' + actionName + ' ERR: ', err)
      yield put(failureCallback(err.status))
    }
  }
}

export function* wrapperSaga({actionName}) {
  yield fork(watchWrapperRequest, {actionName})
}
