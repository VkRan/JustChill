import React, { useRef, useState } from 'react';
import "./register.scss";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const emailRef = useRef();

    const [password, setPassword] = useState("");
    const passwordRef = useRef();

    const [userName, setUserName] = useState("");
    const userNameRef = useRef();

    const [firstName, setFirstName] = useState("");
    const firstNameRef = useRef();

    const [lastName, setLastName] = useState("");
    const lastNameRef = useRef();

    const handleSignIn = () => {
        navigate("/login");
    }

    const handleStart = () => {
        setEmail(emailRef.current.value);
        setFirstName(firstNameRef.current.value);
        setLastName(lastNameRef.current.value);

    }
    const handleFinish = async (e) => {
        e.preventDefault();
        setPassword(passwordRef.current.value);
        setUserName(userNameRef.current.value);

        try {
            await axios.post("auth/createUser", { email, password:"Qwerty37*", rePassword:"Qwerty37*", userName:"hello", firstName, lastName });
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
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
                {!email ? (
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
                )}
            </div>
        </div>
    )
}

export default Register
