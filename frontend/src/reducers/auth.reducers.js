import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../constants/user.constants"

const initialState = {
    userInfo: null,
  };

  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case "USER_LOGIN_SUCCESS":
            return { ...state, loading: false, userInfo: action.payload };
      case "USER_LOGOUT":
        return { ...state, loading: false, error: action.payload };
        
        default:
        return state;
    }
  };