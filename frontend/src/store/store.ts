import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import topicsReducer from "./topicsSlice";
export const store = configureStore({
    reducer: {
        users: usersReducer,
        topics: topicsReducer
    }
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;