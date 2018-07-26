import { createStore, applyMiddleware, compose  } from 'redux'
import { createLogger } from 'redux-logger'
import reducers from '../reducers';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import createSagaMiddleware from 'redux-saga';
import sagas from '../sagas';
import {composeWithDevTools} from 'remote-redux-devtools';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

export default function configureStore(onComplete) {

  const engine = createEngine('AppTree');
  const storeMiddleware = storage.createMiddleware(engine);
  const sagaMiddleware = createSagaMiddleware();
	let middleware = [sagaMiddleware, storeMiddleware]
	let store
	if (process.env.NODE_ENV !== 'production') {
		const logger = createLogger({
		  predicate: (getState, action) => isDebuggingInChrome,
		  collapsed: true,
		  duration: true,
		  diff: true,
		});

		middleware = [
			...middleware
		]
		// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
		store = createStore(
			storage.reducer(reducers),
			//Apply redux-storage so we can persist Redux state to disk
			composeWithDevTools(
				applyMiddleware(
					...middleware, logger
				),
			)
		);
	} else {
		const composeEnhancers = compose;
		store = createStore(
			storage.reducer(reducers), //Apply redux-storage so we can persist Redux state to disk
			composeEnhancers(
				applyMiddleware(
					...middleware
				),
			),
		);
	}


	if (isDebuggingInChrome) {
    window.store = store;
  }

  const load = storage.createLoader(engine);
  load(store)
    .then(onComplete)
    .catch(() => console.log('Failed to load previous state'));

  sagaMiddleware.run(sagas);

  return store;
}
