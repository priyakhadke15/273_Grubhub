import cookie from 'react-cookies';

const getUserdetails = () => {
    const authCookie = cookie.load('authCookie');
    if (authCookie) {
        // 1. load cookie (it will be a standard jwt string)
        // 2. split by '.' (should be an array of length=3), get array[1]
        // 3. base64 decode this string from step 2 ^^
        // JSON parse to convert to a regular JS object
        const { id, email, isSeller } = JSON.parse(window.atob(cookie.load('authCookie').split('.')[1]));
        return {
            id, email, isSeller
        };
    } else {
        return {};
    }
};

export default (state, action) => ({
    isLoggedIn: action.type === 'LOGIN' ? 'true' : 'false',
    ...getUserdetails()
});