import React, { useState } from 'react';
import { TextField, Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../theme';
import CustomGrayCard from '../../components/CustomGrayCard';
import PageLayout from "../../layouts/admin/PageLayout";
import { reportOrder } from '../../services/apiService'; // Make sure to import your API function

const ReportOrderPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [orderID, setOrderID] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const handleReportOrder = async () => {
        try {
            const response = await reportOrder(orderID);
            setResponseMessage(response.message);
        } catch (error) {
            setResponseMessage('Failed to update order status');
            console.error(error);
        }
        setOpenDialog(false);
    };

    const handleDialogOpen = () => setOpenDialog(true);
    const handleDialogClose = () => setOpenDialog(false);

    return (
        <PageLayout heading={"Report Orders"} subHeading={"Report If Anything Happened to the Order"}>
            <CustomGrayCard>
                <Typography variant="h4" color="text.primary" gutterBottom>
                    Report Order
                </Typography>
                <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                    <TextField
                        variant="outlined"
                        label="Order ID"
                        value={orderID}
                        onChange={(e) => setOrderID(e.target.value)}
                        sx={{
                            mr: 2,
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: colors.redAccent[900],
                                color: colors.redAccent[500],
                                '& fieldset': {
                                    borderColor: colors.redAccent[500],
                                },
                                '&:hover fieldset': {
                                    borderColor: colors.redAccent[500],
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: colors.redAccent[500],
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: colors.redAccent[500],
                                '&.Mui-focused': {
                                    color: colors.redAccent[500],
                                },
                            },
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleDialogOpen}
                        sx={{
                            backgroundColor: colors.redAccent[700],
                            color: colors.grey["100"],
                            '&:hover': {
                                backgroundColor: colors.redAccent[800],
                            },
                            '&:focus': {
                                outline: `2px solid ${colors.redAccent[500]}`,
                            },
                        }}
                    >
                        Report Order
                    </Button>
                </Box>
                {responseMessage && (
                    <Typography sx={{ color: colors.yellowAccent[500] }}>
                        {responseMessage}
                    </Typography>
                )}
            </CustomGrayCard>

            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
            >
                <DialogTitle>Confirm Action</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to report order ID {orderID}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleReportOrder}
                        sx={{ color: colors.redAccent[500] }}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </PageLayout>
    );
};

export default ReportOrderPage;
