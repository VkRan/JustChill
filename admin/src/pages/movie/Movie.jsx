import { Link, useLocation, useNavigate } from "react-router-dom";
import "./movie.css";
import { Publish } from "@material-ui/icons";
import storage from "../../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useContext, useState } from "react";
import { updateMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";

export default function Movie() {
    const [movie, setmovie] = useState(useLocation().state);
    const { dispatch, error } = useContext(MovieContext);
    const [trailer, settrailer] = useState(null);
    const [video, setvideo] = useState(null);
    const [image, setimage] = useState(null);
    const [titleimage, settitleimage] = useState(null);
    const [thumbnailimage, setthumbnailimage] = useState(null);
    const [disable, setdisable] = useState(false);
    const [uploaded, setuploaded] = useState(1);
    const navigate = useNavigate();

    const handleUpload = (event) => {
        event.preventDefault();
        setdisable(true);
        upload([
            { file: image, label: "image" },
            { file: titleimage, label: "imageTitle" },
            { file: thumbnailimage, label: "imageSm" },
            { file: trailer, label: "trailer" },
            { file: video, label: "video" }
        ]);
    }

    const handleUpdate = (event) => {
        event.preventDefault();
        updateMovie(movie, dispatch);
        if (error)
            window.alert(error.message);
        else
            navigate("/movies");
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setmovie({ ...movie, [event.target.name]: value });
    }

    const handleSelect = (event) => {
        let value = false;
        if (event.target.value === "series") value = true;
        else value = false;
        setmovie({ ...movie, [event.target.name]: value });
    }

    const upload = (files) => {
        files.forEach((item) => {
            if (item.file !== null) {
                const fileName = new Date().getTime() + item.file.name + item.label;
                const storageRef = ref(storage, 'items/' + fileName);
                const uploadTask = uploadBytesResumable(storageRef, item.file);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                            default: break;
                        }
                    },
                    (error) => {
                        console.log(error.message, error.code);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setmovie(prev => { return { ...prev, [item.label]: downloadURL } });
                            setuploaded(prev => prev + 1);
                        });
                    }
                );
            }
            else setuploaded(prev => prev + 1);
        });
    }
    return (
        <div className="movie">
            <div className="movieTitleContainer">
                <h1 className="movieTitle">{movie.isSeries ? 'Series' : 'Movie'}</h1>
                <Link to="/newMovie">
                    <button className="movieAddButton">Create</button>
                </Link>
            </div>
            <div className="movieTop">
                <div className="movieTopRight">
                    <div className="movieInfoTop">
                        <img src={movie.image} />
                        <span className="movieName">{movie.title}</span>
                    </div>
                    <div className="movieInfoBottom">
                        <div className="movieInfoItem">
                            <span className="movieInfoKey">ID:</span>
                            <span className="movieInfoValue">{movie._id}</span>
                        </div>
                        <div className="movieInfoItem">
                            <span className="movieInfoKey">Genre:</span>
                            <span className="movieInfoValue">{movie.genre}</span>
                        </div>
                        <div className="movieInfoItem">
                            <span className="movieInfoKey">Year:</span>
                            <span className="movieInfoValue">{movie.year}</span>
                        </div>
                        <div className="movieInfoItem">
                            <span className="movieInfoKey">Limit:</span>
                            <span className="movieInfoValue">{movie.limit}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="movieBottom">
                <form className="movieForm">
                    <div className="movieFormLeft">
                        <label>Movie Title</label>
                        <input type="text" name="title" placeholder={movie.title ? movie.title : "Enter title"} onChange={handleChange} />
                        <label>Year</label>
                        <input type="text" name="year" placeholder={movie.year ? movie.year : "Enter year"} onChange={handleChange} />
                        <label>Genre</label>
                        <input type="text" name="genre" placeholder={movie.genre ? movie.genre : "Enter genre"} onChange={handleChange} />
                        <label>Limit</label>
                        <input type="text" name="limit" placeholder={movie.limit ? movie.limit : "Enter age limit"} onChange={handleChange} />
                        <label>Description</label>
                        <input type="text" name="description" placeholder={movie.description ? movie.description : "Enter description"} onChange={handleChange} />
                        <label>Type</label>
                        <select name="isSeries" defaultValue={movie.isSeries ? "series" : "movie"} onChange={handleSelect}>
                            <option value="movie">Movie</option>
                            <option value="series">Series</option>
                        </select>
                        <label>Trailer</label>
                        <input type="file" onChange={e => settrailer(e.target.files[0])} />
                        <label>Video</label>
                        <input type="file" onChange={e => setvideo(e.target.files[0])} />
                        <label>Title Image</label>
                        <input type="file" onChange={e => settitleimage(e.target.files[0])} />
                        <label>Image</label>
                        <input type="file" onChange={e => setimage(e.target.files[0])} />
                    </div>
                    <div className="movieFormRight">
                        <div className="movieUpload">
                            <img src={movie.imageSm} alt="" className="movieUploadImg" />
                            <label htmlFor="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} onChange={e => setthumbnailimage(e.target.files[0])} />
                        </div>
                        {
                            uploaded >= 5 ? <button className="addMovieButton" onClick={handleUpdate} >Update</button> : <button className="addMovieButton" onClick={handleUpload} disabled={disable}>Upload</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}
