import axios from "axios";
import { loginSuccess, loginFailure, loginStart } from "./AuthAction";

export const login = async (user, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:5000/auth/login", user);
        if (res.data.isAdmin)
            dispatch(loginSuccess(res.data));
        else
            dispatch(loginFailure());
    } catch (err) {
        dispatch(loginFailure());
    }
};