import { STUDENT_CREATE_FAIL, STUDENT_CREATE_REQUEST, STUDENT_CREATE_SUCCESS, STUDENTS_COUNT_FAIL, 
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
