import axios from "axios";
import { HISTORY_CREATE_FAIL, 
    HISTORY_CREATE_REQUEST, 
    HISTORY_CREATE_SUCCESS, 
    HISTORY_UPDATE_FAIL, 
    HISTORY_UPDATE_REQUEST, 
    HISTORY_UPDATE_SUCCESS, 
    LIBRARY_HISTORY_FAIL, 
    LIBRARY_HISTORY_REQUEST, 
    LIBRARY_HISTORY_SUCCESS } from "../constants/library.constants";
import { toast } from "react-toastify";

export const listHistories = () => async(dispatch, getState) => {
    try {
        dispatch({type: LIBRARY_HISTORY_REQUEST})

        const {
                auth : { userInfo }
               } = getState();

        const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                },
                withCredentials:true
            };       

            const { data } = await axios.get("/api/library/history", config);
    
            if (data.success) {
                dispatch({
                    type: LIBRARY_HISTORY_SUCCESS,
                    payload: data.histories, 
                });
            } else {
                dispatch({
                    type: LIBRARY_HISTORY_FAIL,
                    payload: "Failed to fetch library history",
                });
            }
    } catch (error) {
        const errorMsg = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
        type: LIBRARY_HISTORY_FAIL,
        payload: errorMsg
    });
    }}

export const addNewLibraryHistory =  (formData) => async(dispatch, getState) =>{
    try {

        dispatch({type: HISTORY_CREATE_REQUEST});

        const { auth: {userInfo} } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                "Content-Type": "application/json" 
            },
            withCredentials:true
        };       

        console.log('Authorization token:', userInfo.token);

        const { data } = await axios.post("/api/library/history/new",formData,config);

         dispatch({type: HISTORY_CREATE_SUCCESS, payload: data});
        if(data.success){
            toast.success(data.message);
        }
    } catch (error) {
    const errorMsg = 
     error.response && error.response.data.message
    ? error.response.data.message
    : error.message;

    dispatch({type: HISTORY_CREATE_FAIL, payload: errorMsg})
    toast.error(errorMsg);
}}

export const libraryHistoryUpdation = (historyID, formData) => async(dispatch, getState) =>{
    try {
        dispatch({type: HISTORY_UPDATE_REQUEST});

        const { auth: {userInfo} } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                "Content-Type": "application/json" 
            },
            withCredentials:true
        };       
        const { data } = await axios.put(`/api/library/history/edit/${historyID}`,formData,config);

        dispatch({type: HISTORY_UPDATE_SUCCESS, payload: data});
        if(data.success){
            toast.success(data.message);
        }
        
    } catch (error) {
        const errorMsg = 
        error.response && error.response.data.message
       ? error.response.data.message
       : error.message;

       dispatch({type: HISTORY_UPDATE_FAIL, payload: errorMsg})
       toast.error(errorMsg);
       
    }}
