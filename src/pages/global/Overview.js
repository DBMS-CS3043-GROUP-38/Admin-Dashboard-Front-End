import {Box} from "@mui/material";
import Header from '../../components/Header';
import Grid from '@mui/material/Grid2';
import QuaterlySalesCard from "../../components/QuaterlySalesCard";
import TrainsCompletedCard from "../../components/TrainsCompletedCard";
import OrdersAttentionCard from "../../components/OrdersAttentionCard.";
import PendingOrdersCard from "../../components/PendingOrdersCard";
import RevanueLineChart from "../../components/RevanueLineChart";
import OrdersStatusChart from "../../components/OrdersStatusChart";
import TodaysOutgingTrainTable from "../../components/TodaysOutgingTrainTable";
import ProductSummary from "../../components/ProductSummeryCard";

const Overview = () => {

    return (
        <Box
            display="flex"
            flexDirection="column"
            overflowY="auto" // Allow scrolling if content overflows>
            p={2}
        >
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard"/>
            </Box>

            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={2}>
                    <Grid size={3}>
                        <QuaterlySalesCard currentQuarterSales={100000} previousQuarterSales={80000}/>
                    </Grid>
                    <Grid size={3}>
                        <TrainsCompletedCard completedTrains={10} totalTrains={20}/>
                    </Grid>
                    <Grid size={3}>
                        <PendingOrdersCard pendingOrders={100}/>
                    </Grid>
                    <Grid size={3}>
                        < OrdersAttentionCard ordersNeedAttention={12}/>
                    </Grid>
                    <Grid size={8}>
                        <RevanueLineChart revenueData={revenueData}/>
                    </Grid>
                    <Grid size={4}>
                        <OrdersStatusChart orderStatuses={orderStatuses}/>
                    </Grid>
                    <Grid size={7}>
                        <TodaysOutgingTrainTable/>
                    </Grid>
                    <Grid size={5}>
                        <ProductSummary/>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Overview;


const revenueData = [
    {month: 'Jan', revenue: 4000},
    {month: 'Feb', revenue: 3000},
    {month: 'Mar', revenue: 5000},
    {month: 'Apr', revenue: 6000},
    {month: 'May', revenue: 7000},
    {month: 'Jun', revenue: 8000},
    {month: 'Jul', revenue: 9000},
    {month: 'Aug', revenue: 10000},
    {month: 'Sep', revenue: 11000},
    {month: 'Oct', revenue: 12000},
    {month: 'Nov', revenue: 13000},
    {month: 'Dec', revenue: 14000},
];


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