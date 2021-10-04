import { configureStore } from '@reduxjs/toolkit';
import productReducer from './products/productsSlice';
import modalReducer from './modal/modalSlice'

export default configureStore({
    reducer: {
        products: productReducer,
        modal: modalReducer
    }
})