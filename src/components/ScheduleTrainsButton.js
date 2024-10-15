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
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { tokens } from "../theme";

const ScheduleTrainsButton = ({ onSchedule }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);
    const [scheduledCount, setScheduledCount] = useState(0); // State to hold the scheduled train count

    const handleSchedule = async () => {
        // Trigger scheduling logic
        const response = await onSchedule(); // Get the response from the scheduling function
        setScheduledCount(response.scheduled); // Update the count based on the response

        // Show prompt after scheduling
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Determine the background color based on scheduledCount
    const dialogBackgroundColor = scheduledCount > 0
        ? colors.greenAccent[800]
        : colors.yellowAccent[800];

    return (
        <>
            <Button
                variant="contained"
                color="success"
                startIcon={<ArrowDownwardIcon />}
                onClick={handleSchedule}
                sx={{
                    mt: 2,
                    mb: 2,
                    ml: 2,
                    p: '20px 50px',
                }}
            >
                <Typography variant="h5">
                    Schedule
                </Typography>
            </Button>

            {/* Schedule Confirmation Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <Box sx={{ bgcolor: dialogBackgroundColor }}> {/* Change the background color here */}
                    <DialogTitle>Scheduling Complete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {scheduledCount > 0
                                ? `${scheduledCount} trains have been scheduled successfully.`
                                : 'No trains have been scheduled, as there are already available trains for the next 7 days.'}
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

export default ScheduleTrainsButton;
