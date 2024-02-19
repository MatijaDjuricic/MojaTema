import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import studentsReducer from "./studentsSlice";
import professorsReducer from "./professorsSlice";
import topicsSlice from "./topicsSlice";
export const store = configureStore({
    reducer: {
        users: usersReducer,
        students: studentsReducer,
        professors: professorsReducer,
        topics: topicsSlice
    }
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;