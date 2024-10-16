import axios from "axios";
import { STUDENTS_COUNT_FAIL, STUDENTS_COUNT_REQUEST, STUDENTS_COUNT_SUCCESS, STUDENTS_LIST_FAIL, STUDENTS_LIST_REQUEST, STUDENTS_LIST_SUCCESS } from "../constants/student.constants";

export const listStudents = () => async(dispatch, getState) => {
    try {
        dispatch({type: STUDENTS_LIST_REQUEST})

        const {
                auth : { userInfo }
               } = getState();

        const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                },
                withCredentials:true
            };       

            const { data } = await axios.get("/api/student", config);
    
            if (data.success) {
                dispatch({
                    type: STUDENTS_LIST_SUCCESS,
                    payload: data.students, 
                });
            } else {
                dispatch({
                    type: STUDENTS_LIST_FAIL,
                    payload: "Failed to fetch staff users",
                });
            }
    } catch (error) {
        const errorMsg = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
        type: STUDENTS_LIST_FAIL,
        payload: errorMsg
    });
    }

}

export const countStudents = () => async(dispatch, getState) => {
    try {
        dispatch({type: STUDENTS_COUNT_REQUEST});

        const { auth : { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
            withCredentials:true
        };       
        const { data } = await axios.get("/api/student/count", config);

        if (data.success) {
            dispatch({
                type: STUDENTS_COUNT_SUCCESS,
                payload: data.count, 
            });
        } else {
            dispatch({
                type: STUDENTS_COUNT_FAIL,
                payload: "Failed to count students",
            });
        }
    } catch (error) {
        const errorMsg = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
        type: STUDENTS_COUNT_FAIL,
        payload: errorMsg
    });
    
    }
}
