import axios from "axios";
import { getMovieSuccess,
     getMovieFailure,
     getMovieStart, 
     createMovieSuccess, 
     createMovieFailure, 
     createMovieStart, 
     deleteMovieFailure, 
     deleteMovieStart, 
     deleteMovieSuccess,
     updateMovieFailure,
     updateMovieSuccess,
     updateMovieStart
} from "./MovieAction";

//Fetching movies
export const getMovie = async (dispatch) => {
    dispatch(getMovieStart());
    try {
        const res = await axios.get("movie");
        dispatch(getMovieSuccess(res.data));
    } catch (err) {
        dispatch(getMovieFailure());
    }
};

export const getMovie2 = async (dispatch) => {
    dispatch(getMovieStart());
    try {
        const res = await axios.get("../movie");
        dispatch(getMovieSuccess(res.data));
    } catch (err) {
        dispatch(getMovieFailure());
    }
};

//Creating a new movie
export const createMovie = async (movie, dispatch) => {
    dispatch(createMovieStart());
    try {
        const res = await axios.post("movie", movie);
        dispatch(createMovieSuccess(res.data));
    } catch (err) {
        dispatch(createMovieFailure());
    }
};

//Updating a new movie
export const updateMovie = async (movie, dispatch) => {
    dispatch(updateMovieStart());
    try {
        const res = await axios.put("movie/"+movie._id, movie);
        dispatch(updateMovieSuccess(res.data));
    } catch (err) {
        dispatch(updateMovieFailure());
    }
};

//Deleting an existing movie
export const deleteMovie = async (id, dispatch) => {
    dispatch(deleteMovieStart());
    try {
        await axios.delete("movie/"+id);
        dispatch(deleteMovieSuccess(id));
    } catch (err) {
        dispatch(deleteMovieFailure());
    }
};