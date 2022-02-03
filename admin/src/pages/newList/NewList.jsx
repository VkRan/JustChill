import "./newList.css";
import { useState, useContext, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { createList } from "../../context/listContext/apiCalls";
import { ListContext } from "../../context/listContext/ListContext";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { getMovie } from "../../context/movieContext/apiCalls";

export default function NewList() {
  const { dispatch, error } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie} = useContext(MovieContext);
  const [list, setList] = useState(null);
  const history = useNavigate();

  useEffect(()=>{
      getMovie(dispatchMovie);
  }, [dispatchMovie])

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  }

  const handleContent = (e) => {
    const value = Array.from(e.target.selectedOptions, (option)=>option.value);
    setList({...list, [e.target.name]: value});
  }

  const handleCreate = (event) => {
    event.preventDefault();
    createList(list,dispatch);
    if(error)
      window.alert("Fill in all the compulsory fields");
    else
      history("/list");
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Title*</label>
          <input type="text" placeholder="title" name="title" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Genre*</label>
          <input type="text" placeholder="genre" name="genre" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Type*</label>
          <select name="type" onChange={handleChange}>
            <option>Type</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Content</label>
          <select name="content" onChange={handleContent} multiple>
            {
              movies.map((movie)=>(
                <option key={movie._id} value={movie._id}>{movie.title}</option>
              ))
            }
          </select>
        </div>

        <button className="addProductButton" onClick={handleCreate}>
          Create
        </button>

      </form>
    </div>
  );
}
