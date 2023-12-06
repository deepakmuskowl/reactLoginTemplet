import React from "react"
import { useNavigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";
import { useAuth } from "./AuthContext";


const Home = () => {
    const { loggedIn, email, logout } = useAuth();
    const navigate = useNavigate();

    const onButtonClick = () => {
        if (loggedIn) {
            logout();
        }

        else {
            navigate("/login")
        }

    };

    return (<div className="mainContainer">
        <div className={"titleContainer"}>
            <div>Welcome!</div>
        </div>
        <div>
            This is the home page.
        </div>
        {/* <div className={"buttonContainer"}>
            <input className={"inputButton"} type="button" onClick={onButtonClick} value={loggedIn ? "Log out" : "Log in"} />
            {(loggedIn ? <div>Your email address is {email}
            </div> : <div/>)}
        </div> */}

        <div>
            {loggedIn ? (
                <div className={"buttonContainer"}>
                    <p>Your Email Address is : {email}</p>
                    {/* <button className={"inputButton"} type="button" onClick={onButtonClick}>
                        Log Out
                    </button> */}

                    <input className={"inputButton"} type="button" onClick={onButtonClick} value={"Log Out"} />
                </div>
            ) : (
                <input className={"inputButton"} type="button" onClick={onButtonClick} value={"Log in"} />
            )}
        </div>
    </div>
    );
};

export default Home;