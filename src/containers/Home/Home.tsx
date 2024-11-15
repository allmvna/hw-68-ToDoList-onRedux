import {Alert, Button, Card, CardActions, CardContent, Checkbox, Container, TextField, Typography} from "@mui/material";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Grid from "@mui/material/Grid2";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store.ts";
import React, {useEffect, useState} from "react";
import {addTask, deleteTask, fetchData, toggleTaskStatus} from "../slices/taskSlice.ts";
import Spinner from "../../UI/Spinner/Spinner.tsx";


const Home = () => {
    const [taskTitle, setTaskTitle] = useState("");
    const isLoading = useSelector((state: RootState) => state.task.isLoading);
    const error = useSelector((state: RootState) => state.task.error);
    const tasks = useSelector((state: RootState) => state.task.tasks);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (taskTitle.trim()) {
            dispatch(addTask(taskTitle));
            setTaskTitle("");
        }
    };

    const handleStatusChange = (id: string, currentStatus: boolean) => {
        dispatch(toggleTaskStatus({ id, status: !currentStatus }));
    };

    const deleteTaskHandler = (id: string) => {
        dispatch(deleteTask(id));
    };

    return (
        <>
            <Container maxWidth="lg">
                <Typography
                    sx={{mt: 2, mb: 2, textAlign: "center", color: "#fff" }}
                    variant="h4"
                >
                    ToDo list
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            mx: "auto",
                            borderRadius: "10px",
                            backgroundColor: "white",
                            p: 4,
                        }}
                    >
                        <Grid size={12}>
                            <TextField
                                sx={{
                                    width: "100%",
                                    backgroundColor: "white",
                                    borderRadius: "10px",
                                }}
                                id="task"
                                label="Enter task"
                                variant="outlined"
                                name="task"
                                value={taskTitle}
                                onChange={(e) => setTaskTitle(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid size={12} sx={{ textAlign: "center" }}>
                            <Button
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Send
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                {isLoading ? (
                    <Spinner/>
                    ) : (
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    {tasks.map((task) => (
                        <Grid size={12} key={task.id}>
                            <Card
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    backgroundColor: "white",
                                    border: "2px solid",
                                    borderColor: task.status ? "green" : "red",
                                    borderRadius: "10px",
                                    p: 1,
                                }}
                            >
                                <Checkbox
                                    checked={task.status}
                                    onChange={() => handleStatusChange(task.id, task.status)}
                                    sx={{ ml: 1 }}
                                />
                                <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                        Task: {task.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {task.status ? "Done" : "Not done"}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="medium"
                                        variant="contained"
                                        color="error"
                                        onClick={() => deleteTaskHandler(task.id)}
                                    >
                                        <RemoveCircleOutlineIcon />
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                )}

                {error && (
                        <Alert severity='error'>There was an error loading tasks!</Alert>
                )}
            </Container>
        </>
    );
};

export default Home;