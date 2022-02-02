import { Link, useLocation } from "react-router-dom";
import "./list.css";
import { Publish } from "@material-ui/icons";

export default function List() {
    const location = useLocation();
    const listItem = location.state;
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/newlist">
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
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>List Title</label>
                  <input type="text" placeholder={listItem.title?listItem.title:"Enter list title"} />
                  <label>Genre</label>
                  <input type="text" placeholder={listItem.genre?listItem.genre:"Enter genre"} />
                  <label>Type</label>
                  <input type="text" placeholder={listItem.type?listItem.type:"Enter type"} />
                  
              </div>
              <div className="productFormRight">
                  <button className="productButton">Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
