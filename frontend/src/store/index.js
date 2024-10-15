import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../reducers/auth.reducers";
import { thunk } from "redux-thunk"; 
import { composeWithDevTools } from "redux-devtools-extension";
import { userCreateReducer, userListReducer, userUpdateReducer } from "../reducers/user.reducers";

// Combine reducers
const reducer = {
    auth: authReducer,
    userList: userListReducer,
    userCreate: userCreateReducer,
    userUpdate: userUpdateReducer
};

const userInfoFromStorage = sessionStorage.getItem("userInfo")
  ? JSON.parse(sessionStorage.getItem("userInfo"))
  : null;

  const initialState = {
    auth: {
        userInfo: userInfoFromStorage, 
        loading: false,
        error: null,
    },
    userList: {
        loading: false,
        staffs: [],
        librarians: [],
        error: null,
    },
    userCreate: {
        loading: false,
        success: false,
        error: null
    },
    userUpdate: {
        loading: false,
        success: false,
        error: null
    }
};

// Configure the store using Redux Toolkit
const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: composeWithDevTools(),
});

export default store;
