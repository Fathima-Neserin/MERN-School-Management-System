import { FEES_HISTORY_CREATE_FAIL, FEES_HISTORY_CREATE_REQUEST, FEES_HISTORY_CREATE_SUCCESS, FEES_HISTORY_FAIL, 
    FEES_HISTORY_REQUEST, 
    FEES_HISTORY_SUCCESS } from "../constants/fees.constants";

export const feesHistoryReducer = (state = {}, action) => {
    switch (action.type) {
        case FEES_HISTORY_REQUEST:
            return { ...state, loading: true, error: null };
        case FEES_HISTORY_SUCCESS:
            return { ...state, loading: false, histories: action.payload }; 
        case FEES_HISTORY_FAIL:
            return { ...state, loading: false, error: action.payload, success:false };
        default:
            return state;
    }
};

export const feesHistoryCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case FEES_HISTORY_CREATE_REQUEST:
            return {...state, loading:true};
        case FEES_HISTORY_CREATE_SUCCESS:
            return {...state, loading:false, success:true};
        case FEES_HISTORY_CREATE_FAIL:
            return {...state, loading:false, error:action.payload, success:false};
        default:
            return state;
    }
}
