import PageLayout from "../../layouts/admin/PageLayout";
import {OrdersStatusChartH} from "../../components/charts/OrdersStatusChart";
import Grid from "@mui/material/Grid2";
import {CustomTable, AttentionOrdersTable } from "../../components/OrderDetailsTable";
import OrderDetailsSearchCard from "../../components/OrderDetailsSearch";

export default function Orders() {
    return (
        <PageLayout subHeading={"View orders and search order details"} heading={"Orders"}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <OrderDetailsSearchCard/>
                </Grid>
                <Grid size={12}>
                    <OrdersStatusChartH orderStatuses={orderStatuses}/>
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
                        data={TrainAssignedData}
                        maxHeight={300}
                        colorSelection="cyanAccent"
                    />
                </Grid>
                <Grid size={6}>
                    <CustomTable
                        heading="Orders In Train"
                        data={InTrainData}
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

const orderStatuses = {
    pending: 50,
    pendingTrain: 30,
    trainAssigned: 20,
    inTrain: 15,
    inStore: 10,
    inShipment: 25,
    inTruck: 5,
    attention: 12,
    delivered: 1500, // high number
    cancelled: 300,   // high number
};


const pendingOrders = [
    { orderID: "ORD001", orderDate: "2024-10-10", destinationCity: "New York", routeId: "R001" },
    { orderID: "ORD002", orderDate: "2024-10-11", destinationCity: "Chicago", routeId: "R002" },
    { orderID: "ORD003", orderDate: "2024-10-12", destinationCity: "Los Angeles", routeId: "R003" },
    { orderID: "ORD004", orderDate: "2024-10-13", destinationCity: "San Francisco", routeId: "R004" },
    { orderID: "ORD005", orderDate: "2024-10-14", destinationCity: "Houston", routeId: "R005" },
    { orderID: "ORD006", orderDate: "2024-10-15", destinationCity: "Boston", routeId: "R006" },
    { orderID: "ORD007", orderDate: "2024-10-16", destinationCity: "Dallas", routeId: "R007" }
]



const TrainAssignedData = [
    { orderId: "ORD001", trainId: "T001", trainTime: "10:00 AM", destination: "New York" },
    { orderId: "ORD002", trainId: "T002", trainTime: "12:00 PM", destination: "Los Angeles" },
    // Add more Train Assigned data
];

const InTrainData = [
    { orderId: "ORD003", trainId: "T003", trainTime: "3:00 PM", destination: "Chicago" },
    { orderId: "ORD004", trainId: "T004", trainTime: "5:00 PM", destination: "San Francisco" },
    // Add more In Train data
];

const InStoreData = [
    { orderId: "ORD005", storeId: "S001", routeId: "R001", city: "Boston" },
    { orderId: "ORD006", storeId: "S002", routeId: "R002", city: "Dallas" },
    // Add more In Store data
];

const InShipmentData = [
    { orderId: "ORD007", shipmentId: "SH001", status: "Ready" },
    { orderId: "ORD008", shipmentId: "SH002", status: "Not Ready" },
    // Add more In Shipment data
];

const InTruckData = [
    { orderId: "ORD009", driverId: "D001", assistantId: "A001", truckId: "T001", routeId: "R003" },
    { orderId: "ORD010", driverId: "D002", assistantId: "A002", truckId: "T002", routeId: "R004" },
    // Add more In Truck data
];

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
