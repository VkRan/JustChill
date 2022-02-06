import axios from "axios";
import {
    getMovieSuccess,
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
        const res = await axios.get("http://localhost:5000/api/movie", { withCredentials: true });
        dispatch(getMovieSuccess(res.data));
    } catch (err) {
        dispatch(getMovieFailure());
    }
};

//Creating a new movie
export const createMovie = async (movie, dispatch) => {
    dispatch(createMovieStart());
    try {
        const res = await axios.post("http://localhost:5000/api/movie", movie, { withCredentials: true });
        dispatch(createMovieSuccess(res.data));
    } catch (err) {
        dispatch(createMovieFailure());
    }
};

//Updating an existing movie
export const updateMovie = async (movie, dispatch) => {
    console.log("Hello");
    dispatch(updateMovieStart());
    console.log("World");
    try {
        const res = await axios.put("http://localhost:5000/api/movie/" + movie._id, movie, { withCredentials: true });
        dispatch(updateMovieSuccess(res.data));
        console.log("Success");
    } catch (err) {
        dispatch(updateMovieFailure());
    }
};

//Deleting an existing movie
export const deleteMovie = async (id, dispatch) => {
    dispatch(deleteMovieStart());
    try {
        await axios.delete("http://localhost:5000/api/movie/" + id, { withCredentials: true });
        dispatch(deleteMovieSuccess(id));
    } catch (err) {
        dispatch(deleteMovieFailure());
    }
};