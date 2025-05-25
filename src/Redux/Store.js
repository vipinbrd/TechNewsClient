
import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '../Redux/newsSlice'; 
import authSlice from './AuthSlice';

const store = configureStore({
  reducer: {
    news: newsReducer,
    auth:authSlice.reducer
  },
});

export default store;
