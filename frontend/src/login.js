import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth();

    // const validateForm = () => {
    //     let isValid = true;

    //     // Email validation
    //     if (!email || !email.includes("@")) {
    //         setEmailError("Please enter a valid email address");
    //         isValid = false;
    //     } else {
    //         setEmailError("");
    //     }

    //     // Password validation
    //     if (!password || password.length < 7) {
    //         setPasswordError("Password must be at least 8 characters long");
    //         isValid = false;
    //     } else {
    //         setPasswordError("");
    //     }

    //     return isValid;
    // };

    const onButtonClick = () => {
        // Validate the form
        // if (validateForm()) {
        //     // Perform login logic (e.g., API call, authentication)
        //     // For simplicity, just navigate to a different page for now
        //     navigate("/home.js");
        // }



        // set initial error value to empty

        setEmailError("")
        setPasswordError("")

        // Check if the user has enterd both fields orrectly

        if ("" === email) {
            setEmailError("Please enter your email")
            return
        }

        if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
            setEmailError("please enter a valid email")
            return
        }

        if ("" === password) {
            setPasswordError("Please enter a password")
            return
        }

        if (password.length < 7) {
            setPasswordError("The Password must be 8 characters or longer")
            return
        }
        
        // Authentication calss wil be made ...

        login(email);
        navigate("/")
    };

    return (<div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>Login</div>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input value={email} placeholder="Enter Your Email Here" onChange={(ev) => setEmail(ev.target.value)} className={"inputBox"} type="text" />
            <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input value={password} placeholder="Enter Your password here" onChange={(ev) => setPassword(ev.target.value)} className={"inputBox"} type="password" />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input className={"inputButton"} type="button" onClick={onButtonClick} value={"Log in"} />
        </div>
    </div>
    );
};

export default Login;