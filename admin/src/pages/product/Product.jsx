import { Link, useLocation } from "react-router-dom";
import "./product.css";
import { Publish } from "@material-ui/icons";

export default function Product() {
    const location = useLocation();
    const movie = location.state;
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">{movie.isSeries? 'Series' : 'Movie'}</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={movie.image} />
                  <span className="productName">{movie.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">ID:</span>
                      <span className="productInfoValue">{movie._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Genre:</span>
                      <span className="productInfoValue">{movie.genre}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Year:</span>
                      <span className="productInfoValue">{movie.year}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Limit:</span>
                      <span className="productInfoValue">{movie.limit}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Movie Title</label>
                  <input type="text" placeholder={movie.title?movie.title:"Enter title"} />
                  <label>Year</label>
                  <input type="text" placeholder={movie.year?movie.year:"Enter year"} />
                  <label>Genre</label>
                  <input type="text" placeholder={movie.genre?movie.genre:"Enter genre"} />
                  <label>Limit</label>
                  <input type="text" placeholder={movie.limit?movie.limit:"Enter age limit"} />
                  <label>Trailer</label>
                  <input type="file" placeholder={movie.trailer?movie.trailer:"Insert trailer"} />
                  <label>Video</label>
                  <input type="file" placeholder={movie.video?movie.video:"Insert video"} />
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={movie.image} alt="" className="productUploadImg" />
                      <label htmlFor="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button className="productButton">Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
