import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
    Box, Checkbox,
    FormControl,
    FormControlLabel, FormGroup,
    FormLabel, IconButton, InputAdornment, InputLabel, OutlinedInput,
    Radio,
    RadioGroup, Tab,
    Tabs,
    TextField,
    Typography
} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import ScrollToTop from "./ScrollToTop";
import BasicTabs, {CustomTabPanel} from "./BasicTabs";
import PropTypes from "prop-types";
import {CheckBox, Visibility, VisibilityOff} from "@mui/icons-material";
const darkTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};


function Auth(){
    ScrollToTop();
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [value, setValue] = React.useState(0);
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };
    const handleSubmit = () =>{

    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
      <div>
          <ThemeProvider theme={darkTheme}>
              <CssBaseline />
              <React.Fragment>

                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="App">
                      <Box sx={{alignItems: "center",justifyContent: "center",display: "flex",alignContent: "center",}}>
                          <Box component="section" sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              m:4, p: 4,
                              borderRadius: 4,
                              boxShadow: 3,
                              maxWidth: 800,
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
                                          display: "flex",
                                          flexDirection: "column",}}}
                                  autoComplete="off"
                                  onSubmit={handleSubmit}
                              >
                                  <Box sx={{ width: '100%' }}>
                                      <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
                                          <Tabs value={value} onChange={handleChange} aria-label="AuthTabs">
                                              <Tab label="Register" {...a11yProps(0)} />
                                              <Tab label="Login" {...a11yProps(1)} />
                                          </Tabs>
                                      </Box>

                                      <CustomTabPanel value={value} index={0}>
                                          <TextField name="username" required label="Username" variant="standard" placeholder="Enter Username" id = 'username' margin = "normal"></TextField>
                                          <TextField name="email" required label="Email" variant="standard" placeholder="Enter Email" id = 'email' margin = "normal"></TextField>
                                          <OutlinedInput
                                              required label="Password"
                                              placeholder="Enter Password"
                                              id="outlined-adornment-password"
                                              variant="standard"
                                              type={showPassword ? 'text' : 'password'}
                                              endAdornment={
                                                  <InputAdornment position="end">
                                                      <IconButton
                                                          aria-label={
                                                              showPassword ? 'hide the password' : 'display the password'
                                                          }
                                                          onClick={handleClickShowPassword}
                                                          onMouseDown={handleMouseDownPassword}
                                                          onMouseUp={handleMouseUpPassword}
                                                          edge="end"
                                                      >
                                                          {showPassword ? <VisibilityOff /> : <Visibility />}
                                                      </IconButton>
                                                  </InputAdornment>
                                              }
                                              label="Password"
                                          />
                                          <TextField name="confirmpassword" required label="Confirm Password" variant="standard" placeholder="Re-Enter Password" id = 'confirmpassword' margin = "normal"></TextField>

                                          <FormGroup sx={{textAlign: 'left',fontSize: 16,color: 'grey',m:1}}>
                                              <FormControlLabel sx={{p:1}} required control={<Checkbox />} label="Agree to our Terms and Conditions." />
                                              <FormControlLabel sx={{p:1}} required control={<Checkbox />} label="Agree to our Privacy Policy." />
                                          </FormGroup>
                                          <Button sx={{mt:3}} variant={"outlined"} type={"submit"}>Create Account</Button>
                                      </CustomTabPanel>
                                      <CustomTabPanel value={value} index={1}>
                                          <TextField name="email" required label="Email" variant="standard" placeholder="Enter Email" id = 'email' margin = "normal"></TextField>
                                          <TextField name="password" required label="Password" variant="standard" placeholder="Enter Password" id = 'password' margin = "normal"></TextField>

                                          <Button sx={{mt:4}} variant={"outlined"} type={"submit"}>Login Account</Button>
                                      </CustomTabPanel>
                                  </Box>
                              </Box>
                          </Box>
                      </Box>

                  </motion.div>
              </React.Fragment>
          </ThemeProvider>
      </div>
    );
}

export default Auth;