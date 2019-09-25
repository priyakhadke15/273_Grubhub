import loginReducer from './login';
import cookie from 'react-cookies';

export default (state = {}, action) => {
    let newAction
    console.log('index reducer', state, action)
    if (action && (action.type === 'LOGIN' || action.type === 'LOGOUT' || action.type === 'SIGNUP')) {
        newAction = { type: action.type, payload: action.payload };
    } else {
        newAction = { type: cookie.load('authCookie') ? 'LOGIN' : 'LOGOUT' };
    }
    return {
        userdata: loginReducer(state, newAction)
    }
};