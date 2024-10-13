import React, {useState} from 'react';
import {TextField, Box, Typography, Button} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {tokens} from '../../theme';
import CustomGrayCard from '../../components/CustomGrayCard';
import PageLayout from "../../layouts/admin/PageLayout";

const ReportOrderPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [orderID, setOrderID] = useState('');

    const handleReportOrder = () => {
        console.log(`Reporting Order ID: ${orderID}`);
    };

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
                        onClick={handleReportOrder}
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
            </CustomGrayCard>
        </PageLayout>
    );
};

export default ReportOrderPage;
