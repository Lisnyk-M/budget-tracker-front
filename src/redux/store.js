import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth/authReducer';

const store = configureStore({
    reducer: authReducer, 
})

export default store;
