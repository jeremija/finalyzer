const { combineReducers } = require('redux');
const account = require('./account.jsx');
const routing = require('./routing.js');

module.exports = combineReducers({
  ...account,
  routing
});
