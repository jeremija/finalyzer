const Immutable = require('seamless-immutable');
const constants = require('../constants.js');
const moment = require('moment');

const defaultState = {
  isLoading: false,
  isInvalidated: true,
  data: [],
  startDate: '2015-01-01',
  endDate: moment().format('YYYY-MM-DD')
};

export const aggregate = (state = defaultState, action) => {
  switch (action.type) {
    case constants.TRANSACTIONS_BY_TAGS_REQUEST:
      return Immutable({
        ...state,
        isLoading: true
      });
    case constants.TRANSACTIONS_BY_TAGS_RECEIVE:
      return Immutable({
        ...state,
        isLoading: false,
        isInvalidated: false,
        data: action.payload
      });
    case constants.TRANSACTIONS_BY_TAGS_INVALIDATE:
      return Immutable({
        ...state,
        isInvalidated: true
      });
    default:
      return Immutable(state);
  }
};
