import thunk from 'redux-thunk';
import reducers from './reducers';
import { applyMiddleware, createStore } from 'redux';

const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

export {
    store
};

export default store;
