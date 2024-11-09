import {Button, Container, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store.ts";
import React, {useEffect, useState} from "react";
import {addTask, fetchData} from "../slices/taskSlice.ts";


const Home = () => {
    const [taskTitle, setTaskTitle] = useState("");
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
            </Container>
        </>
    );
};

export default Home;