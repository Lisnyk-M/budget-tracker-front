import axios from 'axios';
import sendNotification from '../../helpers/notification';
import authActions from './authActions';

// axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.baseURL = 'https://lisnyk-m-btrack.herokuapp.com';

const register = credentials => (dispatch, getState) => {
    const user = {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
    };

    dispatch(authActions.registerRequest());

    axios.post('/auth/register', user)
        .then(res => {
            sendNotification('На указанный Вами адрес почты выслано письмо для завершения регистрации.');
            dispatch(authActions.registerSuccess(res.data));
        })
        .catch(error => {
            sendNotification(error.message);
            dispatch(authActions.registerError(error.message));
        });
}

const login = credentials => (dispatch, getState) => {
    const user = {
        email: credentials.email,
        password: credentials.password,
    }

    dispatch(authActions.loginRequest());

    axios.post('auth/login', user)
        .then(res => {
            // sendNotification('Вход в систему удачно произведен.');
            dispatch(authActions.loginSuccess(res.data));
        })
        .catch(error => {
            sendNotification(error.message, 'danger');
            dispatch(authActions.loginError(error.message));
        });
}

const logout = credentials => (dispatch, getState) => {
    const user = {
        email: credentials.email,
        password: credentials.password,
    }

    const state = getState();

    const options = {
        headers: {
            'Authorization': `Bearer ${state.auth.token}`
        }
    }

    dispatch(authActions.logoutRequest());

    axios.post('auth/logout', null, options)
        .then(res => {
            dispatch(authActions.logoutSuccess(res.data));

        })
        .catch(err => {
            sendNotification(err.message, 'danger');
            dispatch(authActions.logoutError(err.message));
        });
}

const addEntry = data => (dispatch, getState) => {
    const state = getState();

    const options = {
        headers: {
            'Authorization': `Bearer ${state.auth.token}`
        }
    }

    dispatch(authActions.addEntryRequest());

    axios.post('/entries', data, options)
        .then(res => dispatch(authActions.addEntrySuccess(res.data)))
        .catch(err => dispatch(authActions.addEntryError(err.message)));
}

const getEntry = (date) => (dispatch, getState) => {
    const state = getState();

    const options = {
        headers: {
            'Authorization': `Bearer ${state.auth.token}`
        },
    }

    dispatch(authActions.getEntryRequest());

    axios.get(`/entries/${date}`, options)
        .then(res => dispatch(authActions.getEntrySuccess(res.data)))
        .catch(err => {
            dispatch(authActions.getEntryError(err.message));
        });
}

const deleteEntry = (data) => (dispatch, getState) => {
    const state = getState();

    dispatch(authActions.deleteEntryRequest());

    axios({
        method: 'delete',
        url: `/entries/${data.date}`,
        headers: {
            'Authorization': `Bearer ${state.auth.token}`
        },
        data: {
            id: data.id
        }
    })
        .then(res => dispatch(authActions.deleteEntrySuccess(res.data)))
        .catch(err => dispatch(authActions.deleteEntryError(err.message)));
}

const getPosition = data => (dispatch, getState) => {
    const state = getState();
    dispatch(authActions.getPositionRequest());

    axios({
        method: 'put',
        url: `/entries/position/${data.date}`,
        headers: {
            'Authorization': `Bearer ${state.auth.token}`
        },
        data: {
            id: data.id
        }
    })
        .then(res => dispatch(authActions.getPositionSuccess(res.data)))
        .catch(err => dispatch(authActions.getPositionError(err.message)));
} 

const changeDate = params => (dispatch, getState) => {
    dispatch(authActions.changeDateSuccess(params))
}

export default {
    register,
    login,
    logout,
    addEntry,
    getEntry,
    deleteEntry,
    getPosition,
    changeDate,
}