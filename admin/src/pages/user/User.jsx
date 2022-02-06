import {
  CalendarToday,
  MailOutline,
  PermIdentity,
  Publish,
} from "@material-ui/icons";
import storage from "../../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import "./user.css";
import { updateUser } from "../../context/userContext/apiCalls";
import { UserContext } from "../../context/userContext/UserContext";

export default function User() {
  const location = useLocation();
  const [user, setUser] = useState(location.state);
  const { dispatch, error } = useContext(UserContext);
  const [profilePicture, setprofilePicture] = useState(null);
  const [disable, setdisable] = useState(false);
  const [uploaded, setUploaded] = useState(0);

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    setdisable(true);
    upload([{
      file: profilePicture,
      label: "profilePicture"
    }]);
  }

  console.log(uploaded);

  const runUpdate = (e) => {
    e.preventDefault();
    updateUser(user, dispatch);
    setTimeout(() => {
      
    }, timeout);
    if (error)
      window.alert("Fill in all the compulsory fields!");
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
              setUser(prev => { return { ...prev, [item.label]: downloadURL } });
              setUploaded(prev => prev + 1);
            });
          }
        );
      }
      else setUploaded(prev => prev + 1);
    });
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user.profilePicture ? user.profilePicture : "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.userName}</span>
              <span className="userShowUserTitle">{user.firstName + " " + user.lastName}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">Admin: {user.isAdmin ? "Yes" : "No"}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{user.createdAt.split('T')[0]}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={user.userName}
                  className="userUpdateInput"
                  name="userName"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder={user.firstName}
                  className="userUpdateInput"
                  name="firstName"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder={user.lastName}
                  className="userUpdateInput"
                  name="lastName"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={user.email}
                  className="userUpdateInput"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Admin</label>
                <select name="isAdmin" defaultValue={user.isAdmin ? "true" : "false"} onChange={handleChange}>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={user.profilePicture ? user.profilePicture : "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" onChange={e => setprofilePicture(e.target.files[0])} style={{ display: "none" }} />
              </div>
              {uploaded < 1 ? <button className="userUpdateButton" onClick={handleUpdate} disabled={disable}>Upload Files</button> : <button className="userUpdateButton" onClick={runUpdate}>Update Profile</button>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
