import { createSlice } from "@reduxjs/toolkit";
const rootSlice = createSlice({
    name: 'root',
    initialState: {},
    reducers: {
        resetAllStates: () => {
            return {}
        },
    },
});
export const { resetAllStates } = rootSlice.actions;
export default rootSlice.reducer;