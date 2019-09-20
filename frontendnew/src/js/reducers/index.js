import { userConstants } from "../constants/action-types";
const loginState = {
  username: "",
  password: "",
  authFlag: false,
  isSeller: false
}

function authenticate(state = loginState, action) {
  if (action.type === userConstants.LOGIN_REQUEST) {
    console.log("processing in login reducer")
    return {
      authFlag: false
    };
  }
  return state;
}

export default authenticate;