import Dashboard from './Dashboard';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Box, Divider,
    FormControl, FormControlLabel, FormLabel,
    IconButton,
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
    const [tasks, setTasks] = useState([]);
    const [formData, setFormData] = useState(new FormData());
    const [responseMessage, setResponseMessage] = useState("");
    useEffect(() => {
        axios.get('http://localhost:5000/tasks')
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the items!', error);
            });
    }, []);

    useEffect(() => {
        if (!formData || !(formData instanceof FormData)) {
            console.warn("Invalid formData, skipping API call");
            return;
        }
        let taskdata = {
            taskname: formData.get('taskname'),
            taskdescription: formData.get('taskdescription'),
            status: formData.get('taskstatus'),
            startdate: formData.get('startdate'),
            enddate: formData.get('enddate'),
            userid: "asdadf"
        }
        try {
            const response = axios.post('http://localhost:5000/tasks', taskdata, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setResponseMessage(response.data.message || "Success!");
            console.log(response.data);


        } catch (error) {
            setResponseMessage("Error submitting data");
            console.log(error);
        }
    }, [formData]);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload
        let data = new FormData(e.currentTarget);
        console.log('Form Data:', data);
        setFormData(data);
    };
    return (

        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <React.Fragment>

                <div className="App">
                    <Box component="section" sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        m:4, p: 4,
                        borderRadius: 4,
                        boxShadow: 5,
                        width: 'auto%',}}>

                        <Box
                            component="form"
                            sx={{ '& .MuiTextField-root': { m: 1, p: 1 , width: '25ch' } }}
                            autoComplete="off"
                            onSubmit={handleSubmit}
                        >
                            <h1 style={{ textAlign: "center" }}>Create Task</h1>
                            <TextField name="taskname" required label="Task Name" variant="outlined" placeholder="Enter Task" id = 'task' margin = "dense"></TextField>

                            <TextField required name="taskdescription" label="Task Desctiption" variant="outlined" placeholder="Enter Description" id = 'desc' margin = "dense"></TextField>
                            <br></br>
                            <TextField label="" name="startdate" type={"date"} variant="outlined" id = 's_date' margin = "dense" helperText={"Enter Start Date"}></TextField>

                            <TextField label="" name="enddate" type={"date"} variant="outlined"  id = 's_date' margin = "dense" helperText={"Enter End Date"}></TextField>
                            <br></br>
                            <FormControl margin={"normal"}>
                                <FormLabel id="demo-radio-buttons-group-label">Task Status</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="Ongoing"
                                    name="taskstatus"
                                >
                                    <FormControlLabel value="completed" control={<Radio />} label="Completed" />
                                    <FormControlLabel value="pending" control={<Radio />} label="Pending" />
                                </RadioGroup>
                            </FormControl>
                            <br></br>
                            <Button   style={{
                                display: 'block',
                                margin: '10px auto',

                            }} variant={"outlined"} type={"submit"}>Add Task</Button>

                        </Box>
                        {/*                    <List>
                        <ListItemButton> hello </ListItemButton>
                        {tasks.map((task) => (
                            <ListItemButton key={task._id}>{task.taskname}: ${task.taskdescription}</ListItemButton>
                        ))}
                        <ListItemButton> hello </ListItemButton>
                    </List>*/}
                    </Box>
                </div>
            </React.Fragment>
        </ThemeProvider>
    );
}
/*function ButtonAppBar() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {['Login','View Tasks', 'Create Task'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box>
    );
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <div>
                            <Drawer open={open} onClose={toggleDrawer(false)}>
                                {DrawerList}
                            </Drawer>
                        </div>
                        <MenuIcon onClick={toggleDrawer(true)} />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Tasks
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}*/

function Main() {
    const navigate = useNavigate(); // Hook for navigation

    return (
        <div>
            <h1>Welcome to App.js</h1>
            <button onClick={() => navigate("/home")}>Go to Home</button>
        </div>
    );
}

export default App;
