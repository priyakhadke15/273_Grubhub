export const login = () => ({ type: 'LOGIN' });

export const logout = () => ({ type: 'LOGOUT' });

export const signup = email => ({ type: 'SIGNUP', payload: { email } });