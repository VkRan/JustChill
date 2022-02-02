import axios from "axios";
import { getListSuccess, getListFailure, getListStart, createListSuccess, createListFailure, createListStart, deleteListFailure, deleteListStart, deleteListSuccess } from "./ListAction";

//Fetching movies
export const getList = async (dispatch) => {
    dispatch(getListStart());
    try {
        const res = await axios.get("/list");
        dispatch(getListSuccess(res.data));
    } catch (err) {
        dispatch(getListFailure());
    }
};

// //Creating a new movie
// export const createMovie = async (movie, dispatch) => {
//     dispatch(createMovieStart());
//     try {
//         const res = await axios.post("movie", movie);
//         dispatch(createMovieSuccess(res.data));
//     } catch (err) {
//         dispatch(createMovieFailure());
//     }
// };

//Deleting an existing movie
export const deleteList = async (id, dispatch) => {
    dispatch(deleteListStart());
    try {
        await axios.delete("/list/"+id);
        dispatch(deleteListSuccess(id));
    } catch (err) {
        dispatch(deleteListFailure());
    }
};