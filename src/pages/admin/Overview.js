import Grid from '@mui/material/Grid2';
import QuaterlySalesCard from "../../components/QuaterlySalesCard";
// import TrainsCompletedCard from "../../components/TrainsCompletedCard";
import {TrainsCompletedCard} from "../../components/CompletedCard";
import PendingOrdersCard from "../../components/PendingOrdersCard";
import RevanueLineChart from "../../components/charts/RevanueLineChart";
import {OrdersStatusChart} from "../../components/charts/OrdersStatusChart";
import TodaysOutgingTrainTable from "../../components/TodaysOutgingTrainTable";
import ProductSummary from "../../components/ProductSummeryCard";
import PageLayout from "../../layouts/admin/PageLayout";
import OrdersAttentionCard from "../../components/OrdersAttentionCard.";

const Overview = () => {

    return (
        <PageLayout heading={"Overview"} subHeading={"Dashboard"}>

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
                    <TodaysOutgingTrainTable data={todayTrains}/>
                </Grid>
                <Grid size={5}>
                    <ProductSummary/>
                </Grid>
            </Grid>
        </PageLayout>
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

const todayTrains = [
    { id: 'T001', destination: 'City A', capacityFilled: 80, fullCapacity: 100, time: '2024-10-12T01:00:00Z' },
    { id: 'T002', destination: 'City B', capacityFilled: 50, fullCapacity: 100, time: '2024-10-12T05:16:00Z' },
    { id: 'T003', destination: 'City C', capacityFilled: 30, fullCapacity: 100, time: '2024-10-12T05:26:30Z' },
    { id: 'T004', destination: 'City D', capacityFilled: 90, fullCapacity: 100, time: '2024-10-12T13:45:00Z' },
    { id: 'T005', destination: 'City E', capacityFilled: 20, fullCapacity: 100, time: '2024-10-12T15:30:00Z' },
    { id: 'T006', destination: 'City F', capacityFilled: 100, fullCapacity: 100, time: '2024-10-12T17:00:00Z' },
    { id: 'T007', destination: 'City G', capacityFilled: 70, fullCapacity: 100, time: '2024-10-12T18:00:00Z' },
    { id: 'T008', destination: 'City H', capacityFilled: 0, fullCapacity: 100, time: '2024-10-12T20:00:00Z' },
    { id: 'T009', destination: 'City I', capacityFilled: 60, fullCapacity: 100, time: '2024-10-12T21:30:00Z' },
    { id: 'T010', destination: 'City J', capacityFilled: 40, fullCapacity: 100, time: '2024-10-12T23:00:00Z' },
    { id: 'T011', destination: 'City K', capacityFilled: 20, fullCapacity: 100, time: '2024-10-13T01:00:00Z' },
];
