import axios from "axios";
import { getListSuccess, 
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
        const res = await axios.get("/list");
        dispatch(getListSuccess(res.data));
    } catch (err) {
        dispatch(getListFailure());
    }
};

//Creating a new list
export const createList = async (list, dispatch) => {
    dispatch(createListStart());
    try {
        const res = await axios.post("/list", list);
        dispatch(createListSuccess(res.data));
    } catch (err) {
        dispatch(createListFailure());
    }
};

//Updating a list
export const updateList = async (list, dispatch) => {
    dispatch(updateListStart());
    try {
        const res = await axios.put("/list/"+list.id, list);
        dispatch(updateListSuccess(res.data));
    } catch (err) {
        dispatch(updateListFailure());
    }
};

//Deleting an existing list
export const deleteList = async (id, dispatch) => {
    dispatch(deleteListStart());
    try {
        await axios.delete("/list/"+id);
        dispatch(deleteListSuccess(id));
    } catch (err) {
        dispatch(deleteListFailure());
    }
};