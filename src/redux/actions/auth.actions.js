import {
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    LOGIN_BEGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from '../types';

const fetchUser = () => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        dispatch({type: FETCH_USER_SUCCESS, payload: user});
    } else {
        dispatch({type: FETCH_USER_FAILURE});
    }
};

const login = (email, password) => async (dispatch) => {
    try {
        dispatch({type: LOGIN_BEGIN});

        const request = await fetch('http://localhost:4000/api/v1/auth/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });

        if (request.status === 200) {
            const user = await request.json();

            localStorage.setItem('user', JSON.stringify(user));
            dispatch({type: LOGIN_SUCCESS, payload: user});
        }
    } catch (err) {
        console.log(err);
        dispatch({type: LOGIN_FAILURE});
    }
};

export const auth = {fetchUser, login};