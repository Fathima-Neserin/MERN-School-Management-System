import axios from "axios";
import { LIBRARY_HISTORY_FAIL, LIBRARY_HISTORY_REQUEST, LIBRARY_HISTORY_SUCCESS } from "../constants/library.constants";

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
    }

}
