import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import reduxReset from 'redux-reset';
import logger from 'redux-logger';
import { setupAxiosJwtHeader } from '../helper/http-intercetor';
import epicAdapterService from '../service/single/epic-adapter.service';

setupAxiosJwtHeader();

import { reducers } from '../reducer';
import rootEpic from '../epic';

const persistConfig = {
  key: 'root',
  storage
};

function setupStore() {
  const persistedReducer = persistReducer(persistConfig, combineReducers(reducers));
  const epicMiddleware = createEpicMiddleware(rootEpic, {
    adapter: epicAdapterService
  });
  const store = createStore(
    persistedReducer,
    compose(applyMiddleware(epicMiddleware, logger), reduxReset())
  );
  return store;
}

export default () => {
  const store = setupStore();
  const persistor = persistStore(store, null, () => {
    setupAxiosJwtHeader(store.getState().auth.token);
  });
  return { store, persistor };
};