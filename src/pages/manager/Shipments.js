import PageLayout from "../../layouts/PageLayout";
import {
    getActiveShipmentsM,
    getShipmentStatusesM,
    getOrdersByShipment,
    getTruckSchedule,
} from "../../services/apiService";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import ShipmentStatusesCard from "../../components/ShipmentStatuses";
import CustomShipmentTable from "../../components/CustomShipmentTable";
import { CustomTable } from "../../components/OrderDetailsTable";
import CustomGrayCard from "../../components/CustomGrayCard";
import { Box, Divider, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const Shipments = () => {
    const [activeShipments, setActiveShipments] = useState([]);
    const [Statuses, setStatuses] = useState([]);
    const navigate = useNavigate();
    const [selectedShipment, setSelectedShipment] = useState(-1);
    const [orders, setOrders] = useState([]);
    const [truckSchedule, setTruckSchedule] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const shipments = await getActiveShipmentsM();
                const statuses = await getShipmentStatusesM();

                setActiveShipments(shipments);
                console.log(`Shipments: ${shipments}`);
                setStatuses(statuses);
                console.log(`Statuses: ${statuses}`);
            } catch (error) {
                console.error(error);
                // Check for specific status codes
                if (error.response) {
                    const { status } = error.response;
                    if (status === 401 || status === 403) {
                        navigate("/unauthorized"); // Redirect to Unauthorized page
                    } else {
                        navigate("/database-error"); // Redirect to Database Error page
                    }
                } else {
                    // Network error or no response
                    navigate("/database-error"); // Redirect for network or unexpected errors
                }
            }
        };

        fetchData().then((r) => console.log("Data fetched"));
    }, [navigate]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrdersByShipment(selectedShipment);
                const truckSchedule = await getTruckSchedule(selectedShipment);
                setOrders(data);
                setTruckSchedule(truckSchedule);
            } catch (error) {
                console.error(error);
                // Check for specific status codes
                if (error.response) {
                    const { status } = error.response;
                    if (status === 401 || status === 403) {
                        navigate("/unauthorized"); // Redirect to Unauthorized page
                    } else {
                        navigate("/database-error"); // Redirect to Database Error page
                    }
                } else {
                    // Network error or no response
                    navigate("/database-error"); // Redirect for network or unexpected errors
                }
            }
        };

        if (selectedShipment !== -1) {
            fetchOrders().then((r) => console.log("Orders fetched"));
        }
    }, [navigate, selectedShipment]);

    return (
        <PageLayout
            heading={"Shipments"}
            subHeading={"Details about active shipments"}
        >
            <Grid container spacing={2}>
                <Grid size={12}>
                    <ShipmentStatusesCard
                        title={"Active Shipment Statuses"}
                        statusData={Statuses}
                    />
                </Grid>
                <Grid size={12}>
                    <CustomShipmentTable
                        heading={"Active Shipments"}
                        data={activeShipments}
                        maxHeight={600}
                        colorSelection={"greenAccent"}
                        setSelectedShipment={setSelectedShipment}
                    />
                </Grid>
                <Grid size={12}>
                    <CustomTable
                        heading={
                            selectedShipment !== -1
                                ? `Orders for Shipment ${selectedShipment}`
                                : "Click a shipment to view orders"
                        }
                        data={orders}
                        maxHeight={600}
                        colorSelection={"greenAccent"}
                    />
                </Grid>

                <Grid size={12}>
                    <CustomGrayCard>
                        <Typography
                            variant="h6"
                            gutterBottom
                            color="text.primary"
                        >
                            Truck Schedule
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        {truckSchedule.length ? (
                            truckSchedule.map((schedule, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        mb: 2,
                                        color: colors.purpleAccent["300"],
                                    }}
                                    display={"flex"}
                                    flexDirection={"column"}
                                    justifyContent={"space-between"}
                                >
                                    <Typography variant="h5">
                                        Truck ID: {schedule.TruckID}
                                    </Typography>
                                    <Typography variant="h5">
                                        License Plate: {schedule.LicencePlate}
                                    </Typography>
                                    <Typography variant="h5">
                                        Driver: {schedule.DriverName}
                                    </Typography>
                                    <Typography variant="h5">
                                        Assistant: {schedule.AssistantName}
                                    </Typography>
                                    <Typography variant="h5">
                                        Store City: {schedule.StoreCity}
                                    </Typography>
                                    <Typography variant="h5">
                                    {/* 2024-10-26T18:30:00.000Z */}
                                        Schedule Date & Time:{" "}
                                        {schedule.ScheduleDateTime.split("T")[0]}{" "} - {schedule.ScheduleDateTime.split("T")[1].split(".")[0]}
                                    </Typography>
                                    <Typography variant="h5">
                                        Route ID: {schedule.RouteID}
                                    </Typography>
                                    <Typography variant="h5">
                                        Status: {schedule.Status}
                                    </Typography>
                                    <Divider sx={{ my: 1 }} />
                                </Box>
                            ))
                        ) : (
                            <Typography color="text.secondary">
                                No truck schedule available.
                            </Typography>
                        )}
                    </CustomGrayCard>
                </Grid>
            </Grid>
        </PageLayout>
    );
};

export default Shipments;
