import PageLayout from "../../layouts/PageLayout";
import {OrdersStatusChartH} from "../../components/charts/OrdersStatusChart";
import Grid from "@mui/material/Grid2";
import {CustomTable, AttentionOrdersTable} from "../../components/OrderDetailsTable";
import OrderDetailsSearchCard from "../../components/OrderDetailsSearch";
import {
    getInStoreOrdersListM,
    getTrainAssignedOrdersM,
    getOrdersInTrainM,
    getOrdersInStoreM,
    getOrdersInShipmentM,
    getOrdersInTruckM,
    getOrderStatusesM
} from "../../services/apiService";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Orders() {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [trainAssignedOrders, setTrainAssignedOrders] = useState([]);
    const [inTrain, setInTrain] = useState([]);
    const [InStoreData, setInStoreData] = useState([]);
    const [InShipmentData, setInShipmentData] = useState([]);
    const [InTruckData, setInTruckData] = useState([]);
    const [orderStatuses, setOrderStatuses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderStatuses = async () => {
            try {
                const p = await getInStoreOrdersListM();
                const t = await getTrainAssignedOrdersM();
                const i = await getOrdersInTrainM();
                const s = await getOrdersInStoreM();
                const sh = await getOrdersInShipmentM();
                const tr = await getOrdersInTruckM();
                const orderStatuses = await getOrderStatusesM();


                setPendingOrders(p);
                setTrainAssignedOrders(t);
                setInTrain(i);
                setInStoreData(s);
                setInShipmentData(sh);
                setInTruckData(tr);
                setOrderStatuses(orderStatuses);
            } catch (error) {
                console.error(error);
                // Check for specific status codes
                if (error.response) {
                    const {status} = error.response;
                    if (status === 401 || status === 403) {
                        navigate('/unauthorized'); // Redirect to Unauthorized page
                    } else {
                        navigate('/database-error'); // Redirect to Database Error page
                    }
                } else {
                    // Network error or no response
                    navigate('/database-error'); // Redirect for network or unexpected errors
                }
            }
        };
        fetchOrderStatuses().then(r => console.log("Order Statuses fetched"));
    }, [navigate]);


    return (
        <PageLayout subHeading={"View orders and search order details"} heading={"Orders"}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <OrderDetailsSearchCard/>
                </Grid>
                <Grid size={12}>
                    <OrdersStatusChartH data={orderStatuses}/>
                </Grid>
                <Grid size={6}>
                    <CustomTable heading={"Pending Orders"} data={pendingOrders} maxHeight={300}
                                 colorSelection={'yellowAccent'}/>
                </Grid>
                <Grid size={6}>
                    <CustomTable
                        heading="Train Assigned Orders"
                        data={trainAssignedOrders}
                        maxHeight={300}
                        colorSelection="cyanAccent"
                    />
                </Grid>
                <Grid size={6}>
                    <CustomTable
                        heading="Orders In Train"
                        data={inTrain}
                        maxHeight={300}
                        colorSelection="purpleAccent"
                    />
                </Grid>
                <Grid size={6}>
                    <CustomTable
                        heading="Orders In Store"
                        data={InStoreData}
                        maxHeight={300}
                        colorSelection="purpleAccent"
                    />
                </Grid>
                <Grid size={6}>
                    <CustomTable
                        heading="Orders In Shipment"
                        data={InShipmentData}
                        maxHeight={300}
                        colorSelection="greenAccent"
                    />
                </Grid>
                <Grid size={6}>
                    <CustomTable
                        heading="Orders In Truck"
                        data={InTruckData}
                        maxHeight={300}
                        colorSelection="grey"
                    />
                </Grid>
            </Grid>
        </PageLayout>
    );
}