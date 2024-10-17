import { HISTORY_CREATE_FAIL, HISTORY_CREATE_REQUEST, 
    HISTORY_CREATE_SUCCESS, 
    LIBRARY_HISTORY_FAIL, 
    LIBRARY_HISTORY_REQUEST, 
    LIBRARY_HISTORY_SUCCESS } from "../constants/library.constants";

export const libraryHistoryReducer = (state = {}, action) => {
    switch (action.type) {
        case LIBRARY_HISTORY_REQUEST:
            return { ...state, loading: true, error: null };
        case LIBRARY_HISTORY_SUCCESS:
            return { ...state, loading: false, histories: action.payload }; 
        case LIBRARY_HISTORY_FAIL:
            return { ...state, loading: false, error: action.payload, success:false };
        default:
            return state;
    }
};

export const libraryHistoryCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case HISTORY_CREATE_REQUEST:
            return {...state, loading:true};
        case HISTORY_CREATE_SUCCESS:
            return {...state, loading:false, success:true};
        case HISTORY_CREATE_FAIL:
            return {...state, loading:false, error:action.payload, success:false};
        default:
            return state;
    }
}