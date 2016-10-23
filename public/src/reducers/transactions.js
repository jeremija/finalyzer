const Immutable = require('seamless-immutable');
const constants = require('../constants.js');
const defaultState = {
  page: 0,
  isLoading: false,
  isInvalidated: false,
  hasMore: true,
  payeesById: {},
  data: []
};

export const transactions = (state = defaultState, action) => {
  switch (action.type) {
    case constants.TAG_PAYEE_RECEIVE:
    case constants.UNTAG_PAYEE_RECEIVE:
      let payee = action.payload;
      let payeesById = {...state.payeesById};
      payeesById[payee.id] = payee;
      return ({
        ...state,
        payeesById
      });
    case constants.TRANSACTIONS_REQUEST:
      let s = Immutable({
        ...state,
        isLoading: true,
        page: 1 + state.page
      });
      console.log('state', s);
      return s;
    case constants.TRANSACTIONS_RECEIVE:
      let newPayeesById = action.payload
      .filter(t => !state.payeesById[t.payee_id])
      .reduce((m, t) => {
        m[t.payee_id] = t.payee;
        return m;
      }, {});
      return Immutable({
        ...state,
        isLoading: false,
        data: [...state.data, ...action.payload],
        payeesById: {...state.payeesById, ...newPayeesById}
      });
    case constants.TRANSACTIONS_INVALIDATE:
      return Immutable({
        ...state,
        isLoading: false,
        isInvalidated: true
      });
    case constants.ACCOUNT_SELECT:
    default:
      return Immutable(state);
  }
};
