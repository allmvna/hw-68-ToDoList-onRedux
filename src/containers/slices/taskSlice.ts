import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";

interface TaskProps {
    id: string;
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

interface TasksResponse {
    [key: string]: TaskProps;
}

interface ToggleTaskStatus{
    id: string;
    status: boolean;
}

export const fetchData = createAsyncThunk('task/fetchData', async () => {
    const { data } = await axiosAPI.get<TasksResponse>('tasks.json');

    return Object.entries(data).map(([key, task]) => ({
        ...task,
        id: key
    }));
});

export const addTask = createAsyncThunk('task/addTask', async (title: string) => {
    const newTask = { title, status: false };
    const { data } = await axiosAPI.post('/tasks.json', newTask);
    return { ...newTask, id: data.name };
});

export const toggleTaskStatus = createAsyncThunk(
    'task/toggleTaskStatus',
    async ({ id, status }: ToggleTaskStatus) => {
        await axiosAPI.patch(`/tasks/${id}.json`, { status });
        return { id, status };
    }
);

export const deleteTask = createAsyncThunk(
    'task/deleteTask',
    async (id: string) => {
        await axiosAPI.delete(`/tasks/${id}.json`);
        return id;
    }
);

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
            })
            .addCase(toggleTaskStatus.fulfilled, (state, action) => {
                const task = state.tasks.find((task) => task.id === action.payload.id);
                if (task) {
                    task.status = action.payload.status;
                }
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            });

    },

});

export const taskReducer = taskSlice.reducer;
