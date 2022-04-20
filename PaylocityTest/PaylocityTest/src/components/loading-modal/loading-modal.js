import { Dialog,CircularProgress, DialogContent, DialogTitle } from '@mui/material';
import React, { useContext } from 'react';
import { AppContext} from '../../context/AppContext';

const LoadingModal = () => {
    const { loading,dispatch } = useContext(AppContext);

    const HandleClose = () => {
        dispatch({

            type:'TOGGLE_LOADING'
        })
    }

    return (
        <Dialog open={loading} onClose={HandleClose}>
            <DialogTitle>
                <strong>Loading... Please wait</strong>
            </DialogTitle>
            <DialogContent sx={{
                margin: 'auto'
            }}>
                <CircularProgress />
            </DialogContent>
        </Dialog>
    );
};

export default LoadingModal;