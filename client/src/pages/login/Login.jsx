import React from 'react';
import "./login.scss";
import axios from "axios";

const Login = () => {

    async function handleClick(e) {
        e.preventDefault();
        try {
            const data = { email: 'rockstark12345@gmail.com', password: 'Qwerty37*' };
            const response = await axios.post('auth/login', data, { withCredentials: true });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="login">
            <div className="top">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/255px-Netflix_2015_logo.svg.png"
                    alt="" />
                <button className="signBtn">Sign In</button>
            </div>
            <div className="content">
                <form onSubmit={handleClick}>
                    <h1>Sign In</h1>
                    <input type="email" placeholder="Email or phone number" />
                    <input type="password" placeholder="Password" />
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
