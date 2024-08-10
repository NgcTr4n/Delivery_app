import * as ActionTypes from './ActionTypes';
export const cart = (state = [], action) => {
    switch (action.type) {
      case ActionTypes.ADD_TO_CART:
        const existingItem = state.find(item => item.dishId === action.payload.dishId);
        if (existingItem) {
          return state.map(item =>
            item.dishId === action.payload.dishId
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          );
        } else {
          return [...state, { dishId: action.payload.dishId, quantity: action.payload.quantity }];
        }
      case ActionTypes.REMOVE_FROM_CART:
        return state.filter(item => item.dishId !== action.payload);
      case ActionTypes.UPDATE_CART_ITEM_QUANTITY:
        return state.map(item =>
          item.dishId === action.payload.dishId
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
        case ActionTypes.CLEAR_CART:
      return []; 
      default:
        return state;
    }
  };
  