import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    useTheme,
    Typography, Box,
} from '@mui/material';
import {tokens} from "../theme";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const DispatchButton = ({  onDispatch }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);

    const handleSchedule = async () => {
        // Trigger scheduling logic
        await onDispatch(); // This function will schedule trains in the backend

        // Show prompt after scheduling
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                variant="contained"
                color="success"
                startIcon={<ShoppingCartCheckoutIcon />}
                onClick={handleSchedule}
                sx={{
                    mt: 2,
                    mb: 2,
                    ml: 2,
                    p: '20px 50px',
                }}
            >
                <Typography variant="h5">
                    Dispatch
                < /Typography>
            </Button>

            {/* Schedule Confirmation Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <Box sx={{ bgcolor: `${colors.purpleAccent["800"]}` }}> {/* Change the background color here */}
                    <DialogTitle>Scheduling Complete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Orders Has been Dispatched Successfully.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color='text.secondary'>
                            <Typography variant='h6'>
                                Done.
                            </Typography>
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>

        </>
    );
};

export default DispatchButton;
