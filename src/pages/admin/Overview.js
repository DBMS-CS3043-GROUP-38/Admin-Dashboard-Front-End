import Grid from '@mui/material/Grid2';
import DailySalesCard from "../../components/DailySalesCard";
import {TrainsCompletedCard} from "../../components/CompletedCard";
import PendingOrdersCard from "../../components/PendingOrdersCard";
import RevanueLineChart from "../../components/charts/RevanueLineChart";
import {OrdersStatusChart} from "../../components/charts/OrdersStatusChart";
import TodaysOutgingTrainTable from "../../components/TodaysOutgingTrainTable";
import ProductSummary from "../../components/ProductSummeryCard";
import PageLayout from "../../layouts/admin/PageLayout";
import OrdersAttentionCard from "../../components/OrdersAttentionCard.";
import {
    getTodaySales,
    getCompletedTrains,
    getPendingOrders,
    getOrdersAttention,
    getOrderStatuses,
    getTodayTrains,
    getMonthlyRevenue,
    getBestProductsQuarter
} from "../../services/apiService";
import {useEffect, useState} from "react";

const Overview = () => {

    const [todaySales, setTodaySales] = useState({current: 0, previous: 0});
    const [completedTrains, setCompletedTrains] = useState([]);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [ordersAttention, setOrdersAttention] = useState([]);
    const [revenueData, setRevenueData] = useState([]);
    const [orderStatuses, setOrderStatuses] = useState([]);
    const [todayTrains, setTodayTrains] = useState([]);
    const [bestProducts, setBestProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const salesData = await getTodaySales();
            const trainsData = await getCompletedTrains();
            const pendingData = await getPendingOrders();
            const attentionData = await getOrdersAttention();
            const statuses = await getOrderStatuses();
            const trainsToday = await getTodayTrains();
            const revenue = await getMonthlyRevenue();
            const bestProducts = await getBestProductsQuarter();

            setTodaySales(salesData);
            setCompletedTrains(trainsData);
            setPendingOrders(pendingData);
            setOrdersAttention(attentionData);
            setRevenueData(revenue);
            setOrderStatuses(statuses);
            setTodayTrains(trainsToday);
            setBestProducts(bestProducts);
        };

        fetchData().then(r => console.log('Data fetched'));
    }, []);

    return (
        <PageLayout heading={"Overview"} subHeading={"Welcome to the Dashboard"}>

            <Grid container spacing={2}>
                <Grid size={3}>
                    <DailySalesCard todaySales={parseFloat(todaySales.current)} prevDaySales={todaySales.previous}/>
                </Grid>
                <Grid size={3}>
                    <TrainsCompletedCard completedTrains={completedTrains.completed} totalTrains={completedTrains.total}/>
                </Grid>
                <Grid size={3}>
                    <PendingOrdersCard pendingOrders={pendingOrders.pending}/>
                </Grid>
                <Grid size={3}>
                    <OrdersAttentionCard ordersNeedAttention={ordersAttention.attention}/>
                </Grid>
                <Grid size={8}>
                    <RevanueLineChart revenueData={revenueData}/>
                </Grid>
                <Grid size={4}>
                    <OrdersStatusChart data={orderStatuses}/>
                </Grid>
                <Grid size={7}>
                    <TodaysOutgingTrainTable data={todayTrains}/>
                </Grid>
                <Grid size={5}>
                    <ProductSummary data={bestProducts}/>
                </Grid>
            </Grid>
        </PageLayout>
    );
}

export default Overview;

// Dummy data remains the same
const productSummeryDummyData = [
    { id: 'P001',name: 'Witcher potion', category: 'Clothes', revenue: 1500 },
    { id: 'P002',name: 'Ciri sword', category: 'Weapons', revenue: 3000 },
    { id: 'P003',name: 'Geralt armor', category: 'Armor', revenue: 2000 },
    { id: 'P004',name: 'Yennefer robe', category: 'Clothes', revenue: 2500 },
    { id: 'P005',name: 'Triss hat', category: 'Clothes', revenue: 1000 },
    { id: 'P006',name: 'Dandelion lute', category: 'Instruments', revenue: 500 },
    { id: 'P007',name: 'Zoltan axe', category: 'Weapons', revenue: 1500 },
    { id: 'P008',name: 'Vesemir sword', category: 'Weapons', revenue: 2000 },
    { id: 'P009',name: 'Eskel bow', category: 'Weapons', revenue: 1000 },
    { id: 'P010',name: 'Lambert dagger', category: 'Weapons', revenue: 800 },
    { id: 'P011',name: 'Keira staff', category: 'Weapons', revenue: 1200 },
    { id: 'P012',name: 'Cahir armor', category: 'Armor', revenue: 3000 },
    { id: 'P013',name: 'Emhyr robe', category: 'Clothes', revenue: 2500 },
    { id: 'P014',name: 'Radovid armor', category: 'Armor', revenue: 2000 },
    { id: 'P015',name: 'Dijkstra robe', category: 'Clothes', revenue: 1500 },
    { id: 'P016',name: 'Philippa hat', category: 'Clothes', revenue: 1000 },
    { id: 'P017',name: 'Vernon lute', category: 'Instruments', revenue: 500 },
    { id: 'P018',name: 'Iorveth axe', category: 'Weapons', revenue: 1500 },
    { id: 'P019',name: 'Roche sword', category: 'Weapons', revenue: 2000 },
    { id: 'P020',name: 'Thaler bow', category: 'Weapons', revenue: 1000 },
    { id: 'P021',name: 'Ves dagger', category: 'Weapons', revenue: 800 },
    { id: 'P022',name: 'Triss staff', category: 'Weapons', revenue: 1200 },
    { id: 'P023',name: 'Letho armor', category: 'Armor', revenue: 3000 },
    { id: 'P024',name: 'Imlerith robe', category: 'Clothes', revenue: 2500 },
    { id: 'P025',name: 'Eredin armor', category: 'Armor', revenue: 2000 },
    { id: 'P026',name: 'Gaunter robe', category: 'Clothes', revenue: 1500 },
    { id: 'P027',name: 'Olgierd hat', category: 'Clothes', revenue: 1000 },
    { id: 'P028',name: 'Regis lute', category: 'Instruments', revenue: 500 }
];
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



const orderStatusesDummy = [
    {status: 'Pending', count: 50},
    {status: 'Pending Train', count: 40},
    {status: 'Train Assigned', count: 20},
    {status: 'In Train', count: 15},
    {status: 'In Store', count: 10},
    {status: 'In Shipment', count: 25},
    {status: 'In Truck', count: 5},
    {status: 'Attention', count: 12},
    {status: 'Delivered', count: 1500},
    {status: 'Cancelled', count: 300},
];

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
