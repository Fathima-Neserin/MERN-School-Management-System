import { LIBRARY_HISTORY_FAIL, LIBRARY_HISTORY_REQUEST, LIBRARY_HISTORY_SUCCESS } from "../constants/library.constants";

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