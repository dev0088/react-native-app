import * as types from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  isFetching: false,
  access_token: '',
  token_type: '',
  expires_in: 0,
  userName: '',
  password: '',
  errorMessage: false,
	fromRegistration: false,
  checkedOnboarding: {
    welcome: true,
    interact: true,
    learn: true,
    readyToBegin: true,
    track: true,
    self: true,
    welComeToPursuit: true
  },
	auth
};

export default function auth(state = initialState, action) {
  switch(action.type) {
    case types.LOGIN.REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        errorMessage: false,
        userName: action.userName ? action.userName : state.userName,
        password: action.password ? action.password: state.password,
				fromRegistration: false,
      });
    case types.LOGIN.SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        failure: false,
        access_token: action.access_token,
        userName: action.userName ? action.userName : state.userName,
				token_type: action.token_type,
				fromRegistration: false,
        checkedOnboarding: {
          welcome: true,
          interact: true,
          learn: true,
          readyToBegin: true,
          track: true,
          self: true,
          welComeToPursuit: true
        },
      });
    case types.LOGIN.FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        failure: true,
        errorMessage: action.err,
        access_token: '',
				fromRegistration: false
      });
    case types.LOGIN.INIT:
      return Object.assign({}, state, {
        isAuthenticated: false,
        isFetching: false,
        access_token: '',
        token_type: '',
        expires_in: 0,
        errorMessage: false,
				fromRegistration: false
      });
		case types.LOGIN_FROM_REGISTRATION.REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        errorMessage: false,
        userName: action.userName ? action.userName : state.userName,
        password: action.password ? action.password: state.password,
				fromRegistration: true
      });
    case types.LOGIN_FROM_REGISTRATION.SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        failure: false,
        access_token: action.access_token,
        token_type: action.token_type,
        userName: action.userName ? action.userName : state.userName,
				fromRegistration: true,
        checkedOnboarding: {
          welcome: false,
          interact: false,
          learn: false,
          readyToBegin: false,
          track: false,
          self: false,
          welComeToPursuit: false
        },
      });
    case types.LOGIN_FROM_REGISTRATION.FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        failure: true,
        access_token: '',
        token_type: '',
        userName: action.userName ? action.userName : state.userName,
        password: action.password ? action.password: state.password,
        errorMessage: action.err,
				fromRegistration: true
      });
    case types.LOGIN_FROM_REGISTRATION.INIT:
      return Object.assign({}, state, {
        isAuthenticated: false,
        isFetching: false,
        access_token: '',
        token_type: '',
        expires_in: 0,
        errorMessage: false,
				fromRegistration: true
      });
    case types.LOGOUT.REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
				isAuthenticated: false,
				errorMessage: false,
        access_token: '',
        token_type: '',
				fromRegistration: false
			});
    case types.CHECKED_ONBOARDING_WELCOME:
      console.log('=== reducer: welcome: ', state, action)
      return Object.assign({}, state, {
        ...state,
        checkedOnboarding: {
          ...state.checkedOnboarding,
          welcome: true
        }
			});
    case types.CHECKED_ONBOARDING_INTERACT:
      return Object.assign({}, state, {
        ...state,
        checkedOnboarding: {
          ...state.checkedOnboarding,
          interact: true
        }
			});
    case types.CHECKED_ONBOARDING_LEARN:
      return Object.assign({}, state, {
        ...state,
        checkedOnboarding: {
          ...state.checkedOnboarding,
          learn: true
        }
			});
    case types.CHECKED_ONBOARDING_READY_TO_BEGIN:
      return Object.assign({}, state, {
        ...state,
        checkedOnboarding: {
          ...state.checkedOnboarding,
          readyToBegin: true
        }
			});
    case types.CHECKED_ONBOARDING_TRACK:
      return Object.assign({}, state, {
        ...state,
        checkedOnboarding: {
          ...state.checkedOnboarding,
          track: true
        }
			});
    case types.CHECKED_ONBOARDING_SELF:
      return Object.assign({}, state, {
        ...state,
        checkedOnboarding: {
          ...state.checkedOnboarding,
          self: true
        }
			});
    case types.CHECKED_ONBOARDING_WELCOME_TO_PURSUIT:
      return Object.assign({}, state, {
        ...state,
        checkedOnboarding: {
          ...state.checkedOnboarding,
          welComeToPursuit: true
        }
			});
    default:
      return state;
  }
}

export function getAccessToken(state) {
  if (state.access_token) {
    return state.access_token
  }
}

export function getTokenType(state) {
  if (state.token_type) {
    return state.token_type
  }
}
