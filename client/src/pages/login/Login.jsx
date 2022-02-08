import React, { useContext, useState } from 'react';
import "./login.scss";
import { AuthContext } from '../../authContext/AuthContext';
import { loginUser } from '../../authContext/apiCalls';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { dispatch, error } = useContext(AuthContext);
    const history = useNavigate();

    async function handleClick(e) {
        e.preventDefault();
        loginUser({ email, password }, dispatch);
        if (error)
            window.alert("Fill in all the compulsory fields");
        else
           window.location.reload();
    }

    const handleRegister = (e)=> {
        e.preventDefault();
        history("/register");
    }

    return (
        <div className="login">
            <div className="top">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/255px-Netflix_2015_logo.svg.png"
                    alt="" />
                <button className="signBtn" onClick={handleRegister}>Register Now</button>
            </div>
            <div className="content">
                <form onSubmit={handleClick}>
                    <h1>Sign In</h1>
                    <input type="email" placeholder="Email or phone number" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button className="loginBtn" type="submit">Sign In</button>
                    <span>
                        New to Netflix? <b>Sign up now.</b>
                    </span>
                    <small>
                        This page is protected by Google reCAPTCHA to ensure you're not a bot.
                        <b> Learn more</b>.
                    </small>
                </form>
            </div>
        </div>
    )
}

export default Login
