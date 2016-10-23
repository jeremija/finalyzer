const React = require('react');
const ReactDOM = require('react-dom');
const { createStore, applyMiddleware } = require('redux');
const { Provider } = require('react-redux');
const thunk = require('redux-thunk').default;
const createLogger = require('redux-logger');
const { browserHistory } = require('react-router');
const { syncHistoryWithStore } = require('react-router-redux');
const reducers = require('./reducers/index.js');

const Router = require('./containers/Router.jsx');
const middleware = [ thunk, createLogger() ];

const store = createStore(
  reducers,
  applyMiddleware(...middleware)
);

const history = syncHistoryWithStore(browserHistory, store);

const node = document.querySelector('#react');
ReactDOM.render(
  <Provider store={store}>
    <Router history={history} />
  </Provider>,
  node
);
