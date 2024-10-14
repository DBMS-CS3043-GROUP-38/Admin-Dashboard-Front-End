import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    useTheme,
    Typography,
    Box,
} from '@mui/material';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { tokens } from "../theme";

const SchedulePendingOrdersButton = ({ onSchedulePendingOrders, onClose }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [scheduledOrders, setScheduledOrders] = useState(0);
    const [dialogColor, setDialogColor] = useState(colors.yellowAccent["700"]); // Default color

    const handleSchedule = async () => {
        try {
            const response = await onSchedulePendingOrders(); // Call the function passed as prop

            // Check if response is valid
            if (response) {
                const { message, ScheduledOrders } = response; // Extract values from response
                setDialogMessage(message);
                setScheduledOrders(ScheduledOrders);

                // Determine color based on response
                if (ScheduledOrders === 0) {
                    setDialogColor(colors.yellowAccent["700"]); // Set red accent color for no orders scheduled
                } else if (ScheduledOrders > 0) {
                    setDialogColor(colors.greenAccent["700"]); // Set green accent color for successful scheduling
                }
            } else {
                // Handle case where no response is received
                setDialogMessage('No response received from the server. Please try again.');
                setDialogColor(colors.redAccent["700"]); // Set red accent color for no response
            }
        } catch (error) {
            // Handle error case
            setDialogMessage('Failed to schedule orders. Please try again later.');
            setDialogColor(colors.redAccent["700"]); // Set red accent color for error
        } finally {
            setOpen(true); // Open the dialog with the final message
        }
    };

    const handleClose = () => {
        onClose(); // Call the function passed as prop
        setOpen(false);
    };

    return (
        <>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: colors.yellowAccent["700"],
                    '&:hover': {
                        backgroundColor: colors.yellowAccent["800"],
                    },
                    mt: 2,
                    mb: 2,
                    ml: 2,
                    p: '20px 50px',
                    color: 'black'
                }}
                startIcon={<AccessTimeIcon />}
                onClick={handleSchedule}
            >
                <Typography variant="h5">
                    Schedule Pending Orders
                </Typography>
            </Button>

            {/* Schedule Confirmation Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <Box sx={{ bgcolor: dialogColor }}> {/* Use the determined dialog color */}
                    <DialogTitle>Scheduling Result</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {dialogMessage}
                        </DialogContentText>
                        {scheduledOrders > 0 && (
                            <DialogContentText>
                                {scheduledOrders} order(s) scheduled successfully.
                            </DialogContentText>
                        )}
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

export default SchedulePendingOrdersButton;
