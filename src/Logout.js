import { useContext } from "react";
import AuthContext from "./AuthContext"; // ✅ Make sure the correct path is used
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const Logout = () => {
    const { logout, token } = useContext(AuthContext); // ✅ Ensure token & logout exist
    const navigate = useNavigate();

    if (!token) return null; // Hide Logout button if not logged in

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return <Button variant={'contained'} onClick={handleLogout}>Logout</Button>;
};

export default Logout;
