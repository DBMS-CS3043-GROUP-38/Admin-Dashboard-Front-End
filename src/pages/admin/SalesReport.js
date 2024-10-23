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
    getQuarterlySales,
    getQuarterlyOrders,
    getQuarterlyStores,
    getBestCustomer,
    getRevenueData,
    getAvailableYears,
    getAvailableQuarters,
    getRevenuePerStore,
    getTopProductsPerQuarter,
    getTopCustomersPerQuarter,
    getStores,
    getRouteSales
} from "../../services/apiService";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, FormControl, InputLabel, MenuItem, Select, Typography, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import CustomGrayCard from "../../components/CustomGrayCard";
import MultiLineChart from "../../components/MultilineRouteChart";

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
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(0);
    const [routeSales, setRouteSales] = useState([]);


    const handleStoreChange = (event) => {
        setSelectedStore(event.target.value);
        console.log(event.target.value);
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const QSales = await getQuarterlySales();
                const QOrders = await getQuarterlyOrders();
                const QStores = await getQuarterlyStores();
                const QBestCustomer = await getBestCustomer();
                const revenueData = await getRevenueData();
                const stores = await getStores();
                console.log(revenueData);

                setQuarterlySales(QSales);
                setQuarterlyOrders(QOrders);
                setQuarterlyStores(QStores);
                setBestCustomer(QBestCustomer);
                setRevenueData(revenueData);
                setStores(stores);
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

    useEffect(() => {
        const fetchRouteSales = async () => {
            try {
                const response = await getRouteSales(selectedStore);
                setRouteSales(response);
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

        if (selectedStore) {
            fetchRouteSales().then(r => console.log('Route sales fetched'));
        }
    }, [selectedStore]);


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
                <Grid size={6}>
                    <PastRevanueChart revenueData={revenueData}/>
                </Grid>
                <Grid size={6}>
                    < RevenueBarChart fetchAvailableQuarters={getAvailableQuarters}
                                      fetchAvailableYears={getAvailableYears} fetchRevenueData={getRevenuePerStore}/>
                </Grid>
                <Grid size={12}>
                    <CustomGrayCard>
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                    <Typography variant={'h4'}>
                                        Route Sales
                                    </Typography>
                                    <FormControl sx={{minWidth: 500, borderRadius: 10}}>
                                        <InputLabel
                                            id="store-select-label"
                                            sx={{
                                                color: colors.purpleAccent[500],
                                                '&.Mui-focused': {color: colors.purpleAccent[500]}
                                            }}
                                        >
                                            Select Store
                                        </InputLabel>
                                        <Select
                                            variant="outlined"
                                            labelId="store-select-label"
                                            id="store-select"
                                            value={selectedStore || ""} // Handle initial empty state
                                            label="Select Store"
                                            onChange={handleStoreChange}
                                            sx={{
                                                outlineColor: colors.purpleAccent[500],
                                                backgroundColor: colors.purpleAccent[900],
                                                color: colors.purpleAccent[500],
                                                '& .MuiSelect-icon': {color: colors.purpleAccent[500]},
                                                '&:hover': {backgroundColor: colors.purpleAccent[900]},
                                            }}
                                        >
                                            {stores.length > 0 ? (
                                                stores.map((store) => (
                                                    <MenuItem
                                                        key={store.StoreID}
                                                        value={store.StoreID}
                                                        sx={{
                                                            backgroundColor: colors.grey[800],
                                                            '&:hover': {backgroundColor: colors.purpleAccent[800]},
                                                        }}
                                                    >
                                                        {store.City}
                                                    </MenuItem>
                                                ))
                                            ) : (
                                                <MenuItem disabled>
                                                    No Stores Available
                                                </MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid size={12}>
                                <MultiLineChart data={routeSales}/>
                            </Grid>
                        </Grid>
                    </CustomGrayCard>
                </Grid>
                <Grid size={6}>
                    <TopProductsQuarter fetchAvailableQuarters={getAvailableQuarters}
                                        fetchAvailableYears={getAvailableYears}
                                        fetchRevenueData={getTopProductsPerQuarter}/>
                </Grid>
                <Grid size={6}>
                    <TopCusomersQuarter fetchAvailableQuarters={getAvailableQuarters}
                                        fetchAvailableYears={getAvailableYears}
                                        fetchRevenueData={getTopCustomersPerQuarter}/>
                </Grid>
            </Grid>
        </PageLayout>
    );
}