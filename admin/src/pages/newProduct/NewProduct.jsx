import "./newProduct.css";
import { useState, useContext } from 'react';
import storage from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { useNavigate } from "react-router";

export default function NewProduct() {
  const { dispatch, error } = useContext(MovieContext);
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  }

  const upload = (files) => {
    files.forEach(item => {
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
          });
        }
      );
    });
  }
  console.log(movie);

  const handleCreate = (event) => {
    event.preventDefault();
    createMovie(movie, dispatch);
    if(error)
      window.alert("Fill in all the compulsory fields");
    else
      navigate("/movies");
  }

  const handleUpload = (event) => {
    event.preventDefault();
    if (img && imgTitle && imgSm && trailer && video) {
      upload([
        { file: img, label: "image" },
        { file: imgTitle, label: "imageTitle" },
        { file: imgSm, label: "imageSm" },
        { file: trailer, label: "trailer" },
        { file: video, label: "video" }
      ]);
      setUploaded(true);
    }
    else {
      window.alert("Some files doesn't contain value");
    }
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="img" name="img"
            onChange={(e) => setImg(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Title Image</label>
          <input type="file" id="imgTitle" name="imgTitle"
            onChange={(e) => setImgTitle(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Thumbnail Image</label>
          <input type="file" id="imgSm" name="imgSm"
            onChange={(e) => setImgSm(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Title*</label>
          <input type="text" placeholder="title" name="title" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Description*</label>
          <input type="text" placeholder="description" name="description" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input type="text" placeholder="year" name="year" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" placeholder="genre" name="genre" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input type="text" placeholder="duration" name="duration" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input type="text" placeholder="limit" name="limit" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Is Series?</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input type="file" onChange={(e) => setTrailer(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input type="file" onChange={(e) => setVideo(e.target.files[0])} />
        </div>
        {
          uploaded ? <button className="addProductButton" onClick={handleCreate}>Create</button> : <button className="addProductButton" onClick={handleUpload}>Upload</button>
        }
      </form>
    </div>
  );
}
