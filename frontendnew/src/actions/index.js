export const login = () => ({ type: 'LOGIN' });

export const logout = () => ({ type: 'LOGOUT' });

export const signup = email => {
    console.log('in signup action')
    return { type: 'SIGNUP', payload: { email } }
};