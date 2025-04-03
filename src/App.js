import { Routes, Route } from "react-router-dom";
import React, {} from 'react';
import SignUp from "./SignUp";
import Home from "./Home";
import CreateTask from "./CreateTask";
import {
    Box, Divider, Link,
    Typography, Grid, Grid2
} from "@mui/material";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from "./Login";
import Dashboard from "./Dashboard";
import ButtonAppBar from "./ButtonAppBar";
import ProtectedRoute from "./ProtectedRoute";
import AuthContext, {AuthProvider} from "./AuthContext";

const darkTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

function App() {
    //const { token } = useContext(AuthContext);
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <React.Fragment>
                    <AuthProvider>
                        <ButtonAppBar/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/signup" element={<SignUp/>}/>
                            <Route path="/createtask" element={<CreateTask/>}/>
                            <Route path="/dashboard" element={<Dashboard/>}/>
                            <Route element={<ProtectedRoute />}>
                                <Route path="/dashboard" element={<Dashboard />} />
                            </Route>
                            <Route path="*" element={<Login />} />
                        </Routes>
                    </AuthProvider>
                <Footer/>
            </React.Fragment>
        </ThemeProvider>
    );
}

function Footer() {
    return (

        <Box component="footer"
             sx={{
                 backgroundColor: "#1976d2",
                 textAlign: "center",
                 fontFamily: "sans-serif",
                 fontSize: 25,
                 boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.3)", // Darker shadow
                 zIndex: 1000, // Ensures it's above other elements
                 color: 'white',
                 bottom: 0,
                 width: "auto%",
                 minHeight: "200px",


             }}>
            <Grid2 sx={{
                alignContent: "center",
                alignItems: "center",

                justifyContent: "center",
                m: 1, p: 1

            }} container spacing={2}>
                <Grid2 sx={{
                    '--Grid-borderWidth': '1px',
                    borderRight: 'var(--Grid-borderWidth) solid',
                    borderColor: 'divider'
                }} size={5}>
                    <Typography variant={"body1"} sx={{m: 1, p: 1}}>Tasks.Web.App
                        © {new Date().getFullYear()} Copyright </Typography>
                    <Typography variant={"body1"} sx={{m: 1, p: 1}}>Made by abhay-byte</Typography>
                </Grid2>
                <Grid2 size={5}>
                    <Typography variant={"body1"} sx={{m: 1, p: 1}}>
                        <Link href="/src/privacy-policy" color="inherit" underline="hover">
                            Privacy Policy
                        </Link>
                    </Typography>
                    <Typography variant={"body1"} sx={{m: 1, p: 1}}>
                        <Link href="/src/terms-conditons" color="inherit" underline="hover">
                            Terms and Conditions
                        </Link>
                    </Typography>

                </Grid2>
            </Grid2>


        </Box>
    );
}
export default App;
