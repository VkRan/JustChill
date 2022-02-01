import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/authContext/AuthContext";
import Cookies from "js-cookie";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

function App() {
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const temp = Cookies.get('AuthToken');
    console.log("temp: ", temp);
  }, []);

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
              <Route exact path="/product/:productId" element={<Product />} />
              <Route exact path="/newproduct" element={<NewProduct />} />
            </Routes>
          </div>
        </div>
        : <Login />
      }
    </Router >
  );
}

export default App;
