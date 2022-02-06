import "./newMovie.css";
import { useState, useContext } from 'react';
import storage from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { useNavigate } from "react-router";

export default function NewMoive() {
  const { dispatch, error } = useContext(MovieContext);
  const [movie, setMovie] = useState({});
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [disable, setdisable] = useState(false);
  const [uploaded, setUploaded] = useState(1);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  }

  const handleSelect = (event) => {
    let value = false;
    if (event.target.value === "series") value = true;
    else value = false;
    setMovie({ ...movie, [event.target.name]: value });
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
              setMovie(prev => { return { ...prev, [item.label]: downloadURL } });
              setUploaded(prev => prev + 1);
            });
          }
        );
      }
      else setUploaded(prev => prev + 1);
    });
  }

  console.log(movie);

  const handleCreate = (event) => {
    event.preventDefault();
    createMovie(movie, dispatch);
    if (error)
      window.alert("Fill in all the compulsory fields");
    else
      navigate("/movies");
  }

  const handleUpload = (event) => {
    event.preventDefault();
    setdisable(true);
    upload([
      { file: img, label: "image" },
      { file: imgTitle, label: "imageTitle" },
      { file: imgSm, label: "imageSm" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" }
    ]);
  }

  return (
    <div className="newMovie">
      <h1 className="addnewMovieTitle">New Movie</h1>
      <form className="addnewMovieForm">
        <div className="addnewMovieItem">
          <label>Image*</label>
          <input type="file" id="img" name="img"
            onChange={(e) => setImg(e.target.files[0])} />
        </div>
        <div className="addnewMovieItem">
          <label>Title Image</label>
          <input type="file" id="imgTitle" name="imgTitle"
            onChange={(e) => setImgTitle(e.target.files[0])} />
        </div>
        <div className="addnewMovieItem">
          <label>Thumbnail Image</label>
          <input type="file" id="imgSm" name="imgSm"
            onChange={(e) => setImgSm(e.target.files[0])} />
        </div>
        <div className="addnewMovieItem">
          <label>Title*</label>
          <input type="text" placeholder="title" name="title" onChange={handleChange} />
        </div>
        <div className="addnewMovieItem">
          <label>Description*</label>
          <input type="text" placeholder="description" name="description" onChange={handleChange} />
        </div>
        <div className="addnewMovieItem">
          <label>Year</label>
          <input type="text" placeholder="year" name="year" onChange={handleChange} />
        </div>
        <div className="addnewMovieItem">
          <label>Genre</label>
          <input type="text" placeholder="genre" name="genre" onChange={handleChange} />
        </div>
        <div className="addnewMovieItem">
          <label>Duration</label>
          <input type="text" placeholder="duration" name="duration" onChange={handleChange} />
        </div>
        <div className="addnewMovieItem">
          <label>Limit</label>
          <input type="text" placeholder="limit" name="limit" onChange={handleChange} />
        </div>
        <div className="addnewMovieItem">
          <label>Type</label>
          <select name="isSeries" defaultValue={"series"} onChange={handleSelect}>
            <option value="series">Series</option>
            <option value="movie">Movie</option>
          </select>
        </div>
        <div className="addnewMovieItem">
          <label>Trailer</label>
          <input type="file" onChange={(e) => setTrailer(e.target.files[0])} />
        </div>
        <div className="addnewMovieItem">
          <label>Video</label>
          <input type="file" onChange={(e) => setVideo(e.target.files[0])} />
        </div>
      </form>
      {
        uploaded >= 5 ? <button className="addnewMovieButton" onClick={handleCreate}>Create</button> : <button className="addnewMovieButton" onClick={handleUpload} disabled={disable}>Upload</button>
      }
    </div>
  );
}
