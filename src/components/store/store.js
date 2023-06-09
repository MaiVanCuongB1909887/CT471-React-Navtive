import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from '@reduxjs/toolkit';

import authReducer from './auth/AuthSlice';
import cartReducer from './cart/CartSlice';
import productReducer from './product/ProductSlice';
import userReducer from './user/UserSlice';
import orderReducer from './order/OrderSlice';
import blogReducer from './blog/BlogSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  product: productReducer,
  user: userReducer,
  order: orderReducer,
  blog: blogReducer,
});
const store = configureStore({
  reducer: rootReducer,
});

export default store;
