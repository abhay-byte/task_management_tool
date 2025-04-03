import {useNavigate} from "react-router-dom";
import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import tmsicon from "./Images/tms1024.png";
import React from "react";
import Logout from "./Logout";

export default function ButtonAppBar() {

    let navigate = useNavigate();
    const naviagteToHome = (e) => {
        navigate("/");

    }


    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1, display:"flex", fontFamily: 'sans-serif', fontSize: 15, justifyContent: 'space-between'}}>
                        <Box sx={{flexGrow: 1}}>
                            <IconButton color="inherit" onClick={naviagteToHome}>
                                <img
                                    srcSet={`${tmsicon}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    src={`${tmsicon}?w=164&h=164&fit=crop&auto=format`}
                                    alt={'Tms Icon'}
                                    loading="lazy"
                                    width="24"
                                    height="24"
                                />
                            </IconButton>
                            Tasks.Web.App
                        </Box>

                        <Box alignContent={"right"}>
                            <Logout/>
                        </Box>

                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}