import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import topicsReducer from "./topicsSlice";
import messagesReducer from "./messagesSlice";
export const store = configureStore({
    reducer: {
        users: usersReducer,
        topics: topicsReducer,
        messages: messagesReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    }),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;