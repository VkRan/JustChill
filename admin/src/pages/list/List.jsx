import { Link, useLocation, useNavigate } from "react-router-dom";
import "./list.css";
import { updateList } from "../../context/listContext/apiCalls";
import { useState, useContext, useEffect } from "react";
import { ListContext } from "../../context/listContext/ListContext";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { getMovie2 } from "../../context/movieContext/apiCalls";

export default function List() {
    const location = useLocation();
    const listItem = location.state;
    const { dispatch, error } = useContext(ListContext);
    const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
    const [list, setList] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getMovie2(dispatchMovie);
    }, [dispatchMovie])

    const handleChange = (e) => {
        const value = e.target.value;
        setList({ ...list, [e.target.name]: value });
    }

    useEffect(() => {
        setList({ ...list, id: listItem._id })
    }, [])

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
            navigate(-1);
    }

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">List</h1>
                <Link to="/newList">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <span className="productName">{listItem.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">ID:</span>
                            <span className="productInfoValue">{listItem._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Genre:</span>
                            <span className="productInfoValue">{listItem.genre}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Type:</span>
                            <span className="productInfoValue">{listItem.type}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Name:</span>
                            <span className="productInfoValue">
                                {
                                    listItem.content.map((item) => (
                                        <div>{item}</div>
                                    ))
                                }
                            </span>
                        </div>

                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>List Title</label>
                        <input type="text" name="title" placeholder={listItem.title ? listItem.title : "Enter list title"} onChange={handleChange} />
                        <label>Genre</label>
                        <input type="text" name="genre" placeholder={listItem.genre ? listItem.genre : "Enter genre"} onChange={handleChange} />
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
                    <div className="productFormRight">
                        <button className="productButton" onClick={handleUpdate}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
