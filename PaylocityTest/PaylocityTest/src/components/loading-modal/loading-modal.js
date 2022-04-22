import { Dialog,CircularProgress, DialogContent, DialogTitle } from '@mui/material';
import React, { useContext } from 'react';
import { AppContext} from '../../context/AppContext';

const LoadingModal = () => {
    const { loading } = useContext(AppContext);

    return (
        <Dialog open={loading}>
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