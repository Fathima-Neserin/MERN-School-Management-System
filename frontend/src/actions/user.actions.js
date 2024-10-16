import { toast } from "react-toastify";
import { 
    LIBRARIANS_COUNT_FAIL,
    LIBRARIANS_COUNT_REQUEST,
    LIBRARIANS_COUNT_SUCCESS,
    LIBRARIANS_LIST_FAIL, 
    LIBRARIANS_LIST_REQUEST, 
    LIBRARIANS_LIST_SUCCESS, 
    STAFFS_COUNT_FAIL, 
    STAFFS_COUNT_REQUEST, 
    STAFFS_COUNT_SUCCESS, 
    STAFFS_LIST_FAIL, 
    STAFFS_LIST_REQUEST, 
    STAFFS_LIST_SUCCESS,
    USER_CREATE_FAIL,
    USER_CREATE_REQUEST,
    USER_CREATE_SUCCESS,
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS, 
     } 
from "../constants/user.constants";
import axios from 'axios';

export const listStaffs = () => async(dispatch, getState) => {
    try {
        dispatch({type: STAFFS_LIST_REQUEST})

        const {
                auth : { userInfo }
               } = getState();

        const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                },
                withCredentials:true
            };       

            const { data } = await axios.get("/api/user/staff", config);
    
            if (data.success) {
                dispatch({
                    type: STAFFS_LIST_SUCCESS,
                    payload: data.staffs, 
                });
            } else {
                dispatch({
                    type: STAFFS_LIST_FAIL,
                    payload: "Failed to fetch staff users",
                });
            }
    } catch (error) {
        const errorMsg = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
        type: STAFFS_LIST_FAIL
        ,
        payload: errorMsg
    });
    }

}

export const listLibrarians = () => async(dispatch, getState) => {
    try {
        dispatch({type: LIBRARIANS_LIST_REQUEST})

        const { auth : { userInfo } } = getState();

        const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                },
                withCredentials:true
            };       

            const { data } = await axios.get("/api/user/librarian", config);

            if (data.success) {
                dispatch({
                    type: LIBRARIANS_LIST_SUCCESS,
                    payload: data.librarians, 
                });
            } else {
                dispatch({
                    type: LIBRARIANS_LIST_FAIL,
                    payload: "Failed to fetch librarian users",
                });
            }
    } catch (error) {
        const errorMsg = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
        type: LIBRARIANS_LIST_FAIL,
        payload: errorMsg
    });
    }}

export const countStaffUsers = () => async(dispatch, getState) => {
    try {
        dispatch({type: STAFFS_COUNT_REQUEST});

        const { auth : { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
            withCredentials:true
        };       
        const { data } = await axios.get("/api/user/count/staff", config);

        if (data.success) {
            dispatch({
                type: STAFFS_COUNT_SUCCESS,
                payload: data.count, 
            });
        } else {
            dispatch({
                type: STAFFS_COUNT_FAIL,
                payload: "Failed to count staff users",
            });
        }
    } catch (error) {
        const errorMsg = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
        type: STAFFS_COUNT_FAIL,
        payload: errorMsg
    });
    
    }
}


export const countLibrarianUsers = () => async(dispatch, getState) => {
    try {
        dispatch({type: LIBRARIANS_COUNT_REQUEST});

        const { auth : { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
            withCredentials:true
        };       
        const { data } = await axios.get("/api/user/count/librarian", config);

        if (data.success) {
            dispatch({
                type: LIBRARIANS_COUNT_SUCCESS,
                payload: data.count, 
            });
        } else {
            dispatch({
                type: LIBRARIANS_COUNT_FAIL,
                payload: "Failed to count staff users",
            });
        }
    } catch (error) {
        const errorMsg = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
        type: LIBRARIANS_COUNT_FAIL,
        payload: errorMsg
    });
    
    }
}

export const createNewUserAction =  (formData) => async(dispatch, getState) =>{
        try {
            // console.log("Form Data being sent:", formData); 

            dispatch({type: USER_CREATE_REQUEST});

            const { auth: {userInfo} } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                    "Content-Type": "application/json" 
                },
                withCredentials:true
            };       
            console.log("Form Data being sent:", formData);

            console.log('Authorization token:', userInfo.token);

            const { data } = await axios.post("/api/user/newUser",formData,config);

             dispatch({type: USER_CREATE_SUCCESS, payload: data});
            if(data.success){
                toast.success(data.message);
            }
        } catch (error) {
            // console.error("Error in creating user:", error); 
        const errorMsg = 
         error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

        dispatch({type: USER_CREATE_FAIL, payload: errorMsg})
        toast.error(errorMsg);
    }}

 export const existingUserUpdation = (userId, formData) => async(dispatch, getState) =>{
        try {
            dispatch({type: USER_UPDATE_REQUEST});

            const { auth: {userInfo} } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                    "Content-Type": "application/json" 
                },
                withCredentials:true
            };       
            const { data } = await axios.put(`/api/user/edit/${userId}`,formData,config);

            dispatch({type: USER_UPDATE_SUCCESS, payload: data});
            if(data.success){
                toast.success(data.message);
            }
            
        } catch (error) {
            const errorMsg = 
            error.response && error.response.data.message
           ? error.response.data.message
           : error.message;
   
           dispatch({type: USER_UPDATE_FAIL, payload: errorMsg})
           toast.error(errorMsg);
           
        }
    }

 export const deleteExistingUserAction = (userId) => async(dispatch, getState) => {
    try {
        dispatch({type: USER_DELETE_REQUEST});

        const { auth: {userInfo} } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
            withCredentials:true
        };       

        const { data } = await axios.delete(`/api/user/remove/${userId}`,config);

        dispatch({type: USER_DELETE_SUCCESS,
            payload: data
        })
        if(data.success){
            toast.success(data.message);
        }
    } catch (error) {
        const errorMsg = 
        error.response && error.response.data.message
       ? error.response.data.message
       : error.message;

       dispatch({type: USER_DELETE_FAIL, payload: errorMsg})
       toast.error(errorMsg);
    }
 }  