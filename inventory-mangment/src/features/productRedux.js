import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
    name: "products",
    initialState: [],
    reducers: {
        setProducts: (state, action) => {
            return action.payload;
        },
        addProduct: (state, action) => {
            state.push(action.payload);
        },
        removeProduct: (state, action) => {
            return state.filter((item) => item._id !== action.payload);
        }, 
        editProduct: (state, action) => {
            const index = state.findIndex((item) => item._id === action.payload._id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
    }
});

export const { setProducts, addProduct, removeProduct, editProduct } = productsSlice.actions;
export default productsSlice.reducer;