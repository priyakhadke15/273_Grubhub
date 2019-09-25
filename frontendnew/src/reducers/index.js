import loginReducer from './login';
import cookie from 'react-cookies';

export default (state = {}, action) => ({
    userdata: loginReducer(state, { type: cookie.load('authCookie') ? 'LOGIN' : 'LOGOUT' })
});