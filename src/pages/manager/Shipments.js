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

const Shipments = () => {
    const [activeShipments, setActiveShipments] = useState([]);
    const [Statuses, setStatuses] = useState([]);
    const navigate = useNavigate();
    const [selectedShipment, setSelectedShipment] = useState(-1);
    const [orders, setOrders] = useState([]);

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
                setOrders(data);
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
            </Grid>
        </PageLayout>
    );
};

export default Shipments;
