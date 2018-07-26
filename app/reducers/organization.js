import * as types from '../actions/actionTypes';

const initialState = {
	isGotOrganization: false,
  isFetching: false,
  errorMessage: false,
	organization
};

export default function organization(state = initialState, action) {
  switch(action.type) {
    case types.ORGANIZATION.REQUEST:
      return Object.assign({}, state, {
				isFetching: true,
				isGotOrganization: false,
			  errorMessage: false,
      });
    case types.ORGANIZATION.SUCCESS:
			let updatedState = state
			if (typeof action.DeveloperJson === 'string'){
				updatedState.developerJson = JSON.parse(action.DeveloperJson)
			}
			// for test
			// updatedState.developerJson.primaryColor = "#FF0000"
			// updatedState.developerJson.secondaryColor = "#FFFF00"
			// updatedState.developerJson.thirdColor = "#00FF00"
			// updatedState.developerJson.fourthColor = "#0000FF"
			console.log('=== updatedState: ', updatedState)
      return Object.assign({}, updatedState, {
				isFetching: false,
				isGotOrganization: true,
				failure: false,
      });
    case types.ORGANIZATION.FAILURE:
      return Object.assign({}, state, {
				isFetching: false,
				isGotOrganization: false,
				failure: true,
				errorMessage: action.err,
      });
    case types.ORGANIZATION.INIT:
      return Object.assign({}, state, {
				isFetching: false,
				isGotOrganization: false,
				errorMessage: false
      });
    default:
      return state;
  }
}
