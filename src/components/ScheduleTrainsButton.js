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
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openResult, setOpenResult] = useState(false);
    const [scheduleResult, setScheduleResult] = useState({
        scheduled: 0,
        startDate: '',
        endDate: ''
    });

    const handleConfirmOpen = () => {
        setOpenConfirm(true);
    };

    const handleConfirmClose = () => {
        setOpenConfirm(false);
    };

    const handleSchedule = async () => {
        handleConfirmClose();
        const response = await onSchedule();
        setScheduleResult({
            scheduled: response.scheduled,
            startDate: response.startDate,
            endDate: response.endDate
        });
        setOpenResult(true);
    };

    const handleResultClose = () => {
        setOpenResult(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const dialogBackgroundColor = scheduleResult.scheduled > 0
        ? colors.greenAccent[800]
        : colors.yellowAccent[800];

    return (
        <>
            <Button
                variant="contained"
                color="success"
                startIcon={<ArrowDownwardIcon />}
                onClick={handleConfirmOpen}
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

            {/* Confirmation Dialog */}
            <Dialog 
                open={openConfirm} 
                onClose={handleConfirmClose}
                PaperProps={{
                    style: {
                        borderRadius: '12px',
                    }
                }}
            >
                <DialogTitle>Confirm Scheduling</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to schedule trains for the another 7 days?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleConfirmClose} 
                        sx={{ color: colors.grey[500] }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleSchedule} 
                        color="success"
                        variant="contained"
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Result Dialog */}
            <Dialog 
                open={openResult} 
                onClose={handleResultClose}
                PaperProps={{
                    style: {
                        borderRadius: '12px',
                    }
                }}
            >
                <Box sx={{ bgcolor: dialogBackgroundColor, p: 2 }}>
                    <DialogTitle sx={{ color: colors.grey[100] }}>
                        Scheduling Complete
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{ 
                            color: colors.grey[100],
                            mb: 2 
                        }}>
                            {scheduleResult.scheduled > 0 
                                ? `${scheduleResult.scheduled} trains have been scheduled successfully.`
                                : 'No trains were scheduled, as there are already trains available for the next 7 days.'}
                        </DialogContentText>
                        {scheduleResult.scheduled > 0 && (
                            <Box sx={{ mt: 2, color: colors.grey[100] }}>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    Schedule Period:
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                    From: {formatDate(scheduleResult.startDate)}
                                </Typography>
                                <Typography variant="body2">
                                    To: {formatDate(scheduleResult.endDate)}
                                </Typography>
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            onClick={handleResultClose} 
                            variant="contained"
                            sx={{ 
                                bgcolor: colors.grey[100],
                                color: colors.grey[900],
                                '&:hover': {
                                    bgcolor: colors.grey[200],
                                }
                            }}
                        >
                            Done
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    );
};

export default ScheduleTrainsButton;