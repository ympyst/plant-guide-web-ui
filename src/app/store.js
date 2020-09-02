import { configureStore } from '@reduxjs/toolkit';
import plantKeyReducer from './plantkey/plantkey.js';

export default configureStore({
  reducer: {
    plantkey: plantKeyReducer,
  },
});
