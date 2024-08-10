// redux
import { createStore, combineReducers, applyMiddleware} from 'redux';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
import { dishes } from './dishes';
import { promotions } from './promotions';
import { cart } from './Cart';
// redux-persist
import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
const config = { key: 'root', storage: AsyncStorage, debug: true };

// reducers
import { leaders } from './leaders';
import { orders } from './orders';

export const ConfigureStore = () => {

  const store = createStore(
    persistCombineReducers(config, { leaders, dishes,  promotions, cart , orders  }),
    applyMiddleware(thunk, logger)
  );
  const persistor = persistStore(store);

  return {persistor, store};
};