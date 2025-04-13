import {motion} from "motion/react";
import {useNavigate} from "react-router-dom";
import React, {useState, useEffect, useRef, useContext} from 'react';
import Button from '@mui/material/Button';
import {
    AppBar,
    Box, ImageList, ImageListItem,
    Typography
} from "@mui/material";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'
import AuthContext from "./AuthContext";

const darkTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

function Home() {
    const {token} = useContext(AuthContext);
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
    const navigateToSignUp = (e) => {
        navigate("/signup");
    }
    const navigateToLogin = (e) => {
        navigate("/login");
    }
    const navigateToDashboard = (e) => {
        navigate("/dashboard");
    }
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <React.Fragment>
                <motion.div initial={{scale: 0}} animate={{scale: 1}}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <Box component="section" sx={{
                            display: "flow",
                            justifyContent: "center",
                            alignItems: "center",
                            m: 1, p: 1,
                            width: 'auto%',
                            maxWidth: 800,
                            minWidth: 300,
                            textAlign: "center",
                            fontFamily: 'sans-serif',
                        }}>

                            <ImageList variant="masonry" cols={3} gap={8} sx={{mt: 10}}>
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

                            <Typography variant={'h4'} sx={{m: 3}}>Welcome to Tasks.Web.App</Typography>

                            <Typography variant={'body1'} sx={{m: 2}}>A place where you can create tasks, manage your
                                task and do it on time.</Typography>

                            <Typography variant={'body1'} sx={{m: 2}}>Sign up, if you are new or login to
                                use.</Typography>

                            {token &&
                                <Button variant={"outlined"} style={{margin: 10, marginBottom: 50, display: "inline"}}
                                        onClick={navigateToDashboard}>Go To Dashboard</Button>}

                            {!token &&
                                <Button variant={"outlined"} style={{margin: 10, marginBottom: 50, display: "inline"}}
                                        onClick={navigateToSignUp}>Register</Button>}

                            {!token &&
                                <Button variant={"outlined"} style={{margin: 10, marginBottom: 50, display: "inline"}}
                                        onClick={navigateToLogin}>Login</Button>}


                        </Box>
                    </Box>

                </motion.div>
            </React.Fragment>
        </ThemeProvider>
    );
}

export default Home;
