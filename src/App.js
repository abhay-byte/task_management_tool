import tmsicon from "./Images/tms1024.png";
import { motion } from "motion/react";
import homeimg from "./Images/Home-removebg-preview.png";
import homeimgbg from "./Images/Home.jpeg"
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Auth from "./Auth";
import Home from "./Home";
import CreateTask from "./CreateTask";
import {
    AppBar,
    Box, Divider, Link,
    FormControl, FormControlLabel, FormLabel,
    IconButton, ImageList, ImageListItem,
    ListItemButton, ListItemIcon, ListItemText,
    Radio, RadioGroup,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Drawer from '@mui/material/Drawer';
const darkTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

function App() {
    const typographyRef = useRef(null);
    const itemData = [
        {
            img: 'https://storage.googleapis.com/profit-prod/wp-content/uploads/2022/07/d4eaf149-task-management.jpg',
            title: 'Bed',
        },
        {
            img: 'https://thumbs.dreamstime.com/z/business-task-management-vector-illustration-set-isolated-white-background-effective-corporate-time-tasks-planning-scheduling-157821557.jpg',
            title: 'Books',
        },
        {
            img: 'https://www.cflowapps.com/wp-content/uploads/2018/07/task-management-process.png',
            title: 'Sink',
        },
        {
            img: 'https://www.ntaskmanager.com/wp-content/uploads/2021/02/Task-management-vs-project-management.jpg',
            title: 'Kitchen',
        },
        {
            img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
            title: 'Blinds',
        },
        {
            img: 'https://www.cflowapps.com/wp-content/uploads/2018/07/task-management-process.png',
            title: 'Storage',
        },
        {
            img: 'https://wallpaperaccess.com/full/5137774.jpg',
            title: 'Candle',
        },

    ];
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <React.Fragment>
                <ButtonAppBar />
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/createtask" element={<CreateTask />} />
                    </Routes>
                </Router>
                <Footer />
            </React.Fragment>
        </ThemeProvider>
    );
}

function Footer(){
    return(
        <Box component="footer"
             sx={{
                 backgroundColor: "#1976d2",
                 textAlign: "center",
                 fontFamily:"sans-serif",
                 fontSize:25,
                 boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.3)", // Darker shadow
                 zIndex: 1000, // Ensures it's above other elements
                 color: 'white',
                 bottom: 0,
                 width: "100%",
                 minHeight: "200px",


             }}>
            <Typography variant={"body1"} sx={{m:1, p:1}}>Tasks.Web.App © {new Date().getFullYear()} Copyright </Typography>

            <Typography variant={"body1"} sx={{m:1, p:1}}>
                <Link href="/src/privacy-policy" color="inherit" underline="hover">
                    Privacy Policy
                </Link>
            </Typography>
            <Typography variant={"body1"} sx={{m:1, p:1}}>
                <Link href="/src/terms-conditons" color="inherit" underline="hover">
                    Terms and Conditions
                </Link>
            </Typography>

            <Typography variant={"body1"} sx={{m:1, p:1}}>Made by abhay-byte</Typography>

        </Box>
    );
}

function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,fontFamily: 'sans-serif', fontSize:15 }}>
                        <IconButton color="inherit">
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

                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default App;
