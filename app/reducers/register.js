import * as types from '../actions/actionTypes';

const initialState = {
  isRegistered: false,
  isFetching: false,
  failure: false,
  errorMessage: false
};

export default function register(state = initialState, action) {
  switch(action.type) {
    case types.REGISTER.REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isRegistered: false,
        errorMessage: false
      });
    case types.REGISTER.SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isRegistered: true,
        failure: false,
        userId: action.userId,
      });
    case types.REGISTER.FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isRegistered: false,
        failure: true,
        errorMessage: action.err,
      });
    case types.REGISTER.INIT:
      return Object.assign({}, state, {
        isRegistered: false,
        isFetching: false,
        errorMessage: false,
        failure: false
      });
    default:
      return state;
  }
}
