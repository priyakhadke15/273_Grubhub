import loginReducer from './login';
import cookie from 'react-cookies';

export default (state = {}, action) => {
    let newAction
    if (action && (action.type === 'LOGIN' || action.type === 'LOGOUT')) {
        newAction = { type: action.type };
    } else {
        newAction = { type: cookie.load('authCookie') ? 'LOGIN' : 'LOGOUT' };
    }
    return {
        userdata: loginReducer(state, newAction)
    }
};