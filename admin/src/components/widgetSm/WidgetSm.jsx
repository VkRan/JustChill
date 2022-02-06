import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([]);
  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get('/user?new=true');
        setNewUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getNewUsers();
  }, [])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {
          newUsers.map((user, i) => (
            <li key={i} className="widgetSmListItem">
              <img
                src={user.profilePicture || "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"}
                alt=""
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.userName}</span>
              </div>
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </li>
          ))
        }

      </ul>
    </div>
  );
}
