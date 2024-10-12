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
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {tokens} from "../theme";
import {useNavigate} from "react-router-dom";

const ScheduleTrainsButton = ({  onSchedule }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);

    const handleSchedule = async () => {
        // Trigger scheduling logic
        await onSchedule(); // This function will schedule trains in the backend

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
                    < /Typography>
            </Button>

            {/* Schedule Confirmation Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <Box sx={{ bgcolor: `${colors.purpleAccent["800"]}` }}> {/* Change the background color here */}
                    <DialogTitle>Scheduling Complete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            10 trains have been scheduled successfully.
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
