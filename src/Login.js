import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import { motion } from "motion/react";
import {
    Box, Checkbox,
    FormControlLabel, FormGroup,
    TextField,
    Typography
} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import ScrollToTop from "./ScrollToTop";
import axios from "axios";
import AuthContext from "./AuthContext";
const darkTheme = createTheme({
    palette: {
        mode: 'light',
    },
});


function SignUp(){
    ScrollToTop();
    const navigate = useNavigate();
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [showPassword, setShowPassword] = React.useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData(e.currentTarget);
            const username = data.get("username");
            const password = data.get("password");

            const res = await axios.post("http://localhost:5000/login", { username, password });
            login(res.data.token);
            navigate("/dashboard");
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        }
    };
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const navigateToSignup= (e) => {
        navigate("/signup");
    }
    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <React.Fragment>

                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="App">
                        <Box sx={{alignItems: "center",justifyContent: "center",display: "flex",alignContent: "center"}}>
                            <Box component="section" sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                m:4, p: 4,
                                borderRadius: 4,
                                boxShadow: 3,
                                maxWidth: 500,
                                minWidth: 300,
                                width: "auto%",
                                fontSize: 15,
                                mt:10,
                                fontFamily: 'sans-serif',
                                textAlign: "center",

                            }}>

                                <Box
                                    component="form"
                                    sx={{ '& .MuiTextField-root': { m: 1, p: 1 , width: '25ch',
                                            display: "flex" ,}}}
                                    autoComplete="off"
                                    onSubmit={handleLogin}
                                >

                                    <Typography variant={'inherit'}>Login</Typography>
                                    <div style={{display:"inline", alignContent:"right"}}>
                                        <img src = "https://static.vecteezy.com/system/resources/previews/011/432/528/original/enter-login-and-password-registration-page-on-screen-sign-in-to-your-account-creative-metaphor-login-page-mobile-app-with-user-page-flat-illustration-vector.jpg"
                                             alt="Description" width="250" />
                                    </div>
                                    <TextField sx={{display:"inline"}} name="username" required label="Username" variant="standard" placeholder="Enter Username" id = 'username' margin = "normal"></TextField>
                                    <TextField sx={{display:"block"}} name="password" required label="Password" variant="standard" placeholder="Enter Password" id = 'password' margin = "normal"
                                               type={showPassword ? 'text' : 'password' } ></TextField>
                                    <FormGroup sx={{textAlign: 'left', fontSize: 16, color: 'grey', m: 1}}>
                                        <FormControlLabel sx={{mt: 1}}  control={<Checkbox/>}
                                                          label="Stay Logged in for the session."/>
                                    </FormGroup>

                                    <Button sx={{mt:4}} variant={"outlined"} type={"submit"}>Login Account</Button>
                                    <Typography sx={{display: 'block', mt: 2}} variant={'overline'}>Don't have an
                                        account,
                                    </Typography>
                                    <Button sx={{fontSize: 12}} onClick={navigateToSignup}>Sign up here.</Button>
                                </Box>
                            </Box>
                        </Box>

                    </motion.div>
                </React.Fragment>
            </ThemeProvider>
        </div>
    );
}

export default SignUp;