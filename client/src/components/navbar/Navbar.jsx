import { ArrowDropDown, Notifications, Search } from '@mui/icons-material';
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import "./navbar.scss";
import Cookies from 'js-cookie';
import { AuthContext } from "../../authContext/AuthContext";

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const ClickHandler = async () => {
        Cookies.remove('AuthToken');
        window.location.reload();
    }

    const [isScrolled, setScrolled] = useState(false);
    window.onscroll = () => {
        setScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    }
    return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="left">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/255px-Netflix_2015_logo.svg.png" alt="" />
                    <Link to="/" className="link">
                        <span>Homepage</span>
                    </Link>
                    <Link to="/series" className="link">
                        <span className="mainLinks">Series</span>
                    </Link>
                    <Link to="/movie" className="link">
                        <span className="mainLinks">Movies</span>
                    </Link>
                    <span>New and Popular</span>
                    <span>My List</span>
                </div>
                <div className="right">
                    <Search className="icon" />
                    <span>KID</span>
                    <Notifications className="icon" />
                    <img src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" />
                    <div className="profile">
                        <ArrowDropDown className="icon" />
                        <div className="options">
                            <span className='OptionItems'>Settings</span>
                            {
                                user.isAdmin &&
                                <a href="https://google.com"><span className="OptionItems"> Admin Page </span></a>
                            }
                            <span className="OptionItems" onClick={ClickHandler}> Logout </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
