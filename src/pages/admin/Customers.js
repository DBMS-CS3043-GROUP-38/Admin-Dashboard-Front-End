import PageLayout from "../../layouts/admin/PageLayout";
import { CustomerSearch} from "../../components/Search";
import CustomGrayCard from "../../components/CustomGrayCard";
import CustomerPieChart from "../../components/CustomerPieChart";
import Grid from "@mui/material/Grid2";
import {CustomTable} from "../../components/OrderDetailsTable";

const Customers = () => {
    return (
        <PageLayout heading={'Customers'} subHeading={'Details about customers'}>
            <Grid container spacing={2}>
                <Grid size={6}>
                    <CustomTable heading={'Top Customers'} maxHeight={300} colorSelection={'cyanAccent'} data={topCustomers} />
                </Grid>
                <Grid size={6}>
                    <CustomerPieChart endCustomers={10} retailers={5} />
                </Grid>
                <Grid size={12}>
                    <CustomGrayCard>
                        <CustomerSearch label={'Customer'} />
                    </CustomGrayCard>
                </Grid>
                <Grid size={12}>
                    <CustomTable heading={'Customer List'} maxHeight={500} colorSelection={'purpleAccent'} data={topCustomers} />
                </Grid>
            </Grid>
        </PageLayout>
    );
}


export default Customers;

const topCustomers = [
    { id: 1, name: 'John Doe', totalOrders: 10, totalRevenue: 1000 },
    { id: 2, name: 'Jane Doe', totalOrders: 5, totalRevenue: 500 },
    { id: 3, name: 'Alice', totalOrders: 3, totalRevenue: 300 },
    { id: 4, name: 'Bob', totalOrders: 2, totalRevenue: 200 },
    { id: 5, name: 'Charlie', totalOrders: 1, totalRevenue: 100 },
    { id: 6, name: 'David', totalOrders: 1, totalRevenue: 100 },
    { id: 7, name: 'Eve', totalOrders: 1, totalRevenue: 100 },
    { id: 8, name: 'Frank', totalOrders: 1, totalRevenue: 100 },
    { id: 9, name: 'Grace', totalOrders: 1, totalRevenue: 100 },
    { id: 10, name: 'Hannah', totalOrders: 1, totalRevenue: 100 },
];