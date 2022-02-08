import axios from "axios";
import { loginSuccess, loginFailure, loginStart, registerSuccess, registerFailure, registerStart } from "./AuthAction";

export const loginUser = async (user, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:5000/api/auth/login", user, { withCredentials: true });
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};

export const registerUser = async (user, dispatch) => {
    dispatch(registerStart());
    try {
        const res = await axios.post("http://localhost:5000/api/auth/createUser", user, { withCredentials: true });
        dispatch(registerSuccess(res.data));
    } catch (err) {
        dispatch(registerFailure());
    }
};