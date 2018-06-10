import * as types from '../actions/actionTypes';

const initialState = {
  isRegistered: false,
  isFetching: false
};

export default function register(state = initialState, action) {
  switch(action.type) {
    case types.REGISTER.REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isRegistered: false,
      });
    case types.REGISTER.SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isRegistered: true,
        failure: false,
      });
    case types.REGISTER.FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isRegistered: false,
        failure: true,
        errorMessage: action.err,
      });
    default:
      return state;
  }
}
