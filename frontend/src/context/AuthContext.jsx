/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState,useEffect,createContext } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

const AuthProvider = ({ children }) =>{
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const login = async(userData) => {
        const loggedInUser = await authService.login(userData);
        setUser(loggedInUser);
    };

    const register = async(userData) => {
        await authService.register(userData);
    };

    const logout = () =>{
        authService.logout();
        setUser(null);
    };

        return (
            <AuthContext.Provider value={{user, login,register,logout}}>
                {...children}
            </AuthContext.Provider>
        );
};

export {AuthContext, AuthProvider};