import axios from "axios";
import { loginSuccess, loginFailure, loginStart} from "./AuthAction";

export const login = async (user, dispatch) => {
    dispatch(loginStart());
    try{
        console.log("user: ", user);
        const res = await axios.post("auth/login", user);
        console.log(res.data);
        if(res.data.isAdmin)
            dispatch(loginSuccess(res.data));
        else
            dispatch(loginFailure);
    } catch (err) {
        console.log(err.message);
        dispatch(loginFailure);
    }
};