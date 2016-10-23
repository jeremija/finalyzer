const constants = require('../constants.js');
const http = require('../util/http.js');

const notify = (dispatch, actionType) => payload => {
  dispatch({ type: actionType, payload });
};

export const selectAccount = account => {
  return {
    type: constants.ACCOUNT_SELECT,
    payload: account
  };
};

export const fetchAccounts = () => dispatch => {
  notify(dispatch, constants.ACCOUNTS_REQUEST)();
  return http.get('/api/accounts')
  .then(notify(dispatch, constants.ACCOUNTS_RECEIVE))
  .catch(notify(dispatch, constants.ACCOUNTS_INVALIDATE));
};

export const fetchTransactions = () => (dispatch, getState) => {
  const account = getState().account;
  if (!account) return;
  notify(dispatch, constants.TRANSACTIONS_REQUEST)();
  const page = getState().transactions.page;
  console.log('page', page);
  return http.get('/api/account/' + account.id + '/transactions/' + page)
  .then(notify(dispatch, constants.TRANSACTIONS_RECEIVE))
  .catch(notify(dispatch, constants.TRANSACTIONS_INVALIDATE));
};

export const tagOrUntagPayee = (payee, tagName) => {
  if (tagName) return tagPayee(payee, tagName);
  return untagPayee(payee);
};

export const tagPayee = (payee, tagName) => dispatch => {
  tagName = encodeURIComponent(tagName);
  notify(dispatch, constants.TAG_PAYEE_REQUEST)();
  return http.post('/api/payee/' + payee.id + '/tag/' + tagName)
  .then(notify(dispatch, constants.TAG_PAYEE_RECEIVE))
  .catch(notify(dispatch, constants.TAG_PAYEE_INVALIDATE));
};

export const untagPayee = payee => dispatch => {
  notify(dispatch, constants.UNTAG_PAYEE_REQUEST)();
  return http.delete('/api/payee/' + payee.id)
  .then(notify(dispatch, constants.UNTAG_PAYEE_RECEIVE))
  .catch(notify(dispatch, constants.UNTAG_PAYEE_INVALIDATE));
};

export const fetchTransactionsByTags = (date1, date2) => (d, getState) => {
  const account = getState().account;
  if (!account) return;
  notify(d, constants.TRANSACTIONS_BY_TAGS_REQUEST)();
  const url = '/api/account/' + account.id + '/tagged/' + date1 + '/' + date2;
  return http.get(url)
  .then(notify(d, constants.TRANSACTIONS_BY_TAGS_RECEIVE))
  .catch(notify(d, constants.TRANSACTIONS_BY_TAGS_INVALIDATE));
};
