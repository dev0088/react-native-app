import * as types from '../actions/actionTypes';

const initialStateOfUserInfo = {
  done: false,
  isFetching: false,
	failure: false,
	errorMessage: false,
  value: false,
	accountUserInfo
};

export default function accountUserInfo(state = initialStateOfUserInfo, action) {
  switch(action.type) {
    case types.ACCOUNT_USERINFO.REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        done: false,
        errorMessage: false,
				value: false
      });
    case types.ACCOUNT_USERINFO.SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        done: true,
        failure: false,
        value: {
                  Email: action.Email,
                  HasRegistered: action.HasRegistered,
                  LoginProvider: action.LoginProvider
                }
      });
    case types.ACCOUNT_USERINFO.FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        done: false,
        failure: true,
        errorMessage: action.err
      });
    case types.ACCOUNT_USERINFO.INIT:
      return Object.assign({}, state, {
        done: false,
        isFetching: false,
				value: false,
        errorMessage: false,
      });
    default:
      return state;
  }
}

const initialStateOfManageInfo = {
  done: false,
  isFetching: false,
	failure: false,
	errorMessage: false,
  value: false,
	accountManageInfo
};

export default function accountManageInfo(state = initialStateOfManageInfo, action) {
  switch(action.type) {
  case types.ACCOUNT_MANAGEINFO.REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isGotUserInfo: false,
        errorMessage: false,
				value: false
      });
    case types.ACCOUNT_MANAGEINFO.SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isGotUserInfo: true,
        failure: false,
        value: {
                  LoginProvider: action.LoginProvider,
                  Email: action.Email,
                  Logins: action.Logins,
                  ExternalLoginProviders: action.ExternalLoginProviders
                }
      });
    case types.ACCOUNT_MANAGEINFO.FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isGotUserInfo: false,
        failure: true,
        errorMessage: action.err
      });
    case types.ACCOUNT_MANAGEINFO.INIT:
      return Object.assign({}, state, {
        isGotUserInfo: false,
        isFetching: false,
				value: false,
        errorMessage: false,
      });
    default:
      return state;
  }
}


const initialStateOfChangePassword = {
  done: false,
  isFetching: false,
	failure: false,
	errorMessage: false,
  value: false,
	accountChangePassword
};

export default function accountChangePassword(state = initialStateOfChangePassword, action) {
  switch(action.type) {
  case types.ACCOUNT_CHANGEPASSWORD.REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        done: false,
        errorMessage: false,
				value: false
      });
    case types.ACCOUNT_CHANGEPASSWORD.SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        done: true,
        failure: false,
        value: true
      });
    case types.ACCOUNT_CHANGEPASSWORD.FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isGotUserInfo: false,
        failure: true,
        errorMessage: action.err
      });
    case types.ACCOUNT_CHANGEPASSWORD.INIT:
      return Object.assign({}, state, {
        done: false,
        isFetching: false,
				value: false,
        errorMessage: false,
      });
    default:
      return state;
  }
}
