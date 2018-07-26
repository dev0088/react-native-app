import * as types from '../actions/actionTypes';

const initialState = {
	isGotRumsList: false,
  isFetching: false,
  errorMessage: false,
	value: false,
	rumslist
};

export default function rumslist(state = initialState, action) {
  switch(action.type) {
    case types.RUMSLIST.REQUEST:
      return Object.assign({}, state, {
				isFetching: true,
				isGotRumsList: false,
			  errorMessage: false,
      });
    case types.RUMSLIST.SUCCESS:
      return Object.assign({}, state, {
				isFetching: false,
				isGotRumsList: true,
				failure: false,
				value: {
					Data: action.Data
				}
      });
    case types.RUMSLIST.FAILURE:
      return Object.assign({}, state, {
				isFetching: false,
				isGotRumsList: false,
				failure: true,
				errorMessage: action.err,
      });
    case types.RUMSLIST.INIT:
      return Object.assign({}, state, {
				isFetching: false,
				isGotRumsList: false,
				errorMessage: false,
				value: false,
      });
    default:
      return state;
  }
}
