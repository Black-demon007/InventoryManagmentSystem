import { createSlice } from "@reduxjs/toolkit";

export const editSlice = createSlice({
    name: "edit",
    initialState: null,    
    reducers: {
        setEdit: (state, action) => {
            return action.payload;
        },
        clearEdit: (state) => {
            return null;
        }
    }
});

export const { setEdit, clearEdit } = editSlice.actions;
export default editSlice.reducer;