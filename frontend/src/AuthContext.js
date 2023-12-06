import React, { createContext, useContext, useState} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState("");

    const login = (userEmail) => {
        setEmail(userEmail);
        setLoggedIn(true);
    };

    const logout = () => {
        setEmail("");
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ loggedIn, email, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => useContext(AuthContext);