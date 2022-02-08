import React, { useContext } from "react";
import Home from "./pages/home/Home";
import "./app.scss";
import Watch from "./pages/watch/Watch";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { AuthContext } from "./authContext/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route exact path="/register" element={user ? <Home /> : <Register />} />
        <Route exact path="/login" element={user ? <Home /> : <Login />} />
        {user ?
          <>
            <Route exact path="/" element={user ? <Home /> : <Register />} />
            <Route path="/movie" element={<Home type="movie" />} />
            <Route path="/series" element={<Home type="series" />} />
            <Route path="/watch" element={<Watch />} />
            <Route path="*" element={<>
              <div>
                <h1>404 Not Found</h1>
              </div>
            </>} />
          </>
          : <Route path="*" element={<Login />} />}
      </Routes>
    </Router>
  )
};

export default App;