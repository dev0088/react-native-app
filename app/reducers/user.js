import * as types from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  isFetching: false,
  access_token: '',
  token_type: '',
  expires_in: 0,
  userName: ''
};

export default function user(state = initialState, action) {
  switch(action.type) {
    case types.LOGIN.REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
      });
    case types.LOGIN.SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        failure: false,
        access_token: action.access_token,
        userName: action.userName,
      });
    case types.LOGIN.FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        failure: true,
        errorMessage: action.err,
      });
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
