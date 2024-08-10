import * as ActionTypes from './ActionTypes';

export const orders = (state = {
  isLoading: false,
  errMess: null,
  orders: []
}, action) => {
  switch(action.type) {
    case ActionTypes.ADD_ORDER:
      return {...state, isLoading: false, errMess: null, orders: state.orders.concat(action.payload)};

    case ActionTypes.ORDERS_LOADING:
      return {...state, isLoading: true, errMess: null, orders: []};

    case ActionTypes.ORDERS_FAILED:
      return {...state, isLoading: false, errMess: action.payload, orders: []};

    default:
      return state;
  }
};