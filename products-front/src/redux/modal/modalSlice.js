import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open: false,
    massage: "",
    type: undefined
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.open = true;
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        closeModal: (state)=> initialState
    },
})

export const {openModal, closeModal} = modalSlice.actions;

export default modalSlice.reducer;