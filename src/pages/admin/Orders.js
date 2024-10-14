import PageLayout from "../../layouts/admin/PageLayout";
import {OrdersStatusChartH} from "../../components/charts/OrdersStatusChart";
import Grid from "@mui/material/Grid2";
import {CustomTable, AttentionOrdersTable } from "../../components/OrderDetailsTable";
import OrderDetailsSearchCard from "../../components/OrderDetailsSearch";
import {getPendingOrdersList, getTrainAssignedOrders, getOrdersInTrain, getOrdersInStore, getOrdersInShipment, getOrdersInTruck, getOrderStatuses} from "../../services/apiService";
import {useEffect, useState} from "react";

export default function Orders() {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [trainAssignedOrders, setTrainAssignedOrders] = useState([]);
    const [inTrain, setInTrain] = useState([]);
    const [InStoreData, setInStoreData] = useState([]);
    const [InShipmentData, setInShipmentData] = useState([]);
    const [InTruckData, setInTruckData] = useState([]);
    const [orderStatuses, setOrderStatuses] = useState([]);

    useEffect(() => {
        const fetchOrderStatuses = async () => {
            try {
                const p = await getPendingOrdersList();
                const t = await getTrainAssignedOrders();
                const i = await getOrdersInTrain();
                const s = await getOrdersInStore();
                const sh = await getOrdersInShipment();
                const tr = await getOrdersInTruck();
                const orderStatuses = await getOrderStatuses();



                setPendingOrders(p);
                setTrainAssignedOrders(t);
                setInTrain(i);
                setInStoreData(s);
                setInShipmentData(sh);
                setInTruckData(tr);
                setOrderStatuses(orderStatuses);
            } catch (error) {
                console.error("Error fetching order statuses:", error);
            }
        };
        fetchOrderStatuses().then(r => console.log("Order Statuses fetched"));
    }, []);


    return (
        <PageLayout subHeading={"View orders and search order details"} heading={"Orders"}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <OrderDetailsSearchCard/>
                </Grid>
                <Grid size={12}>
                    <OrdersStatusChartH data={orderStatuses}/>
                </Grid>
                <Grid size={12}>
                    <AttentionOrdersTable
                        data={attentionOrdersData}
                        colorSelection="redAccent"
                        heading="Attention Required Orders"
                        maxHeight={400}
                    />
                </Grid>
                    <Grid size={6}>
                    <CustomTable heading={"Pending Orders"} data={pendingOrders} maxHeight={300} colorSelection={'yellowAccent'}/>
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

const attentionOrdersData = [
    {
        OrderID: "A001",
        CustomerID: "CUST01",
        CustomerName: "John Doe",
        CustomerCity: "New York",
        CustomerContact: "(555) 123-4567"
    },
    {
        OrderID: "A002",
        CustomerID: "CUST02",
        CustomerName: "Jane Smith",
        CustomerCity: "Los Angeles",
        CustomerContact: "(555) 987-6543"
    },
    {
        OrderID: "A003",
        CustomerID: "CUST03",
        CustomerName: "Alice Johnson",
        CustomerCity: "Chicago",
        CustomerContact: "(555) 246-8102"
    },
    {
        OrderID: "A004",
        CustomerID: "CUST04",
        CustomerName: "Bob Brown",
        CustomerCity: "Houston",
        CustomerContact: "(555) 135-7913"
    },
    {
        OrderID: "A005",
        CustomerID: "CUST05",
        CustomerName: "Carol White",
        CustomerCity: "Miami",
        CustomerContact: "(555) 462-8539"
    }
];
