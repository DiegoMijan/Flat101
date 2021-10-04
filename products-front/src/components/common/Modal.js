import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectModal } from "../../redux/modal/selector";
import { closeModal } from "../../redux/modal/modalSlice";
import { Snackbar,Alert } from "@mui/material";

export function Modal () {
    let modal = useSelector(selectModal);
    const dispatch = useDispatch();

    const vertical = 'bottom';
    const horizontal = 'center';

    function handleClose () {
        dispatch(closeModal());
    }

    return (
        <Snackbar anchorOrigin={{ vertical, horizontal }} open={modal.open} autoHideDuration={2500} onClose={handleClose}>
            <Alert onClose={handleClose} variant="filled" severity={modal.type} sx={{ width: '100%' }}>
                {modal.message}
            </Alert>
        </Snackbar>
    )
}