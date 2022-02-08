import React, { useContext, useState } from 'react';
import "./register.scss";
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../authContext/apiCalls';
import { AuthContext } from '../../authContext/AuthContext';

const Register = () => {
    const { dispatch, error } = useContext(AuthContext);
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const handleSignIn = () => {
        navigate("/login");
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setUser({ ...user, [e.target.name]: value });
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        registerUser(user, dispatch);
        if (error)
            window.alert("Fill in all the compulsory fields");
        else
           window.location.reload();
    }
    return (
        <div className="register">
            <div className="top">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/255px-Netflix_2015_logo.svg.png"
                    alt="" />
                <button className="signBtn" onClick={handleSignIn}>Sign In</button>
            </div>
            <div className="content">
                <h1>Unlimited movies, TV shows, and more.</h1>
                <h2>Watch anywhere. Cancel anytime</h2>
                <p>Ready to watch? Enter your email to create or restart your membership.</p>
                {/* {!email ? (
                    <div className="mail">
                        <input type="email" placeholder="email address" ref={emailRef} />
                        <input type="text" placeholder="first name" ref={firstNameRef} />
                        <input type="text" placeholder="last name" ref={lastNameRef} />
                        <button className="registerBtn" onClick={handleStart}>Get Started</button>
                    </div>
                ) : (
                    <form className="mail">
                        <input type="text" placeholder="user name" ref={userNameRef} />
                        <input type="password" placeholder="password" ref={passwordRef} />
                        <button className="registerBtn" onClick={handleFinish}>Start</button>
                    </form>
                )} */}


                <div className="registerForm">
                    <div className="name">
                        <input type="text" className="firstName" name="firstName" placeholder="First Name" onChange={handleChange} />
                        <input type="text" className="lastName" name="lastName" placeholder="Last Name" onChange={handleChange} />
                    </div>
                    <input type="email" name="email" placeholder="Enter email" onChange={handleChange} />
                    <input type="text" name="userName" placeholder="Enter username" onChange={handleChange} />
                    <input type="password" name="password" placeholder="Enter password" onChange={handleChange} />
                    <input type="password" name="rePassword" placeholder="Re-enter password" onChange={handleChange} />
                    <button className="registerBtn" onClick={handleRegister}>Submit</button>
                </div>
            </div>
        </div >
    )
}

export default Register
