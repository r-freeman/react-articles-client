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

const initialState = {user: null, isAuthenticating: false, isRegistering: false, isLoggedIn: false};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_SUCCESS:
            return {...state, user: action.payload, isLoggedIn: true};
        case FETCH_USER_FAILURE:
            return initialState;
        case LOGIN_BEGIN:
            return {...state, isAuthenticating: true};
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuthenticating: false,
                isLoggedIn: true
            };
        case LOGIN_FAILURE:
            return {...state, isAuthenticating: false};
        case LOGOUT_SUCCESS:
            return {...state, isLoggedIn: action.payload.isLoggedIn, user: action.payload.user};
        case REGISTER_BEGIN:
            return {...state, isRegistering: true};
        case REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isRegistering: false,
                isLoggedIn: true
            }
        case REGISTER_FAILURE:
            return {...state, isRegistering: false};
        default:
            return state;
    }
};

export default auth;