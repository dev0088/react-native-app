import { combineReducers } from 'redux';
import counter from './counter';
import auth, * as fromAuth from './auth';
import register from './register';
import entities from './entities'
import organization from './organization'
import rumslist from './rumslist'
import user from './user'
// import userUpdate from './userUpdate'
import rums from './rums'

export default combineReducers({
  counter,
  auth,
	register,
	organization,
	rumslist,
	user,
  // userUpdate
});

export const accessToken = state => fromAuth.getAccessTokent(state.auth)
export const tokenType = state => fromAuth.getTokenType(state.auth)

export function getAccessToken() {
  return (state) => (
    fromAuth.getAccessTokent(state.auth)
  )
}

export function getTokenType() {
  return (state) => (
    fromAuth.getTokenType(state.auth)
  )
}

export function withAuth(headers={}) {
  return (state) => ({
    ...headers,
    'Authorization': `${tokenType(state)} ${accessToken(state)}`
  })
}
