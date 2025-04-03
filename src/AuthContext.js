import { createContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext(undefined);

const GetUser = (token)=>{
    try{
        if (token) {
            const user = jwtDecode(token);
            return user;
        }
    }
    catch(err){
        console.log(err);
    }

};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const user = GetUser(token);

    useEffect(() => {
        localStorage.setItem("token", token);
        console.log(user);
    }, [token]);

    const login = (newToken) => {
        setToken(newToken);
    };

    const logout = () => {
        setToken("");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
