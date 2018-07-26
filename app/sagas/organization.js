import React from 'react'
import { take, put, call, fork, select } from 'redux-saga/effects'
import * as types from '../actions/actionTypes'
import apiConfig from '../constants/api';
import { organizationSuccess, organizationFailure } from '../actions/organizationActions'
import { generateErrorMessage } from './utils'

function organizationCall() {
  return new Promise((resolve, reject) => {
    fetch(`${apiConfig.url}/api/Organization?apiKey=${apiConfig.apiKey}`, {
      credentials: 'include',
      method: 'get',
      headers: apiConfig.formHeaders,
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

function* watchOrganizationRequest() {
  while (true) {
    // const {
    //   Name,
    //   AppButtons,
    //   LogoFilename,
    //   RssFeedUrl,
    //   TagLine,
    //   DeveloperJson
    // } =
    yield take(types.ORGANIZATION.REQUEST)

    try {
      // const payload = {
			// 	Name,
			// 	AppButtons,
			// 	LogoFilename,
			// 	RssFeedUrl,
			// 	TagLine,
			// 	DeveloperJson
      // }
      const response = yield call(organizationCall)

      if (response.DeveloperJson) {
        yield put(organizationSuccess(response))
      } else {
        yield put(organizationFailure(generateErrorMessage(response)))
      }
    } catch (err) {
      console.log('SAGA ORGANIZATION ERR: ', err)
      yield put(organizationFailure(err.status))
    }
  }
}

export default function* root() {
  yield fork(watchOrganizationRequest)
}
