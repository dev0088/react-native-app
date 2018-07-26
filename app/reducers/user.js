import * as types from '../actions/actionTypes';
import { userRequest } from '../actions/userActions';

const initialState = {
  isGotUserInfo: false,
  isFetching: false,
	failure: false,
	errorMessage: false,
  userInfo: false,
	user
};

export default function user(state = initialState, action) {
  switch(action.type) {
    case types.USER.REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isGotUserInfo: false,
        errorMessage: false,
				userInfo: false
      });
    case types.USER.SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isGotUserInfo: true,
        failure: false,
        userInfo: action.Data
      });
    case types.USER.FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isGotUserInfo: false,
        failure: true,
        errorMessage: action.err
      });
    case types.USER.INIT:
      return Object.assign({}, state, {
        isGotUserInfo: false,
        isFetching: false,
				userInfo: false,
        errorMessage: false,
      });

    //user update actions
    case types.USER_UPDATE.REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isGotUserInfo: false,
        errorMessage: false,
      });
    case types.USER_UPDATE.SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isGotUserInfo: true,
        failure: false,
      });
    case types.USER_UPDATE.FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isGotUserInfo: false,
        failure: true,
        errorMessage: action.err
      });
    case types.USER_UPDATE.INIT:
      return Object.assign({}, state, {
        isGotUserInfo: false,
        isFetching: false,
        errorMessage: false,
      });

    default:
      return state;
  }
}
