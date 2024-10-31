import Grid from '@mui/material/Grid2';
import DailySalesCard from "../../components/DailySalesCard";
import {TrainsCompletedCard} from "../../components/CompletedCard";
import PendingOrdersCard from "../../components/PendingOrdersCard";
import {RevenueLineChart} from "../../components/charts/RevanueLineChart";
import {OrdersStatusChart} from "../../components/charts/OrdersStatusChart";
import TodaysOutgingTrainTable from "../../components/TodaysOutgingTrainTable";
import ProductSummary from "../../components/ProductSummeryCard";
import PageLayout from "../../layouts/PageLayout";
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
import {useNavigate} from "react-router-dom";

const Overview = () => {

    const [todaySales, setTodaySales] = useState({current: 0, previous: 0});
    const [completedTrains, setCompletedTrains] = useState([]);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [ordersAttention, setOrdersAttention] = useState([]);
    const [revenueData, setRevenueData] = useState([]);
    const [orderStatuses, setOrderStatuses] = useState([]);
    const [todayTrains, setTodayTrains] = useState([]);
    const [bestProducts, setBestProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const salesData = await getTodaySales();
                const trainsData = await getCompletedTrains();
                const pendingData = await getPendingOrders();
                const attentionData = await getOrdersAttention();
                const statuses = await getOrderStatuses();
                const trainsToday = await getTodayTrains();
                const revenue = await getMonthlyRevenue();
                const bestProducts = await getBestProductsQuarter();

                // Set state for each of the fetched data
                setTodaySales(salesData);
                setCompletedTrains(trainsData);
                setPendingOrders(pendingData);
                setOrdersAttention(attentionData);
                setRevenueData(revenue);
                setOrderStatuses(statuses);
                setTodayTrains(trainsToday);
                setBestProducts(bestProducts);
            } catch (error) {
                console.error(error);
                // Check for specific status codes
                if (error.response) {
                    const { status } = error.response;
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

        // Fetch data immediately on mount
        fetchData().then(r => console.log('Data fetched successfully'));

        // Set up an interval to fetch data every 10 seconds
        const intervalId = setInterval(fetchData, 10000); // 10000 milliseconds = 10 seconds

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <PageLayout heading={"Overview"} subHeading={"Welcome to the Dashboard"}>

            <Grid container spacing={2}>
                <Grid size={3}>
                    <DailySalesCard todaySales={parseFloat(todaySales.current)} prevDaySales={todaySales.previous}/>
                </Grid>
                <Grid size={3}>
                    <TrainsCompletedCard completedTrains={completedTrains.completed}
                                         totalTrains={completedTrains.total}/>
                </Grid>
                <Grid size={3}>
                    <PendingOrdersCard pendingOrders={pendingOrders.pending}/>
                </Grid>
                <Grid size={3}>
                    <OrdersAttentionCard ordersNeedAttention={ordersAttention.attention}/>
                </Grid>
                <Grid size={8}>
                    <RevenueLineChart revenueData={revenueData}/>
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