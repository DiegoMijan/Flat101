import { createSlice } from '@reduxjs/toolkit';
import { getAllProducts, postProduct } from './thunks'
 
const initialState = {
    productList: [],
    loading: '',
    loadingCreate: '',
    error:'',
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: {
        [getAllProducts.pending] : (state, action) => {
            state.loading = 'loading';
            state.error = null;
        },
        [getAllProducts.rejected] : (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message;
        },
        [getAllProducts.fulfilled] : (state, action) => {
            state.loading = 'success';
            state.productList = action.payload;
        },
        [postProduct.pending] : (state, action) => {
            state.loadingCreate = 'loading';
            state.error = null;
        },
        [postProduct.rejected] : (state, action) => {
            state.loadingCreate = 'failed';
            state.error = action.error.message;
        },
        [postProduct.fulfilled] : (state, action) => {
            state.loadingCreate = 'success';
            state.productList = action.payload;
        }
    }
});

export default productsSlice.reducer;