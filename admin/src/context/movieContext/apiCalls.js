import axios from "axios";
import { getMovieSuccess, getMovieFailure, getMovieStart, deleteMovieFailure, deleteMovieStart, deleteMovieSuccess } from "./MovieAction";

export const getMovie = async (dispatch) => {
    dispatch(getMovieStart());
    try {
        const res = await axios.get("movie");
        dispatch(getMovieSuccess(res.data));
    } catch (err) {
        console.log(err.message);
        dispatch(getMovieFailure());
    }
};

export const deleteMovie = async (id, dispatch) => {
    dispatch(deleteMovieStart());
    try {
        await axios.delete("movie/"+id);
        dispatch(deleteMovieSuccess(id));
    } catch (err) {
        console.log(err.message);
        dispatch(deleteMovieFailure());
    }
};