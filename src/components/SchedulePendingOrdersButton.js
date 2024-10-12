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
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { tokens } from "../theme";

const SchedulePendingOrdersButton = ({ onSchedulePendingOrders }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);

    const handleSchedule = async () => {
        // Trigger scheduling logic for pending orders
        await onSchedulePendingOrders(); // This function will schedule pending orders in the backend

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
                <Box sx={{ bgcolor: `${colors.yellowAccent["700"]}` }}> {/* Change the background color here */}
                    <DialogTitle>Scheduling Complete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Pending orders have been scheduled successfully.
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

export default SchedulePendingOrdersButton;
