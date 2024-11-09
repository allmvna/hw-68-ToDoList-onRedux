import {configureStore} from "@reduxjs/toolkit";
import {taskReducer} from "../containers/slices/taskSlice.ts";

export const store = configureStore({
    reducer: {
        task: taskReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;