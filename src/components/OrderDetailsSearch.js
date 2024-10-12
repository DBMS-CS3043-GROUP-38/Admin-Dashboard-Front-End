import React, {useState} from "react";
import {
    Box, Divider, List, ListItem, ListItemText, Paper,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import CustomGrayCard from "./CustomGrayCard";
import {CustomTable} from "./OrderDetailsTable";
import {tokens} from "../theme";
import Grid from "@mui/material/Grid2";

const OrderDetailsSearchCard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [searchOrderID, setSearchOrderID] = useState("");
    const [orderDetails, setOrderDetails] = useState(null);

    const handleSearch = () => {
        // Dummy data
        const dummyOrderDetails = {
            orderID: searchOrderID,
            customerName: "John Doe",
            customerID: "C123",
            value: "$250.00",
            capacity: "75%",
            routeID: "R001",
            city: "New York",
            orderDate: "2024-10-12",
            shipmentID: "S001",
            trainID: "T001",
            truckID: "TR123",
            driverID: "D001",
            assistantID: "A001"
        };

        const dummyTrackingData = [
            {updateDateTime: "2024-10-10 12:00", trackingStatus: "In Store"},
            {updateDateTime: "2024-10-11 08:30", trackingStatus: "In Shipment"},
            {updateDateTime: "2024-10-12 15:45", trackingStatus: "Delivegreen"}
        ];

        const dummyProductDetails = [
            {productName: "Product A", count: 2, amount: "$50.00"},
            {productName: "Product B", count: 1, amount: "$100.00"},
            {productName: "Product C", count: 3, amount: "$100.00"}
        ];

        setOrderDetails({
            info: dummyOrderDetails,
            tracking: dummyTrackingData,
            products: dummyProductDetails
        });
    };

    return (
        <CustomGrayCard>
            <Typography variant="h5" color="text.primary" gutterBottom>
                Search Order Details
            </Typography>
            {/*<Box sx={{display: 'flex', mb: 2}}>*/}
            {/*    <TextField*/}
            {/*        variant="outlined"*/}
            {/*        label="Order ID"*/}
            {/*        value={searchOrderID}*/}
            {/*        onChange={(e) => setSearchOrderID(e.target.value)}*/}
            {/*        sx={{mr: 2}}*/}
            {/*    />*/}
            {/*    <Box*/}
            {/*        component="button"*/}
            {/*        sx={{*/}
            {/*            padding: '10px 20px',*/}
            {/*            color: colors.grey["100"],*/}
            {/*            backgroundColor: colors.greenAccent["500"],*/}
            {/*            border: 'none',*/}
            {/*            cursor: 'pointer',*/}
            {/*            borderRadius: '4px',*/}
            {/*            '&:hover': {*/}
            {/*                backgroundColor: colors.greenAccent["700"]*/}
            {/*            }*/}
            {/*        }}*/}
            {/*        onClick={handleSearch}*/}
            {/*    >*/}
            {/*        Search*/}
            {/*    </Box>*/}
            {/*</Box>*/}

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
                        // Add similar styles as the Select component
                        '&:focus': {
                            outline: `2px solid ${colors.greenAccent[500]}`, // Optional: Focus outline to match
                        },
                    }}
                    onClick={handleSearch}
                >
                    Search
                </Box>
            </Box>

            {orderDetails && (
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <CustomGrayCard >
                            <Typography variant="h4" gutterBottom sx={{mb: 2, color: colors.purpleAccent["300"]}}>
                                Order Details
                            </Typography>
                            <List>
                                {Object.entries(orderDetails.info).map(([key, value], index, array) => (
                                    <React.Fragment key={key}>
                                        <ListItem alignItems="flex-start" sx={{py: 1}}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={4}>
                                                    <ListItemText
                                                        primary={key}
                                                        primaryTypographyProps={{
                                                            variant: 'h5',
                                                            color: colors.greenAccent["400"],
                                                            fontWeight: 'medium'
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={8}>
                                                    <ListItemText
                                                        primary={value || 'N/A'}
                                                        primaryTypographyProps={{
                                                            variant: 'body1',
                                                            color: colors.purpleAccent["400"],
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                        {index < array.length - 1 && (
                                            <Divider variant="inset" component="li"/>
                                        )}
                                    </React.Fragment>
                                ))}
                            </List>
                        </CustomGrayCard>
                    </Grid>

                    <Grid size={12}>
                        <CustomTable
                            data={orderDetails.tracking}
                            colorSelection="yellowAccent"
                            heading="Tracking Status"
                            maxHeight={200}
                        />
                    </Grid>

                    <Grid size={12}>
                        <CustomTable
                            data={orderDetails.products}
                            colorSelection="cyanAccent"
                            heading="Product Details"
                            maxHeight={200}
                        />
                    </ Grid>
                </ Grid>
            )}
        </CustomGrayCard>
    );
};

export default OrderDetailsSearchCard;
