import React, { useContext, useState } from 'react';
import { login } from '../../context/authContext/apiCalls';
import { AuthContext } from '../../context/authContext/AuthContext';
import "./login.scss";

const Login = () => {
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    const {isFetching, dispatch} = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        login({email, pass}, dispatch);
    }
    return (
        <div className="login">
            <div className="top">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/255px-Netflix_2015_logo.svg.png"
                    alt="" />
                {/* <button className="signBtn">Sign In</button> */}
            </div>
            <div className="content">
                <form>
                    <h1>Admin Sign In</h1>
                    <input type="email" placeholder="Email" onChange={(e)=>(setEmail(e.target.value))} />
                    <input type="password" placeholder="Password" onChange={(e)=>(setPass(e.target.value))} />
                    <button className="loginBtn" 
                        type="submit" 
                        onClick={handleLogin}
                        disabled={isFetching}
                    >
                        Sign In
                    </button>
                    {/* <span>
                        New to Netflix? <b>Sign up now.</b>
                    </span>
                    <small>
                        This page is protected by Google reCAPTCHA to ensure you're not a bot.
                        <b> Learn more</b>.
                    </small> */}
                </form>
            </div>
        </div>
    )
}

export default Login