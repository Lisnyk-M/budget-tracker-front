import {combineReducers} from 'redux';
import {createReducer} from '@reduxjs/toolkit';
import authActions from './authActions.js';

const initialState = {
    token: '',

    user: {
        name: '',
        email: '',
    }
}

const initialErrorState = '';

const auth = createReducer(initialState, {
    [authActions.loginSuccess]: (_, action) => {
        return action.payload;
    },

    [authActions.loginError]: (_, action) => initialState,
    [authActions.logoutSuccess]: () => initialState,
})

const error = createReducer(initialErrorState, {
    [authActions.loginError]: (_, action) => action.payload,
})

const logined = createReducer(false, {
    [authActions.loginSuccess]: () => true,
    [authActions.loginError]: () => false,
    [authActions.logoutSuccess]: () => false,
})

const entryResponse = createReducer({}, {
    [authActions.addEntrySuccess]: (_, action) => action.payload,
    [authActions.addEntryError]: (_, action) => {},
})

const entries = createReducer({}, {
    [authActions.getEntrySuccess]: (_, action) => action.payload,
    [authActions.getEntryError]: (_, action) => ({}),
    [authActions.logoutSuccess]: () => {},
    [authActions.deleteEntrySuccess]: (_, action) => action.payload,
})

const positionRequest = createReducer({}, {
    [authActions.getPositionSuccess]: (_, action) => action.payload,
    [authActions.getPositionError]: (_, action) => {},
})

const date = createReducer('', {
    [authActions.changeDateSuccess]: (_, action) => action.payload
})

export default combineReducers({
    auth,
    logined,
    entryResponse,
    entries,
    positionRequest,
    date,
    error,
});
