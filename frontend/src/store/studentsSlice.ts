import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Student, StudentsState } from "../types/types";
import axios from "axios";
axios.defaults.withCredentials = true;
const URL = import.meta.env.VITE_URL_PRIVATE;
const initialState: StudentsState = {
    students: [],
}
export const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        resetState: () => initialState
    }
});
export const { resetState } = studentsSlice.actions; 
export default studentsSlice.reducer;