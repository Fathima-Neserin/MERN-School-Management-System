import { 
    LIBRARIANS_LIST_FAIL, 
    LIBRARIANS_LIST_REQUEST, 
    LIBRARIANS_LIST_SUCCESS, 
    STAFFS_LIST_FAIL, 
    STAFFS_LIST_REQUEST, 
    STAFFS_LIST_SUCCESS, 
    USER_CREATE_FAIL, 
    USER_CREATE_REQUEST,
    USER_CREATE_SUCCESS,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL
} from "../constants/user.constants";

const initialState = {
    loading: false,
    staffs: [],
    librarians: [],
    error: null,
};

export const userListReducer = (state = initialState, action) => {
    switch (action.type) {
        case STAFFS_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case STAFFS_LIST_SUCCESS:
            return { ...state, loading: false, staffs: action.payload }; // Update only staffs
        case STAFFS_LIST_FAIL:
            return { ...state, loading: false, error: action.payload };
        case LIBRARIANS_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case LIBRARIANS_LIST_SUCCESS:
            return { ...state, loading: false, librarians: action.payload }; // Update only librarians
        case LIBRARIANS_LIST_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_CREATE_REQUEST:
            return {...state, loading:true};
        case USER_CREATE_SUCCESS:
            return {...state, loading:false, success:true};
        case USER_CREATE_FAIL:
            return {...state, loading:false, error:action.payload};
        default:
            return state;
    }
}


export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return {...state, loading:true};
        case USER_UPDATE_SUCCESS:
            return {...state, loading:false, success:true};
        case USER_UPDATE_FAIL:
            return {...state, loading:false, error:action.payload};
        default:
            return state;
    }
}