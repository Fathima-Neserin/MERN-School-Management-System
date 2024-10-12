import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../reducers/auth.reducers";
import { thunk } from "redux-thunk"; 
import { composeWithDevTools } from "redux-devtools-extension";

// Combine reducers if you have multiple ones
const reducer = {
    auth: authReducer,
};

const initialState = {
    loading: false,
    userInfo: null,
};

// Configure the store using Redux Toolkit
const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: composeWithDevTools(),
});

export default store;
