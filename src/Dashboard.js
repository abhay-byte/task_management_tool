import {useNavigate} from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Grid2 from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {
    Backdrop,
    Card,
    CardActions,
    CardContent,
    Chip,
    FormControl, FormControlLabel,
    FormLabel, Radio,
    RadioGroup,
    useMediaQuery
} from "@mui/material";
import Button from "@mui/material/Button";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {PieChart} from '@mui/x-charts/PieChart';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import {motion} from "motion/react";
import ScrollToTop from "./ScrollToTop";
import AuthContext from "./AuthContext";
import {useContext, useEffect, useState} from "react";
import axios from "axios";


export default function Dashboard() {
    ScrollToTop();
    const months = ['Jan','February','March','April','May','June','July','August','September','October','November','December'];
    const {user} = useContext(AuthContext);
    const userId = user?.userId;
    const navigate = useNavigate();
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(true);
    const isMobile = useMediaQuery("(max-width:600px)"); // Mobile: Width ≤ 60
    const [tasks, setTasks] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const [currentTask, setCurrentTask] = useState("");
    const [currentTaskId, setCurrentTaskId] = useState("");

    const handleOpen = (id, name) => {
        setCurrentTaskId(id);
        setCurrentTask(name);
        setOpen(true);
    };
    useEffect(() => {
        if(userId != null){
            const params = new URLSearchParams([["userid",user["userId"]]]);
            axios.get('http://localhost:5000/tasks',{ params: { userid: userId ,sort: 'asc'} })
                .then((response) => {
                    setTasks(response.data);
                })
                .catch((error) => {
                    console.error('There was an error fetching the items!', error);
                });
        }

    }, []);

    const currentMonth = new Date().getMonth(); // Get current month (0-11)
    const currentYear = new Date().getFullYear(); // Get current year

    const filteredTasks = tasks.filter(task => {
        const taskDate = new Date(task.startdate); // Convert startdate to Date
        return taskDate.getMonth() === currentMonth && taskDate.getFullYear() === currentYear;
    });

    const taskCounts = filteredTasks.reduce(
        (acc, task) => {
            acc[task.status] = (acc[task.status] || 0) + 1;
            return acc;
        },
        { completed: 0, pending: 0, due: 0 }
    );

    const taskItems = [
        { id: 0, value: taskCounts.completed, label: "Completed", color: "blue" },
        { id: 1, value: taskCounts.pending, label: "Pending", color: "#1976d2" },
        { id: 2, value: taskCounts.due, label: "Due", color: "#E0E0E0" },
    ];

    const [status, setStatus] = useState("Ongoing");

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const updateTask = async () => {
        try {
            const response = await axios.put("http://localhost:5000/tasks", {
                taskid: currentTaskId,
                status
            });
            console.log("Task Updated:", response.data);
            handleClose(); // Close modal after update
            window.location.reload();
        } catch (error) {
            console.error("Error updating task:", error.response?.data || error.message);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:5000/tasks/${taskId}`); // Pass taskId in the URL
            console.log("Task Deleted:", taskId);

            window.location.reload(); // Refresh page after deletion
        } catch (error) {
            console.error("Error deleting task:", error.response?.data || error.message);
        }
    };

    const navigateToCreateTask = () => {
        navigate("/createTask");
    };
    return (
        <Box sx={{
            display: "flex", flexDirection: "Column", justifyContent: "space-between", mt: 10,
            fontFamily: "sans-serif"
        }}>

            <motion.div initial={{scale: 0}} animate={{scale: 1}} style={{margin: 20}}>
                <Box sx={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>

                    <Typography color={"grey"} variant={'body2'}> Welcome, </Typography>
                    <Box display="flex" alignItems="center" gap={2} justifyContent={"space-between"} >
                        <Typography p={1} align={"left"} variant={'h4'} gutterBottom>{user['username']}</Typography>

                        <Button onClick={navigateToCreateTask} variant="outlined" startIcon={<AddBoxOutlinedIcon />} sx={{ display: "flex", alignItems: "center" }}>
                            Create Task
                        </Button>
                    </Box>

                    <Box sx={{border:'1px solid',borderColor:'#E0E0E0', borderRadius:2, mt:3,mb:3, display: 'flex', flexDirection: isMobile?'column':'row', justifyContent: 'space-around'
                    ,minWidth:'80%'}}>

                        <Typography sx={{m:2}} >Statistics Of {months[new Date().getMonth()]}</Typography>
                        <PieChart sx={{p:2}}

                                  series={[
                                      {
                                          data:taskItems,
                                          innerRadius: 20,
                                          outerRadius: isMobile ? 90 : 100,
                                          paddingAngle: 5,
                                          cornerRadius: 5,
                                          startAngle: -45,
                                          endAngle: 270,
                                          cx: isMobile ? 120 : 150,
                                          cy: isMobile ? 120 : 150,

                                      },
                                  ]}
                                  labelPosition="outside"
                                  width={isMobile ? 360 : 400}
                                  height={isMobile ? 280 : 300}

                        />
                        <Box display={"flex"} flexDirection={'column'} justifyContent={'space-around'} alignItems={'center'} sx={{m:4, p:4}}>
                            <Typography color={"grey"} variant={"body1"}>Task completed: {taskItems[0].value}</Typography>
                            <Typography color={"grey"} variant={"body1"}>Task Ongoing: {taskItems[1].value}</Typography>
                            <Typography color={"grey"} variant={"body1"} gutterBottom={4}>Task Due: {taskItems[2].value}</Typography>
                        </Box>

                    </Box>

                </Box>
                <Typography variant="h4" gutterBottom>
                    Task List
                </Typography>
                <Grid2 container spacing={2}>
                    {tasks.map((task, index) => (
                        <Grid2 item xs={12} sm={6} md={4} key={index}>
                            <Card variant="outlined" sx={{ display: "block", flexDirection: "column", justifyContent: "space-between" }}>
                                <CardContent>
                                    <Typography variant="body2" color="grey">Task Name</Typography>
                                    <Typography variant="h6">{task.taskname}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Description: {task.taskdescription}
                                    </Typography>

                                    <Typography variant="body2" display="block">
                                        <strong>Start:</strong> {task.startdate} | <strong>End:</strong> {task.enddate}
                                    </Typography>

                                    <Chip
                                        variant="outlined"
                                        label={task.status}
                                        color={task.status === "completed" ? "success" : "warning"}
                                        sx={{ marginTop: 1 }}
                                    />

                                    <CardActions>
                                        <IconButton onClick={() => handleOpen(task.taskid, task.taskname)} color="primary" aria-label="edit">
                                            <EditOutlinedIcon />
                                        </IconButton>
                                        <IconButton onClick={() => deleteTask(task.taskid)} color="error" aria-label="delete">
                                            <DeleteOutlineOutlinedIcon />
                                        </IconButton>
                                    </CardActions>
                                </CardContent>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>

                {/* Backdrop for displaying selected task */}
                <Backdrop sx={{alignContent:'center',direction:'flex',flexDirection: 'column', color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose}>
                    <Card sx={{alignContent:'center',direction:'flex',flexDirection: 'column', padding: 2, backgroundColor: "white", borderRadius: 2 }} onClick={(e) => e.stopPropagation()}>
                        <Typography variant="h6" color="black">Task Name: {currentTask}</Typography>
                        <Typography variant="body2" color="text.secondary">Task ID: {currentTaskId}</Typography>

                        <FormControl margin="normal" sx={{alignContent:'center',direction:'flex',flexDirection: 'column'}}>
                            <FormLabel id="task-status-label">Task Status</FormLabel>
                            <RadioGroup
                                aria-labelledby="task-status-label"
                                value={status}
                                name="taskstatus"
                                onChange={handleStatusChange}
                            >
                                <FormControlLabel value="completed" control={<Radio />} label="Completed" />
                                <FormControlLabel value="pending" control={<Radio />} label="Pending" />
                            </RadioGroup>
                        </FormControl>

                        <Button variant="outlined" onClick={updateTask}>Update</Button>
                    </Card>
                </Backdrop>

            </motion.div>
        </Box>
    );
};

