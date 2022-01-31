import React, { useRef, useState } from 'react';
import "./register.scss";

const Register = () => {
    const [email, setEmail] = useState("");
    const emailRef = useRef();

    const [password, setPassword] = useState("");
    const passwordRef = useRef();

    const handleStart = () => {
        setEmail(emailRef.current.value);
    }
    const handleFinish = () => {
        setPassword(passwordRef.current.value);
    }
    return (
        <div className="register">
            <div className="top">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/255px-Netflix_2015_logo.svg.png"
                    alt="" />
                <button className="signBtn">Sign In</button>
            </div>
            <div className="content">
                <h1>Unlimited movies, TV shows, and more.</h1>
                <h2>Watch anywhere. Cancel anytime</h2>
                <p>Ready to watch? Enter your email to create or restart your membership.</p>
                {!email ? (
                    <div className="mail">
                        <input type="email" placeholder="email address" ref={emailRef} />
                        <button className="registerBtn" onClick={handleStart}>Get Started</button>
                    </div>
                ) : (
                    <form className="mail">
                        <input type="password" placeholder="password" ref={passwordRef} />
                        <button className="registerBtn" onClick={handleFinish}>Start</button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default Register
