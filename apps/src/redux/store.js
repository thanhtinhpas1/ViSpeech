import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { persistStore } from 'redux-persist'
import rootReducer from './root.reducer'
import rootSagas from './root.saga'

const sagaMiddleWare = createSagaMiddleware()
const middlewares = [sagaMiddleWare]

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger)
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares))
sagaMiddleWare.run(rootSagas)
export const persistor = persistStore(store)

export default { store, persistStore }
