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

// const _logout = () => cookie.remove('authCookie', { path: '/' });

// export default (state, action) => {
//     console.log('login reducer', state, action)
//     if (action.type === 'LOGIN') {
//         return {
//             isLoggedIn: action.type === 'LOGIN',
//             ..._getUserdetails()
//         }
//     } else {
//         _logout();
//         return { isLoggedIn: false }
//     }
// };

export default (state, action) => ({
    isLoggedIn: action.type === 'LOGIN',
    ...getUserdetails()
});