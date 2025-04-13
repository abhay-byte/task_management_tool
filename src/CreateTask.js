import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import {
    Alert, AlertTitle,
    Box,
    FormControl, FormControlLabel, FormLabel,
    Radio, RadioGroup,
    TextField,
} from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AuthContext from "./AuthContext";
const darkTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

function App() {
    const navigation = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [formData, setFormData] = useState(new FormData());
    const [responseMessage, setResponseMessage] = useState("");
    const [alertContent, setAlertContent] = useState('');
    const [s_alert, setSAlert] = useState(false);
    const [e_alert, setEAlert] = useState(false);
    const {user} = useContext(AuthContext);


    const CreateNewTask = async (e) => {
        e.preventDefault(); // Prevent page reload
        let data = new FormData(e.currentTarget);

        let taskdata = {
            taskname: data.get('taskname'),
            taskdescription: data.get('taskdescription'),
            status: data.get('taskstatus'),
            startdate: data.get('startdate'),
            enddate: data.get('enddate'),
            userid: user?.userId, // Ensure user object exists
        };

        try {
            const response = await axios.post('http://localhost:5000/tasks', taskdata, {
                headers: { "Content-Type": "application/json" },
            });

            setResponseMessage(response.data.message || "Success!");
            setSAlert(true);
            navigation("/dashboard");

        } catch (error) {
            setResponseMessage("Error submitting data");
            setEAlert(true);
            console.error("Error:", error);
        }
    };

    return (

        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <React.Fragment>
                {s_alert ? <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    Task Created Successfully!
                </Alert>:<></>}
                {e_alert ? <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Task Not Created!
                    </Alert>:<></>}

                <div className="App">
                    <Box component="section" sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        m:4, p: 4,
                        borderRadius: 4,
                        boxShadow: 5,
                        width: 'auto%',
                    mt:12}}>

                        <Box
                            component="form"
                            sx={{ '& .MuiTextField-root': { m: 1, p: 1 , width: '25ch' } }}
                            autoComplete="off"
                            onSubmit={CreateNewTask}
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
                    </Box>
                </div>
            </React.Fragment>
        </ThemeProvider>
    );
}


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
