import Grid from '@mui/material/Grid2';
import DailySalesCard from "../../components/DailySalesCard";
import {
    AvailableAssistantsCard,
    AvailableDriversCard,
    AvailableTrucksCard,
    TrainsCompletedCard,
    TrainsArrivedCard,
} from "../../components/CompletedCard";
import PendingOrdersCard from "../../components/PendingOrdersCard";
import {RevenueLineChart} from "../../components/charts/RevanueLineChart";
import {OrdersStatusChart} from "../../components/charts/OrdersStatusChart";
import TodaysOutgingTrainTable from "../../components/TodaysOutgingTrainTable";
import ProductSummary from "../../components/ProductSummeryCard";
import PageLayout from "../../layouts/PageLayout";
import OrdersAttentionCard from "../../components/OrdersAttentionCard.";
import {
    getTodaySalesM,
    getCompletedTrainsM,
    getPendingOrdersM,
    getOrdersAttentionM,
    getOrderStatusesM,
    getTodayTrainsM,
    getMonthlyRevenueM,
    getBestProductsQuarterM,
    getAvailableAssistantsM,
    getAvailableDriversM,
    getAvailableTrucksM
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
    const [availableAssistants, setAvailableAssistants] = useState({Available: 0, Busy: 0});
    const [availableDrivers, setAvailableDrivers] = useState({Available: 0, Busy: 0});
    const [availableTrucks, setAvailableTrucks] = useState({Available: 0, Busy: 0});
    const navigate = useNavigate();

    useEffect(() => {
            const fetchData = async () => {
                try {
                    const salesData = await getTodaySalesM();
                    const trainsData = await getCompletedTrainsM();
                    const pendingData = await getPendingOrdersM();
                    const attentionData = await getOrdersAttentionM();
                    const statuses = await getOrderStatusesM();
                    const trainsToday = await getTodayTrainsM();
                    const revenue = await getMonthlyRevenueM();
                    const bestProducts = await getBestProductsQuarterM();
                    const availableAssistants = await getAvailableAssistantsM();
                    const availableDrivers = await getAvailableDriversM();
                    const availableTrucks = await getAvailableTrucksM();


                    // Set state for each of the fetched data
                    setTodaySales(salesData);
                    setCompletedTrains(trainsData);
                    setPendingOrders(pendingData);
                    setOrdersAttention(attentionData);
                    setRevenueData(revenue);
                    setOrderStatuses(statuses);
                    setTodayTrains(trainsToday);
                    setBestProducts(bestProducts);
                    setAvailableAssistants(availableAssistants);
                    setAvailableDrivers(availableDrivers);
                    setAvailableTrucks(availableTrucks);
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
            fetchData().then(r => console.log('Data fetched successfully'));
        }
        , []);

    return (
        <PageLayout heading={"Overview"} subHeading={"Welcome to the Dashboard"}>

            <Grid container spacing={2}>
                <Grid size={3}>
                    <TrainsArrivedCard completedTrains={completedTrains.completed}
                                         totalTrains={completedTrains.total}/>
                </Grid>
                <Grid size={3}>
                    <AvailableAssistantsCard availableAssistants={availableAssistants.Available}
                                             totalAssistants={availableAssistants.Available + availableAssistants.Busy}/>
                </Grid>
                <Grid size={3}>
                    <AvailableDriversCard availableDrivers={availableDrivers.Available}
                                          totalDrivers={availableDrivers.Available + availableDrivers.Busy}/>
                </Grid>
                <Grid size={3}>
                    <AvailableTrucksCard availableTrucks={availableTrucks.Available}
                                         totalTrucks={availableTrucks.Available + availableTrucks.Busy}/>
                </Grid>
                <Grid size={7}>
                    <TodaysOutgingTrainTable data={todayTrains}/>
                </Grid>
                <Grid size={5}>
                    <OrdersStatusChart data={orderStatuses}/>
                </Grid>

            </Grid>
        </PageLayout>
    );
}

export default Overview;