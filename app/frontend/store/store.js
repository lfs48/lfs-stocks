import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers/root_reducer';

// Conditionally set middleware used based on whether environment is development or production.
// Thunk is used to create and dispatch actions in all environments.
// Logger is used for debugging in development only.
let middleware;
if (process.env.NODE_ENV === 'development') {
    middleware = applyMiddleware(thunk, logger);
} else {
     middleware = applyMiddleware(thunk);
}

// Configure the refux store, passing in the root reducer, a preloaded state, and middleware determined above.
const configureStore = (preloadedState = {}) => createStore(
    rootReducer,
    preloadedState,
    middleware
);

export default configureStore;