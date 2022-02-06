import { Link, useLocation, useNavigate } from "react-router-dom";
import "./list.css";
import { updateList } from "../../context/listContext/apiCalls";
import { useState, useContext, useEffect } from "react";
import { ListContext } from "../../context/listContext/ListContext";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { getMovie } from "../../context/movieContext/apiCalls";

export default function List() {
    const [list, setList] = useState(useLocation().state);
    const { dispatch, error } = useContext(ListContext);
    const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
    const navigate = useNavigate();

    useEffect(() => {
        getMovie(dispatchMovie);
    }, [dispatchMovie])

    const handleChange = (e) => {
        const value = e.target.value;
        setList({ ...list, [e.target.name]: value });
    }

    const handleContent = (e) => {
        const value = Array.from(e.target.selectedOptions, (option) => option.value);
        setList({ ...list, [e.target.name]: value });
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        updateList(list, dispatch);
        if (error)
            window.alert("Fill in all the compulsory fields");
        else
            navigate("/list");
    }

    console.log(list);
    return (
        <div className="list">
            <div className="listTitleContainer">
                <h1 className="listTitle">List</h1>
                <Link to="/newList">
                    <button className="listAddButton">Create</button>
                </Link>
            </div>
            <div className="listTop">
                <div className="listTopRight">
                    <div className="listInfoTop">
                        <span className="listName">{list.title}</span>
                    </div>
                    <div className="listInfoBottom">
                        <div className="listInfoItem">
                            <span className="listInfoKey">ID:</span>
                            <span className="listInfoValue">{list._id}</span>
                        </div>
                        <div className="listInfoItem">
                            <span className="listInfoKey">Genre:</span>
                            <span className="listInfoValue">{list.genre}</span>
                        </div>
                        <div className="listInfoItem">
                            <span className="listInfoKey">Type:</span>
                            <span className="listInfoValue">{list.type}</span>
                        </div>
                        <div className="listInfoItem">
                            <span className="listInfoKey">Name:</span>
                            <span className="listInfoValue">
                                {
                                    list.content.map((listItem) => (
                                        <div key={listItem._id}>{listItem}</div>
                                    ))
                                }
                            </span>
                        </div>

                    </div>
                </div>
            </div>
            <div className="listBottom">
                <form className="listForm">
                    <div className="listFormLeft">

                        <label>List Title</label>
                        <input type="text" name="title" placeholder={list.title ? list.title : "Enter list title"} onChange={handleChange} />
                        <label>Genre</label>
                        <input type="text" name="genre" placeholder={list.genre ? list.genre : "Enter genre"} onChange={handleChange} />
                        <label>Type</label>
                        <select name="type" onChange={handleChange}>
                            <option>Type</option>
                            <option value="movie">Movie</option>
                            <option value="series">Series</option>
                        </select>
                        <label>Content</label>
                        <select name="content" onChange={handleContent} multiple>
                            {
                                movies.map((movie) => (
                                    <option key={movie._id} value={movie._id}>{movie.title}</option>
                                ))
                            }
                        </select>

                    </div>
                    <div className="listFormRight">
                        <button className="listButton" onClick={handleUpdate}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
