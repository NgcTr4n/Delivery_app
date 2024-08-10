import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../Shared/baseUrl';
// leaders
export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading());
  return fetch(baseUrl + 'leaders')
    .then((response) => {
      if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
    })
    .then((leaders) => dispatch(addLeaders(leaders)))
    .catch((error) => dispatch(leadersFailed(error.message)));
};
const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING
});
const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess
});
const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
});
// dishes
export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading());
  return fetch(baseUrl + 'dishes')
    .then((response) => {
      if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
    })
    .then((dishes) => dispatch(addDishes(dishes)))
    .catch((error) => dispatch(dishesFailed(error.message)));
};
const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
});
const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess
});
const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});
// promotions
export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading());
  return fetch(baseUrl + 'promotions')
    .then((response) => {
      if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
    })
    .then((promos) => dispatch(addPromos(promos)))
    .catch((error) => dispatch(promosFailed(error.message)));
};
const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});
const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
});
const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});
// ActionCreators.js
export const updateCartItemQuantity = (dishId, quantity) => ({
  type: ActionTypes.UPDATE_CART_ITEM_QUANTITY,
  payload: { dishId, quantity },
});

export const removeFromCart = (dishId) => ({
  type: ActionTypes.REMOVE_FROM_CART,
  payload: dishId
});
export const addToCart = (dishId, quantity) => ({
  type: ActionTypes.ADD_TO_CART,
  payload: { dishId, quantity }
});

export const clearCart = () => ({
  type: ActionTypes.CLEAR_CART
});
export const addOrder = (order) => ({
  type: ActionTypes.ADD_ORDER,
  payload: order
});

export const ordersLoading = () => ({
  type: ActionTypes.ORDERS_LOADING
});

export const ordersFailed = (errmess) => ({
  type: ActionTypes.ORDERS_FAILED,
  payload: errmess
});

export const postOrder = (name, address, items) => (dispatch) => {
  dispatch(ordersLoading());

  const newOrder = {
    name: name,
    address: address,
    items: items,
    date: new Date().toISOString()
  };

  console.log('Sending order:', JSON.stringify(newOrder)); // Thêm log này

  return fetch(baseUrl + 'orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newOrder)
  })
  .then(response => {
    if (!response.ok) {
      return response.text().then(text => {
        throw new Error(`Server responded with ${response.status}: ${text}`);
      });
    }
    return response.json();
  })
  .then(order => {
    console.log('Order response:', order); // Thêm log này
    dispatch(addOrder(order));
    return order; // Trả về order để có thể xử lý trong component
  })
  .catch(error => {
    console.error('Error in postOrder:', error);
    dispatch(ordersFailed(error.message));
    throw error; // Ném lỗi để có thể bắt trong component
  });
};

