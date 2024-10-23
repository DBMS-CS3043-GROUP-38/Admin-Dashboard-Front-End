import PageLayout from "../../layouts/PageLayout";
import { CustomerSearch} from "../../components/Search";
import CustomGrayCard from "../../components/CustomGrayCard";
import CustomerPieChart from "../../components/CustomerPieChart";
import Grid from "@mui/material/Grid2";
import {CustomTable} from "../../components/OrderDetailsTable";
import {getTopCustomers, getCustomerDistribution} from "../../services/apiService";
import {useEffect, useState} from "react";
import {searchCustomer} from "../../services/apiService";
import {useNavigate} from "react-router-dom";

const Customers = () => {
    const [topCustomers, setTopCustomers] = useState([]);
    const [customerDistribution, setCustomerDistribution] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTopCustomers = async () => {
            try {
                const customers = await getTopCustomers();
                setTopCustomers(customers);
                const distribution = await getCustomerDistribution();
                setCustomerDistribution(distribution);
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
        fetchTopCustomers().then(r => console.log('Top customers fetched'));
    }, [navigate]);


    return (
        <PageLayout heading={'Customers'} subHeading={'Details about customers'}>
            <Grid container spacing={2}>
                <Grid size={6}>
                    <CustomTable heading={'Top Customers'} maxHeight={300} colorSelection={'cyanAccent'} data={topCustomers} />
                </Grid>
                <Grid size={6}>
                    <CustomerPieChart endCustomers={customerDistribution.End} retailers={customerDistribution.Retailer} />
                </Grid>
                <Grid size={12}>
                    <CustomGrayCard>
                        <CustomerSearch label={'Customer'} onSearch={searchCustomer} onResults={setSearchResults} />
                    </CustomGrayCard>
                </Grid>
                <Grid size={12}>
                    <CustomTable heading={'Customer List'} maxHeight={500} colorSelection={'purpleAccent'} data={searchResults} />
                </Grid>
            </Grid>
        </PageLayout>
    );
}


export default Customers;