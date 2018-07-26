import * as types from '../actions/actionTypes';

const initialState = {
	done: false,
  isFetching: false,
  errorMessage: false,
	value: false,
};

export default function rums(state = initialState, action) {
  switch(action.type) {
    case types.RUMS_CREATE.REQUEST:
      return Object.assign({}, state, {
				isFetching: true,
				done: false,
			  errorMessage: false,
        value: action.value
      });
    case types.RUMS_CREATE.SUCCESS:
      return Object.assign({}, state, {
				isFetching: false,
				done: true,
				failure: false,
      });
    case types.RUMS_CREATE.FAILURE:
      return Object.assign({}, state, {
				isFetching: false,
				done: false,
				failure: true,
				errorMessage: action.err,
      });
    case types.RUMS_CREATE.INIT:
      return Object.assign({}, state, {
				isFetching: false,
				done: false,
				errorMessage: false,
      });
    // RUMS update
    case types.RUMS_UPDATE.REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        done: false,
        errorMessage: false,
        value: action.value
      });
    case types.RUMS_UPDATE.SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        done: true,
        failure: false,
      });
    case types.RUMS_UPDATE.FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        done: false,
        failure: true,
        errorMessage: action.err,
      });
    case types.RUMS_UPDATE.INIT:
      return Object.assign({}, state, {
        isFetching: false,
        done: false,
        errorMessage: false,
      });
    // RUMS delete
    case types.RUMS_DELETE.REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        done: false,
        errorMessage: false,
        value: action.value
      });
    case types.RUMS_UPDATE.SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        done: true,
        failure: false,
      });
    case types.RUMS_DELETE.FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        done: false,
        failure: true,
        errorMessage: action.err,
      });
    case types.RUMS_DELETE.INIT:
      return Object.assign({}, state, {
        isFetching: false,
        done: false,
        errorMessage: false,
      });
    // RUMS sort
  case types.RUMS_SORT.REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        done: false,
        errorMessage: false,
        value: action.value
      });
    case types.RUMS_SORT.SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        done: true,
        failure: false,
      });
    case types.RUMS_SORT.FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        done: false,
        failure: true,
        errorMessage: action.err,
      });
    case types.RUMS_SORT.INIT:
      return Object.assign({}, state, {
        isFetching: false,
        done: false,
        errorMessage: false,
      });
    default:
      return state;
  }
}
