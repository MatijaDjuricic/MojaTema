import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices/rootSlice";
import usersReducer from "./slices/usersSlice";
import topicsReducer from "./slices/topicsSlice";
import messagesReducer from "./slices/messagesSlice";
export const store = configureStore({
    reducer: {
        root: rootReducer,
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