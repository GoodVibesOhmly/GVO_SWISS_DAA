import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { save } from 'redux-localstorage-simple';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import { createBlackBoxMiddleware } from '@oqton/redux-black-box';
import reducer from './store/techdapp';

// import { blackBoxMiddleware } from '@oqton/redux-black-box';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { OnboardProvider } from './components/OnboardProvider';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    createBlackBoxMiddleware([['web3']]),
    save({ states: ['agreedtandc', 'tandcsignature'] }),
  ),
);

// const store = createStore(reducer, load(), enhancer);
const store = createStore(reducer, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <OnboardProvider>
      <App />
    </OnboardProvider>
  </Provider>,
  document.getElementById('root'),
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
