const { combineReducers } = require('redux');
const account = require('./account.js');
const routing = require('./routing.js');

module.exports = combineReducers({
  ...account,
  routing
});
