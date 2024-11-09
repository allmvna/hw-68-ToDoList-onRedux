import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";

interface TaskProps {
    title: string;
    status: boolean;
}

interface TaskState {
    tasks: TaskProps[];
    isLoading: boolean;
    error: boolean;
}

const initialState: TaskState = {
    tasks: [],
    isLoading: false,
    error: false,
};

export const fetchData = createAsyncThunk('task/fetchData', async ()=> {
    const {data: task} = await axiosAPI<TaskProps[]>('tasks.json');
    return task;
});

export const addTask = createAsyncThunk('task/addTask', async (title: string) => {
    const newTask = {title, status: false };
    await axiosAPI.post('/tasks.json', newTask);
    return newTask;
});


export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
            state.isLoading = true;
            state.error = false;
        })
           .addCase(fetchData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tasks = action.payload;
        })
            .addCase(fetchData.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            });
    },

});

export const taskReducer = taskSlice.reducer;
