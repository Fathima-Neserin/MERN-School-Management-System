import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../reducers/auth.reducers";
import { thunk } from "redux-thunk"; 
import { composeWithDevTools } from "redux-devtools-extension";
import { userCountReducer, userCreateReducer, 
    userDeleteReducer, 
    userListReducer, 
    userUpdateReducer } from "../reducers/user.reducers";
import { studentCountReducer, studentCreateReducer, studentDeleteReducer, studentListReducer, studentUpdateReducer } from "../reducers/student.reducers";
import { libraryHistoryCreateReducer, libraryHistoryReducer, libraryHistoryUpdateReducer } from "../reducers/library.reducers";

// Combine reducers
const reducer = {
    auth: authReducer,
    userList: userListReducer,
    userCount: userCountReducer,
    userCreate: userCreateReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    studentList: studentListReducer,
    studentCount: studentCountReducer,
    studentCreate: studentCreateReducer,
    studentUpdate: studentUpdateReducer,
    studentDelete: studentDeleteReducer,
    libraryHistory: libraryHistoryReducer,
    libraryHistoryCreate: libraryHistoryCreateReducer,
    libraryHistoryUpdate: libraryHistoryUpdateReducer
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
    userCount: {
        loading: false,
        staffs: '',
        librarians: '',
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
    },
    userDelete: {
        loading: false,
        success:false,
        error:null
    },
    studentList: {
        loading: false,
        students: [],
        error: null,
    },
    studentCount: {
        loading: false,
        students: '',
        error: null,
    },
    studentCreate: {
        loading: false,
        success: false,
        error: null
    },
    studentUpdate: {
        loading: false,
        success: false,
        error: null
    },
    studentDelete: {
        loading: false,
        success:false,
        error:null
    },
    libraryHistory: {
        loading: false,
        histories: [],
        error: null,
    },
    libraryHistoryCreate: {
        loading: false,
        success: false,
        error: null
    }, 
    libraryHistoryUpdate: {
        loading: false,
        success: false,
        error: null
    },
};

// Configure the store using Redux Toolkit
const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: composeWithDevTools(),
});

export default store;
