import PageLayout from "../../layouts/PageLayout";
import {RevenueBarChart} from "../../components/charts/SalesReportCharts";
import {PastRevanueChart} from "../../components/charts/RevanueLineChart";
import TopProductsQuarter from "../../components/TopProductsQuater";
import Grid from "@mui/material/Grid2";
import TopCusomersQuarter from "../../components/TopCusomersQuarter";
import QuaterlySalesCard from "../../components/QuaterlySalesCard";
import QuarterlyOrdersCard from "../../components/QuarterlyOrders";
import TopPerformingStoreCard from "../../components/TopStore";
import {BestCustomerCard} from "../../components/BestCustomer";
import {
    getQuarterlySalesM,
    getQuarterlyOrdersM,
    getQuarterlyStoresM,
    getBestCustomerM,
    getRevenueDataM,
    getAvailableYearsM,
    getAvailableQuartersM,
    getRevenuePerStoreM,
    getTopProductsPerQuarterM,
    getTopCustomersPerQuarterM
} from "../../services/apiService";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function SalesReport() {
    const [quarterlySales, setQuarterlySales] = useState({"current": "NaN", "previous": "NaN"});
    const [quarterlyOrders, setQuarterlyOrders] = useState({"current": "NaN", "previous": "NaN"});
    const [QuarterlyStores, setQuarterlyStores] = useState([
        {"StoreID": 'Nan', "StoreCity": 'NaN', "TotalRevenue": 'NaN'}
    ]);
    const [BestCustomer, setBestCustomer] = useState([
        {"Name": 'NaN', "City": 'NaN', "ID": 'NaN', "TotalRevenue": 'NaN'}
    ]);
    const [revenueData, setRevenueData] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const QSales = await getQuarterlySalesM();
                const QOrders = await getQuarterlyOrdersM();
                const QStores = await getQuarterlyStoresM();
                const QBestCustomer = await getBestCustomerM();
                const revenueData = await getRevenueDataM();
                console.log(revenueData);

                setQuarterlySales(QSales);
                setQuarterlyOrders(QOrders);
                setQuarterlyStores(QStores);
                setBestCustomer(QBestCustomer);
                setRevenueData(revenueData);
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
        }

        fetchData().then(r => console.log('Data fetched'));
    }, [navigate]);


    return (
        <PageLayout heading={'Sales Report'} subHeading={'Get Quarterly sales reports and more'}>
            <Grid container spacing={2}>
                <Grid size={3}>
                    <QuaterlySalesCard currentQuarterSales={parseFloat(quarterlySales.current)}
                                       previousQuarterSales={quarterlySales.previous}/>
                </Grid>
                <Grid size={3}>
                    <QuarterlyOrdersCard currentQuarterOrders={parseFloat(quarterlyOrders.current)}
                                         previousQuarterOrders={quarterlyOrders.previous}/>
                </Grid>
                <Grid size={3}>
                    <TopPerformingStoreCard storeId={QuarterlyStores[0].StoreID}
                                            storeName={QuarterlyStores[0].StoreCity}
                                            currentRevenue={parseFloat(QuarterlyStores[0].TotalRevenue)}/>
                </Grid>
                <Grid size={3}>
                    <BestCustomerCard customerName={BestCustomer[0].Name} customerCity={BestCustomer[0].City}
                                      customerId={BestCustomer[0].ID} totalRevenue={BestCustomer[0].TotalRevenue}/>
                </Grid>
                <Grid size={12}>
                    <PastRevanueChart revenueData={revenueData}/>
                </Grid>
            </Grid>
        </PageLayout>
    );
}