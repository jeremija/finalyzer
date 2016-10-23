const Immutable = require('seamless-immutable');
const constants = require('../constants.js');

export const account = (state = null, action) => {
  switch (action.type) {
    case constants.ACCOUNTS_RECEIVE:
      return Immutable(action.payload && action.payload[0]);
    case constants.ACCOUNT_SELECT:
      return Immutable(action.payload);
    default:
      return state;
  }
};

const initialAccountsState = {
  isLoading: false,
  isInvalidated: true,
  data: Immutable([])
};

export const accounts = (state = initialAccountsState, action) => {
  switch (action.type) {
    case constants.ACCOUNTS_REQUEST:
      return Immutable({
        isLoading: true,
        ...state
      });
    case constants.ACCOUNTS_RECEIVE:
      return Immutable({
        ...state,
        isLoading: false,
        isInvalidated: false,
        data: action.payload
      });
    case constants.ACCOUNTS_INVALIDATE:
      return Immutable({
        ...state,
        isLoading: false,
        isInvalidated: true
      });
    default:
      return Immutable(state);
  }
};
