import React, {useState} from "react";
import {motion} from "motion/react";
import {useNavigate} from "react-router-dom"
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
const darkTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

function SignUp() {
    ScrollToTop();
    const label = {inputProps: {'aria-label': 'Checkbox demo'}};
    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate();
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData(e.currentTarget);
            const username = data.get('username');
            const password = data.get('password');
            const email = data.get('email');
            const res = await axios.post("http://localhost:5000/signup", { username, password ,email});
            navigate("/login");
            alert(res.data.message);
        } catch (error) {
            alert(error.response?.data?.message || "Signup failed");
        }
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const navigateToLogin = (e) => {
        navigate("/login");
    }
    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <React.Fragment>

                    <motion.div initial={{scale: 0}} animate={{scale: 1}} className="App">
                        <Box sx={{
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",

                        }}>
                            <Box component="section" sx={{
                                display: "flex",
                                flexDirection: "column",
                                m: 4, p: 4,
                                borderRadius: 4,
                                boxShadow: 3,
                                maxWidth: 500,
                                minWidth: 300,
                                width: "auto%",
                                fontSize: 15,
                                mt: 10,
                                fontFamily: 'sans-serif',
                                textAlign: "center",


                            }}>
                                <Typography variant={'inherit'}>Sign Up</Typography>
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': {
                                            m: 1, p: 1, width: '25ch',
                                            display: "flex",

                                            color: "grey",


                                        }
                                    }}
                                    autoComplete="off"
                                    onSubmit={handleSignup}>

                                    <div style={{}}>
                                        <img
                                            src="https://static.vecteezy.com/system/resources/previews/003/689/228/original/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg"
                                            alt="Description" width="300"/>
                                    </div>
                                    <TextField sx={{display: "inline-block"}} name="username" required label="Username"
                                               variant="standard"
                                               placeholder="Enter Username" id='username' margin="normal"></TextField>
                                    <TextField sx={{display: "block"}} name="email" required label="Email"
                                               variant="standard"
                                               placeholder="Enter Email" id='email' margin="normal"></TextField>
                                    <TextField sx={{display: "block"}}
                                               name="password" required label="Password"
                                               variant="standard" placeholder="Password" id='password'
                                               type={showPassword ? 'text' : 'password'}

                                    />
                                    <TextField sx={{display: "block"}} name="confirm_password" required
                                               label="Confirm Password"
                                               variant="standard" placeholder="Re-Enter Password" id='confirm_password'
                                               margin="normal" type={showPassword ? 'text' : 'password'}></TextField>

                                    <FormGroup sx={{textAlign: 'left', fontSize: 16, color: 'grey', m: 1}}>
                                        <FormControlLabel sx={{mt: 1}} required control={<Checkbox/>}
                                                          label="Agree to our Terms and Conditions."/>
                                        <FormControlLabel sx={{mb: 1}} required control={<Checkbox/>}
                                                          label="Agree to our Privacy Policy."/>
                                    </FormGroup>
                                    <Button sx={{}} variant={"outlined"} type={"submit"}>Create Account</Button>

                                    <Typography sx={{display: 'block', mt: 2}} variant={'overline'}>Already have an
                                        account,
                                    </Typography>
                                    <Button sx={{fontSize: 12}} onClick={navigateToLogin}>Sign in here.</Button>

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