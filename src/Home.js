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

function Home() {
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
            img: 'https://storage.googleapis.com/profit-prod/wp-content/uploads/2022/07/d4eaf149-task-management.jpg',
            title: 'Bed',
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
            img: 'https://storage.googleapis.com/profit-prod/wp-content/uploads/2022/07/d4eaf149-task-management.jpg',
            title: 'Bed',
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
        {
            img: 'https://storage.googleapis.com/profit-prod/wp-content/uploads/2022/07/d4eaf149-task-management.jpg',
            title: 'Bed',
        },

    ];
    const navigate = useNavigate();
    const navigateTo = (e) => {
        navigate("/auth");
    }
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <React.Fragment>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Box component="section" sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        m:1, p: 1,
                        width: 'auto%',
                        flexDirection: "column",
                        textAlign: "center",
                        fontFamily: 'sans-serif',}}>

                        <ImageList variant="masonry" cols={3} gap={8} sx={{mt:10}}>
                            {itemData.map((item) => (
                                <ImageListItem key={item.img}>
                                    <img
                                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        src={`${item.img}?w=248&fit=crop&auto=format`}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>

                        <Typography variant={'h4'} sx={{m:3}}>Welcome to Tasks.Web.App</Typography>

                        <Typography variant={'body1'} sx={{m:2}}>A place where you can create tasks, manage your task and do it on time.</Typography>

                        <Typography variant={'body1'} sx={{m:4}}>Sign up, if you are new or login to use.</Typography>

                        <Button variant={"outlined"} style={{marginBottom:20}} onClick={navigateTo}>Register</Button>

                        <Button variant={"outlined"} style={{marginBottom:35}}>Login</Button>

                    </Box>
                </motion.div>
            </React.Fragment>
        </ThemeProvider>
    );
}

export default Home;
