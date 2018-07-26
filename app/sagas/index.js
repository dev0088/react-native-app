import { fork } from 'redux-saga/effects'

import init from './init';
import login from './login';
import loginFromRegistration from './loginFromRegistration';
import register from './register';
import organization from './organization';
import rumslist from './rumslist';
import user from './user';
import account from './account';

// Consider using takeEvery
export default function* root() {
  yield fork(init);
  yield fork(login);
	yield fork(loginFromRegistration);
	yield fork(register);
	yield fork(organization);
	yield fork(rumslist);
	yield fork(user);
  yield fork(account);
}
