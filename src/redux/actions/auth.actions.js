import {
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    LOGIN_BEGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    REGISTER_BEGIN,
    REGISTER_SUCCESS,
    REGISTER_FAILURE
} from '../types';

const fetchUser = () => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        dispatch({type: FETCH_USER_SUCCESS, payload: user});
    } else {
        dispatch({type: FETCH_USER_FAILURE});
    }
};

const login = (email, password) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: LOGIN_BEGIN});

        fetch('http://localhost:4000/api/v1/auth/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        }).then(response => response.json()
            .then(res => {
                if (response.status === 200) {
                    const user = res;

                    localStorage.setItem('user', JSON.stringify(user));
                    dispatch({type: LOGIN_SUCCESS, payload: user});
                    resolve("");
                } else {
                    dispatch({type: LOGIN_FAILURE});
                    reject("Email address or password was incorrect");
                }
            })).catch(err => {
            dispatch({type: LOGIN_FAILURE});
            reject(err);
        });
    });
};

const logout = () => (dispatch) => {
    localStorage.removeItem('user');
    dispatch({type: LOGOUT_SUCCESS, payload: {isLoggedIn: false, user: null}});
}

const register = (name, email, password) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: REGISTER_BEGIN});

        fetch('http://localhost:4000/api/v1/auth/register', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        }).then(response => response.json()
            .then(res => {
                if (response.status === 201) {
                    const user = res;

                    localStorage.setItem('user', JSON.stringify(user));
                    dispatch({type: REGISTER_SUCCESS, payload: user});
                    resolve("");
                } else {
                    dispatch({type: REGISTER_FAILURE});
                    reject("Something went wrong.");
                }
            })).catch(err => {
            dispatch({type: REGISTER_FAILURE});
            reject(err);
        });
    });
};

export const auth = {fetchUser, login, logout, register};