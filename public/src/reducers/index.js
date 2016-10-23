const { combineReducers } = require('redux');
const account = require('./account.js');
const aggregate = require('./aggregate.js');
const routing = require('./routing.js');
const transactions = require('./transactions.js');

module.exports = combineReducers({
  ...account,
  ...aggregate,
  ...transactions,
  routing
});
