import axios from "axios";
import {
    getListSuccess,
    getListFailure,
    getListStart,
    createListSuccess,
    createListFailure,
    createListStart,
    deleteListFailure,
    deleteListStart,
    deleteListSuccess,
    updateListFailure,
    updateListStart,
    updateListSuccess
} from "./ListAction";

//Fetching lists
export const getList = async (dispatch) => {
    dispatch(getListStart());
    try {
        const res = await axios.get("http://localhost:5000/api/list", { withCredentials: true });
        dispatch(getListSuccess(res.data));
    } catch (err) {
        dispatch(getListFailure());
    }
};

//Creating a new list
export const createList = async (list, dispatch) => {
    dispatch(createListStart());
    try {
        const res = await axios.post("http://localhost:5000/api/list", list, { withCredentials: true });
        dispatch(createListSuccess(res.data));
    } catch (err) {
        dispatch(createListFailure());
    }
};

//Updating a list
export const updateList = async (list, dispatch) => {
    dispatch(updateListStart());
    try {
        const res = await axios.put("http://localhost:5000/api/list/" + list._id, list, { withCredentials: true });
        dispatch(updateListSuccess(res.data));
    } catch (err) {
        dispatch(updateListFailure());
    }
};

//Deleting an existing list
export const deleteList = async (id, dispatch) => {
    dispatch(deleteListStart());
    try {
        await axios.delete("http://localhost:5000/api/list/" + id, { withCredentials: true });
        dispatch(deleteListSuccess(id));
    } catch (err) {
        dispatch(deleteListFailure());
    }
};