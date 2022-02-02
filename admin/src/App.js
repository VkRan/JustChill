import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import MovieList from "./pages/movieList/MovieList";
import NewProduct from "./pages/newProduct/NewProduct";
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
              <Route exact path="/movies" element={<ProductList />} />
              <Route exact path="/movies/:moviesId" element={<Product />} />
              <Route exact path="/newproduct" element={<NewProduct />} />
              <Route exact path="/list" element={<MovieList />} />
              <Route exact path="/list/:listId" element={<List />} />
              <Route exact path="/newList" element={<NewProduct />} />
            </Routes>
          </div>
        </div>
        : <Login />
      }
    </Router >
  );
}

export default App;
