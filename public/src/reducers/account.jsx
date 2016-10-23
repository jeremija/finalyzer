const constants = require('../constants.js');

export const account = (state = null, action) => {
  switch (action.type) {
    case constants.ACCOUNT_SELECT:
      return action.payload;
    default:
      return state;
  }
};

const initialAccountsState = {
  isLoading: false,
  isInvalidated: true,
  data: []
};

export const accounts = (state = initialAccountsState, action) => {
  switch (action.type) {
    case constants.ACCOUNTS_REQUEST:
      return {
        isLoading: true,
        ...state
      };
    case constants.ACCOUNTS_RECEIVE:
      return {
        isLoading: false,
        isInvalidated: false,
        data: action.payload
      };
    case constants.ACCOUNTS_INVALIDATE:
      return {
        isLoading: false,
        isInvalidated: true,
        data: state.data
      };
    default:
      return state;
  }
};
