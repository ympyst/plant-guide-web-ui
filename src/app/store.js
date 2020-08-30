import { configureStore } from '@reduxjs/toolkit';
import plantKeyReducer from './plantkey';

export default configureStore({
  reducer: {
    plantkey: plantKeyReducer,
  },
});
