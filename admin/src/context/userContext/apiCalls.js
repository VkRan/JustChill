import axios from "axios";
import {
    getUserSuccess,
    getUserFailure,
    getUserStart,
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    updateUserFailure,
    updateUserSuccess,
    updateUserStart
} from "./UserAction";

//Fetching users
export const getUser = async (dispatch) => {
    dispatch(getUserStart());
    try {
        const res = await axios.get("http://localhost:5000/api/user", { withCredentials: true });
        dispatch(getUserSuccess(res.data));
    } catch (err) {
        dispatch(getUserFailure());
    }
};

//Updating an existing user
export const updateUser = async (user, dispatch) => {
    dispatch(updateUserStart());
    try {
        const res = await axios.put("http://localhost:5000/api/user/" + user._id, user, { withCredentials: true });
        dispatch(updateUserSuccess(res.data));
    } catch (err) {
        dispatch(updateUserFailure());
    }
};

//Deleting an existing user
export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
        await axios.delete("http://localhost:5000/api/user/" + id, { withCredentials: true });
        dispatch(deleteUserSuccess(id));
    } catch (err) {
        dispatch(deleteUserFailure());
    }
};