import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "./AuthContext";

const ProtectedRoute = () => {
    const { token } = useContext(AuthContext);
    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
