/*import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Professor, ProfessorsState } from "../types/types";
import axios from "axios";
axios.defaults.withCredentials = true;
const URL = import.meta.env.VITE_API_URL;
const initialState: ProfessorsState = {
    professors: [],
}
export const professorsSlice = createSlice({
    name: 'professors',
    initialState,
    reducers: {
        resetState: () => initialState
    }
});
export const { resetState } = professorsSlice.actions;
export default professorsSlice.reducer;*/