import { configureStore } from '@reduxjs/toolkit';
import configReducer from './reducers/config/configSlice';

export default configureStore({
  reducer: {
    config: configReducer,
  },
});
