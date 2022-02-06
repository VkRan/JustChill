import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import MovieList from "./pages/movieList/MovieList";
import Movie from "./pages/movie/Movie";
import ListList from "./pages/listList/ListList";
import NewMovie from "./pages/newMovie/NewMovie";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import NewList from "./pages/newList/NewList";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      {user ?
        <div>
          <Topbar />
          <div className="container">
            <Sidebar />
            <Routes>
              <Route exact path="/login" element={user ? <Navigate to="/" /> : <Login />} />
              <Route exact path="/" element={<Home />} />
              <Route exact path="/users" element={<UserList />} />
              <Route exact path="/user/:userId" element={<User />} />
              <Route exact path="/newUser" element={<NewUser />} />
              <Route exact path="/movies" element={<MovieList />} />
              <Route exact path="/movies/:moviesId" element={<Movie />} />
              <Route exact path="/newMovie" element={<NewMovie />} />
              <Route exact path="/list" element={<ListList />} />
              <Route exact path="/list/:listId" element={<List />} />
              <Route exact path="/newList" element={<NewList />} />
            </Routes>
          </div>
        </div>
        : <Login />
      }
    </Router >
  );
}

export default App;
