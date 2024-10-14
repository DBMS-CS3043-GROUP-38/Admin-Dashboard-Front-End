import React, {useEffect, useState} from "react";
import {
    Box, Divider, List, ListItem, ListItemText, Paper,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import CustomGrayCard from "./CustomGrayCard";
import { CustomTable } from "./OrderDetailsTable";
import { tokens } from "../theme";
import Grid from "@mui/material/Grid2";
import { getOrderDetails, getOrderProducts, getTrackingDetails } from '../services/apiService';

const OrderDetailsSearchCard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [searchOrderID, setSearchOrderID] = useState("");
    const [orderDetails, setOrderDetails] = useState([]);
    const [error, setError] = useState('');
    const [orderProducts, setOrderProducts] = useState([]);
    const [trackingDetails, setTrackingDetails] = useState([]);

    const handleSearch = async () => {
        try {
            const data = await getOrderDetails(searchOrderID);
            setOrderDetails(data);
            setError(null); // Clear any previous errors
        } catch (err) {
            console.error("Failed to fetch order details:", err);
            setError("Could not fetch order details. Please try again.");
            setOrderDetails(null); // Clear any existing data on error
        }
    };

    useEffect(() => {
        if (!searchOrderID) return;
            const fetchProducts = async () => {
                const products = await getOrderProducts(searchOrderID);
                const tracking = await getTrackingDetails(searchOrderID);
                setOrderProducts(products);
                setTrackingDetails(tracking);
            };
            fetchProducts().then(r => console.log("Order Products fetched and Tracking records fetched"));
    },[orderDetails]);

    return (
        <CustomGrayCard>
            <Typography variant="h5" color="text.primary" gutterBottom>
                Search Order Details
            </Typography>

            <Box sx={{ display: 'flex', mb: 2 }}>
                <TextField
                    variant="outlined"
                    label="Order ID"
                    value={searchOrderID}
                    onChange={(e) => setSearchOrderID(e.target.value)}
                    sx={{
                        mr: 2,
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: colors.greenAccent[900],
                            color: colors.greenAccent[500],
                            '& fieldset': {
                                borderColor: colors.greenAccent[500],
                            },
                            '&:hover fieldset': {
                                borderColor: colors.greenAccent[500],
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: colors.greenAccent[500],
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: colors.greenAccent[500],
                            '&.Mui-focused': {
                                color: colors.greenAccent[500],
                            },
                        },
                    }}
                />
                <Box
                    component="button"
                    sx={{
                        padding: '10px 20px',
                        color: colors.grey["100"],
                        backgroundColor: colors.greenAccent["700"],
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        '&:hover': {
                            backgroundColor: colors.greenAccent["800"],
                        },
                    }}
                    onClick={handleSearch}
                >
                    Search
                </Box>
            </Box>

            {error && <Typography color="error">{error}</Typography>}

            {(orderDetails) && (
                <Grid container spacing={2}>
                    <Grid size={4}>
                        <CustomGrayCard>
                            <Typography variant="h4" gutterBottom sx={{ mb: 2, color: colors.purpleAccent["300"] }}>
                                Order Details
                            </Typography>
                            <List>
                                {Object.entries(orderDetails).map(([key, value], index, array) => (
                                    <React.Fragment key={key}>
                                        <ListItem alignItems="flex-start" sx={{ py: 1 }}>
                                            <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>

                                                    <ListItemText
                                                        primary={`${key} :`}
                                                        primaryTypographyProps={{
                                                            variant: 'h5',
                                                            color: colors.greenAccent["400"],
                                                            fontWeight: 'medium'
                                                        }}
                                                    />


                                                    <ListItemText
                                                        primary={value || 'N/A'}
                                                        primaryTypographyProps={{
                                                            variant: 'body1',
                                                            color: colors.purpleAccent["400"],
                                                        }}
                                                    />
                                            </Box>
                                        </ListItem>
                                    </React.Fragment>
                                ))}
                            </List>
                        </CustomGrayCard>
                    </Grid>
                    <Grid size={8}>
                        <Box display={'flex'} flexDirection={'column'} justifyContent={'flex-start'} >
                        <CustomTable colorSelection={'cyanAccent'} data={orderProducts} heading={'Order Products'} maxHeight={400}/>
                        <CustomTable colorSelection={'yellowAccent'} data={trackingDetails} heading={'Tracking Details'} maxHeight={600}/>
                        </Box>
                    </Grid>
                </Grid>
            )}
        </CustomGrayCard>
    );
};

export default OrderDetailsSearchCard;
