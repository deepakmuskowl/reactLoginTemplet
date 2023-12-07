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
    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("");

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

        setLoggedIn(true);
        setUserEmail(email);
        navigate("/")

        // Check if email has an account associated with it

        checkAccountExists(accountExists => {
            if (accountExists)
                logIn()
            else
                if (window.confirm("An account does not Exist with this email address: " + email + ". Do you want to create a new account ?")) {
                    logIn()
                }
        })
    };

    // Call the server API to check if the given email ID already exists

    const checkAccountExists = (callback) => {
        fetch("http://localhost:3080/check-account", {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({ email })
        })
        .then(r => r.json())
        .then(r => {
            callback(r?.userExists)
        })
    }

    // Log in a user using email and password

    const logIn = () => {
        fetch("http://localhost:3080/auth", {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email,password})
        })
        .then(r=>r.json())
        .then(r => {
            if ('success' === r.message) {
                localStorage.setItem("user",JSON.stringify({email,token:r.token}))
                setLoggedIn(true);
                setEmail(email);
                navigate("/");
            } else {
                window.alert("Wrong email or Password")
            }
        })
    }

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