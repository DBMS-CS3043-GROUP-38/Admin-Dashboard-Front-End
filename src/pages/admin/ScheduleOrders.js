import PageLayout from "../../layouts/admin/PageLayout";
import CustomTable from "../../components/OrderDetailsTable";
import Grid from "@mui/material/Grid2";
import {Box, colors, useTheme} from "@mui/material";
import SchedulePendingOrdersButton from "../../components/SchedulePendingOrdersButton";
import {tokens} from "../../theme";

export default function ScheduleOrders() {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <PageLayout heading={"Schedule Orders"} subHeading={"Schedule pending orders"}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <CustomTable heading={"Pending Orders"} data={pendingOrders} maxHeight={400} colorSelection={'yellowAccent'}/>
                </Grid>
            </Grid>
            <Box sx={{display: 'flex', width: '100%', alignContent:'center', justifyContent:'center'}}>
                <SchedulePendingOrdersButton onSchedule={async () => {
                    console.log("Scheduling orders...");
                }}/>
            </Box>
        </PageLayout>
    );
}


const pendingOrders = [
    {
        orderId: "ORD001",
        orderDate: "2024-10-10",
        price: "$150.00",
        capacity: "50%",
        destinationCity: "New York",
        routeId: "R001"
    },
    {
        orderId: "ORD002",
        orderDate: "2024-10-11",
        price: "$200.00",
        capacity: "70%",
        destinationCity: "Chicago",
        routeId: "R002"
    },
    {
        orderId: "ORD003",
        orderDate: "2024-10-12",
        price: "$120.00",
        capacity: "30%",
        destinationCity: "Los Angeles",
        routeId: "R003"
    },
    {
        orderId: "ORD004",
        orderDate: "2024-10-13",
        price: "$180.00",
        capacity: "85%",
        destinationCity: "San Francisco",
        routeId: "R004"
    },
    {
        orderId: "ORD005",
        orderDate: "2024-10-14",
        price: "$250.00",
        capacity: "60%",
        destinationCity: "Houston",
        routeId: "R005"
    },
    {
        orderId: "ORD006",
        orderDate: "2024-10-15",
        price: "$300.00",
        capacity: "95%",
        destinationCity: "Seattle",
        routeId: "R006"
    },
    {
        orderId: "ORD007",
        orderDate: "2024-10-16",
        price: "$170.00",
        capacity: "40%",
        destinationCity: "Miami",
        routeId: "R007"
    },
    {
        orderId: "ORD008",
        orderDate: "2024-10-17",
        price: "$220.00",
        capacity: "75%",
        destinationCity: "Boston",
        routeId: "R008"
    },
    {
        orderId: "ORD009",
        orderDate: "2024-10-18",
        price: "$190.00",
        capacity: "55%",
        destinationCity: "Denver",
        routeId: "R009"
    },
    {
        orderId: "ORD010",
        orderDate: "2024-10-19",
        price: "$270.00",
        capacity: "80%",
        destinationCity: "Las Vegas",
        routeId: "R010"
    },
    {
        orderId: "ORD011",
        orderDate: "2024-10-20",
        price: "$230.00",
        capacity: "65%",
        destinationCity: "Orlando",
        routeId: "R011"
    },
    {
        orderId: "ORD012",
        orderDate: "2024-10-21",
        price: "$280.00",
        capacity: "90%",
        destinationCity: "Portland",
        routeId: "R012"
    },
    {
        orderId: "ORD013",
        orderDate: "2024-10-22",
        price: "$210.00",
        capacity: "50%",
        destinationCity: "Phoenix",
        routeId: "R013"
    },
    {
        orderId: "ORD014",
        orderDate: "2024-10-23",
        price: "$260.00",
        capacity: "75%",
        destinationCity: "Philadelphia",
        routeId: "R014"
    },
    {
        orderId: "ORD015",
        orderDate: "2024-10-24",
        price: "$290.00",
        capacity: "95%",
        destinationCity: "San Diego",
        routeId: "R015"
    },
    {
        orderId: "ORD016",
        orderDate: "2024-10-25",
        price: "$240.00",
        capacity: "60%",
        destinationCity: "Austin",
        routeId: "R016"
    },
    {
        orderId: "ORD017",
        orderDate: "2024-10-26",
        price: "$200.00",
        capacity: "80%",
        destinationCity: "Dallas",
        routeId: "R017"
    },
];