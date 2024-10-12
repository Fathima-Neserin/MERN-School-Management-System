import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import axios from "axios";
import { USER_LOGIN_FAIL, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS } from "../constants/user.constants";

export const LOGIN = ({credentials, navigate}) => async (dispatch) => {
    try {        
        dispatch({ type: USER_LOGIN_REQUEST });
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const { data } = await axios.post("/api/auth/login", {
            username: credentials.username,
            password: credentials.password
        },
             config);
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        // const accessToken = data?.data?.token;
        // sessionStorage.setItem("Token", accessToken);
        // const accssID = data?.data?._id;
        // sessionStorage.setItem("ID", accssID);
    
        sessionStorage.setItem('userInfo', JSON.stringify(data));

        const role = data?.data?.role || [];
        let redirectPath = "/"; // Default redirect path

        if (role[0] === "Admin") {
            toast.success(`${credentials.username} logged in as Admin`);
            redirectPath = "/admin";
        } else if (role[0] === "Staff") {
            toast.success(`${credentials.username} logged in as Staff`);
            redirectPath = "/staff";
        } else if (role[0] === "Librarian") {
            toast.success(`${credentials.username} logged in as Librarian`);
            redirectPath = "/librarian";
        }

        // Ensure navigation happens after a short delay to allow toast to display
        setTimeout(() => {
            navigate(redirectPath); // Use navigate for redirection
        }, 1000);

    } catch (error) {
        const errorMsg = 
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({
            type: USER_LOGIN_FAIL,
            payload: errorMsg
        });
        toast.error(errorMsg); 
        navigate("/")
    }
}

export const LOGOUT = () => async (dispatch) => {
    sessionStorage.removeItem("userInfo");
    // sessionStorage.removeItem("Token");
    // sessionStorage.removeItem("ID");
}