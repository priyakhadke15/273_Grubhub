import loginReducer from './login';
// import { combineReducers } from 'redux';
import cookie from 'react-cookies';

const isAuthcookiePresent = cookie.load('authCookie');

export default (state = {}, action) => {
    // console.log('combined:', state);
    // console.log('action', action)
    return {
        userdata: loginReducer(state, { type: isAuthcookiePresent ? 'LOGIN' : 'LOGOUT' })
    }
};

// export default combineReducers({ isLoggedIn: loginReducer(true) });