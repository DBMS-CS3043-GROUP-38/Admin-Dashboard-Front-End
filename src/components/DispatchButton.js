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
import { tokens } from "../theme";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const DispatchButton = ({ onDispatch , resetData}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);
    const [dispatchedOrders, setDispatchedOrders] = useState(0);
    const [dialogMessage, setDialogMessage] = useState('');

    const handleSchedule = async () => {
        // Trigger scheduling logic
        const response = await onDispatch(); // This function will schedule trains in the backend
        console.log(response);

        // Extract dispatched orders from the response
        const { dispatchedOrders: dispatchedCount, message } = response;
        setDispatchedOrders(dispatchedCount);
        setDialogMessage(message); // Set the dialog message

        // Show prompt after scheduling
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        resetData();
    };

    // Determine the dialog background color based on dispatchedOrders
    const dialogBgColor = dispatchedOrders === 0 ? colors.yellowAccent[800] : colors.greenAccent[800];

    return (
        <>
            <Button
                variant="contained"
                startIcon={<ShoppingCartCheckoutIcon />}
                onClick={handleSchedule}
                sx={{
                    mt: 2,
                    mb: 2,
                    ml: 2,
                    p: '20px 50px',
                    bgcolor: colors.yellowAccent["800"]
                }}
            >
                <Typography variant="h5">
                    Dispatch the Train With Or Without Orders
                </Typography>
            </Button>

            {/* Schedule Confirmation Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <Box sx={{ bgcolor: dialogBgColor }}> {/* Change the background color here */}
                    <DialogTitle>Scheduling Complete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {dialogMessage} {/* Display the message from the response */}
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
