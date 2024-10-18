import axios from "axios";
import { FEES_HISTORY_CREATE_FAIL, 
    FEES_HISTORY_CREATE_REQUEST, 
    FEES_HISTORY_CREATE_SUCCESS, 
    FEES_HISTORY_DELETE_FAIL, 
    FEES_HISTORY_DELETE_REQUEST, 
    FEES_HISTORY_DELETE_SUCCESS, 
    FEES_HISTORY_FAIL, 
    FEES_HISTORY_REQUEST, 
    FEES_HISTORY_SUCCESS, 
    FEES_HISTORY_UPDATE_FAIL, 
    FEES_HISTORY_UPDATE_REQUEST,
    FEES_HISTORY_UPDATE_SUCCESS} from "../constants/fees.constants";
import { toast } from "react-toastify";

export const listFeesHistories = () => async(dispatch, getState) => {
    try {
        dispatch({type: FEES_HISTORY_REQUEST})

        const {
                auth : { userInfo }
               } = getState();

        const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                },
                withCredentials:true
            };       

            const { data } = await axios.get("/api/fees/history", config);
    
            if (data.success) {
                dispatch({
                    type: FEES_HISTORY_SUCCESS,
                    payload: data.histories, 
                });
            } else {
                dispatch({
                    type: FEES_HISTORY_FAIL,
                    payload: "Failed to fetch fees history",
                });
            }
    } catch (error) {
        const errorMsg = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
        type: FEES_HISTORY_FAIL,
        payload: errorMsg
    });
    }}

    export const addNewFeesHistory =  (formData) => async(dispatch, getState) =>{
        try {
    
            dispatch({type: FEES_HISTORY_CREATE_REQUEST});
    
            const { auth: {userInfo} } = getState();
    
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                    "Content-Type": "application/json" 
                },
                withCredentials:true
            };       
    
            console.log('Authorization token:', userInfo.token);
    
            const { data } = await axios.post("/api/fees/history/new",formData,config);
    
             dispatch({type: FEES_HISTORY_CREATE_SUCCESS, payload: data});
            if(data.success){
                toast.success(data.message);
            }
        } catch (error) {
        const errorMsg = 
         error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    
        dispatch({type: FEES_HISTORY_CREATE_FAIL, payload: errorMsg})
        toast.error(errorMsg);
    }}
    
export const feesHistoryUpdation = (historyID, formData) => async(dispatch, getState) =>{
    try {
        dispatch({type: FEES_HISTORY_UPDATE_REQUEST});

        const { auth: {userInfo} } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                "Content-Type": "application/json" 
            },
            withCredentials:true
        };       
        const { data } = await axios.put(`/api/fees/history/edit/${historyID}`,formData,config);

        dispatch({type: FEES_HISTORY_UPDATE_SUCCESS, payload: data});
        if(data.success){
            toast.success(data.message);
        }
        
    } catch (error) {
        const errorMsg = 
        error.response && error.response.data.message
       ? error.response.data.message
       : error.message;

       dispatch({type: FEES_HISTORY_UPDATE_FAIL, payload: errorMsg})
       toast.error(errorMsg);
       
    }}
    
    export const deleteFeeHistory = (historyID) => async(dispatch, getState) => {
        try {
            dispatch({type: FEES_HISTORY_DELETE_REQUEST});
    
            const { auth: {userInfo} } = getState();
    
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
                withCredentials:true
            };       
    
            const { data } = await axios.delete(`/api/fees/history/delete/${historyID}`,config);
    
            dispatch({type: FEES_HISTORY_DELETE_SUCCESS,
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
    
           dispatch({type: FEES_HISTORY_DELETE_FAIL, payload: errorMsg})
           toast.error(errorMsg);
        }
     }  
    
    
   