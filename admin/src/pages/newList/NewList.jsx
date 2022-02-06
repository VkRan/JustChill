import "./newList.css";
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createList } from "../../context/listContext/apiCalls";
import { ListContext } from "../../context/listContext/ListContext";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { getMovie } from "../../context/movieContext/apiCalls";

export default function NewList() {
  const { dispatch, error } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
  const [list, setList] = useState({});
  const history = useNavigate();

  console.log(list);

  useEffect(() => {
    getMovie(dispatchMovie);
  }, [dispatchMovie])

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  }

  const handleContent = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    // const value2 = Array.from(e.target.selectedOptions, (option) => option.value.title)
    setList({ ...list, 'content': value });
    // setList({ ...list, 'movieNames': value2 });
  }

  const handleCreate = (event) => {
    event.preventDefault();
    createList(list, dispatch);
    if (error)
      window.alert("Fill in all the compulsory fields");
    else
      history("/list");
  }

  return (
    <div className="newList">
      <h1 className="addListTitle">New List</h1>
      <form className="addListForm">
        <div className="ListLeft">
          <div className="addListItem">
            <label>Title*</label>
            <input type="text" placeholder="title" name="title" onChange={handleChange} />
          </div>
          <div className="addListItem">
            <label>Genre</label>
            <input type="text" placeholder="genre" name="genre" onChange={handleChange} />
          </div>
          <div className="addListItem">
            <label>Type</label>
            <select name="type" defaultValue={"series"} onChange={handleChange}>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>
        <div className="ListRight">
          <div className="addListItem">
            <label>Content</label>
            <select className="ListContent" name="content" onChange={handleContent} multiple>
              {
                movies.map((movie) => (
                  <option key={movie._id} value={movie._id}>{movie.title}</option>
                ))
              }
            </select>
          </div>
        </div>


      </form>
      <button className="addListButton" onClick={handleCreate}>
        Create
      </button>
    </div>
  );
}
