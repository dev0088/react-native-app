import * as types from './actionTypes'
import { Actions } from 'react-native-router-flux'

export function organizationRequest() {
  return {
    type: types.ORGANIZATION.REQUEST
  }
}

export function organizationInit() {
  return {
    type: types.ORGANIZATION.INIT
  }
}

export function organizationSuccess(payload) {
  return {
    type: types.ORGANIZATION.SUCCESS,
    ...payload
  }
}

export function organizationFailure(err) {
  return {
    type: types.ORGANIZATION.FAILURE,
    err
  }
}
