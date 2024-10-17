import axios from "axios";
import { FEES_HISTORY_FAIL, FEES_HISTORY_REQUEST, FEES_HISTORY_SUCCESS } from "../constants/fees.constants";

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
