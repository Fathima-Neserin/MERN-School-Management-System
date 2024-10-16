import { STUDENT_CREATE_FAIL, STUDENT_CREATE_REQUEST, STUDENT_CREATE_SUCCESS, STUDENT_DELETE_FAIL, STUDENT_DELETE_REQUEST, STUDENT_DELETE_SUCCESS, STUDENT_UPDATE_FAIL, STUDENT_UPDATE_REQUEST, STUDENT_UPDATE_SUCCESS, STUDENTS_COUNT_FAIL, 
    STUDENTS_COUNT_REQUEST, 
    STUDENTS_COUNT_SUCCESS, 
    STUDENTS_LIST_FAIL, 
    STUDENTS_LIST_REQUEST, 
    STUDENTS_LIST_SUCCESS } from "../constants/student.constants";

export const studentListReducer = (state = {}, action) => {
    switch (action.type) {
        case STUDENTS_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case STUDENTS_LIST_SUCCESS:
            return { ...state, loading: false, students: action.payload }; 
        case STUDENTS_LIST_FAIL:
            return { ...state, loading: false, error: action.payload, success:false };
        default:
            return state;
    }
};

export const studentCountReducer = (state ={}, action) => {
    switch (action.type) {
        case STUDENTS_COUNT_REQUEST:
            return { ...state, loading: true, error: null };
        case STUDENTS_COUNT_SUCCESS:
            return { ...state, loading: false, students: action.payload }; 
        case STUDENTS_COUNT_FAIL:
            return { ...state, loading: false, error: action.payload, success:false };
        default:
            return state;
    }
};


export const studentCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case STUDENT_CREATE_REQUEST:
            return {...state, loading:true};
        case STUDENT_CREATE_SUCCESS:
            return {...state, loading:false, success:true};
        case STUDENT_CREATE_FAIL:
            return {...state, loading:false, error:action.payload, success:false};
        default:
            return state;
    }
}

export const studentUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case STUDENT_UPDATE_REQUEST:
            return {...state, loading:true};
        case STUDENT_UPDATE_SUCCESS:
            return {...state, loading:false, success:true};
        case STUDENT_UPDATE_FAIL:
            return {...state, loading:false, error:action.payload, success:false};
        default:
            return state;
    }
}

export const studentDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case STUDENT_DELETE_REQUEST:
            return {...state, loading:true};
        case STUDENT_DELETE_SUCCESS:
            return {...state, loading:false, success:true};
        case STUDENT_DELETE_FAIL:
            return {...state, loading:false, error:action.payload};
        default:
            return state;
    }
}