import PageLayout from "../../layouts/admin/PageLayout";
import {RevenueGroupedBarChart} from "../../components/charts/SalesReportCharts";
import RevanueLineChart from "../../components/charts/RevanueLineChart";
import TopProductsQuater from "../../components/TopProductsQuater";
import Grid from "@mui/material/Grid2";
import TopCusomersQuarter from "../../components/TopCusomersQuarter";
import QuaterlySalesCard from "../../components/QuaterlySalesCard";
import QuarterlyOrdersCard from "../../components/QuarterlyOrders";
import TopPerformingStoreCard from "../../components/TopStore";
import BestCustomer from "../../components/BestCustomer";

export default function SalesReport() {
    return (
        <PageLayout heading={'Sales Report'} subHeading={'Get Quarterly sales reports and more'}>
            <Grid container spacing={2}>
                <Grid size={3}>
                    <QuaterlySalesCard currentQuarterSales={100000} previousQuarterSales={80000}/>
                </Grid>
                <Grid   size={3}>
                    <QuarterlyOrdersCard currentQuarterOrders={1000} previousQuarterOrders={800} />
                </Grid>
                <Grid size={3}>
                    <TopPerformingStoreCard storeId={'001'} currentRevenue={'10000'} previousRevenue={'12020'} storeName={'Kurunegala'}/>
                </Grid>
                <Grid size={3}>
                    <BestCustomer customerId={'001'} customerName={'Alice Johnson'} customerCity={'Kurunegala'}/>
                </Grid>
                <Grid size={6}>
                    <RevanueLineChart revenueData={revenueDataAnnual}/>
                </Grid>
                <Grid size={6}>
                    <RevenueGroupedBarChart revenueData={revenueData} />
                </Grid>
                <Grid size={6}>
                    <TopProductsQuater topProducts={topProducts} colorSelection={'yellowAccent'}/>
                </Grid>
                <Grid size={6}>
                    <TopCusomersQuarter topCustomers={topCustomers}/>
                </Grid>
            </Grid>
        </PageLayout>
    );
}

const revenueDataAnnual = [
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
const revenueData = {
    "2023": [
        { quarter: "Q1", store1: 1000, store2: 1500, store3: 1200, store4: 1100, store5: 1300 },
        { quarter: "Q2", store1: 2000, store2: 2500, store3: 2300, store4: 2200, store5: 2400 },
        { quarter: "Q3", store1: 3000, store2: 3500, store3: 3300, store4: 3200, store5: 3400 },
        { quarter: "Q4", store1: 4000, store2: 4500, store3: 4300, store4: 4200, store5: 4400 },
    ],
    "2024": [
        { quarter: "Q1", store1: 3000, store2: 3500, store3: 3300, store4: 3200, store5: 3400 },
        { quarter: "Q2", store1: 4000, store2: 4500, store3: 4300, store4: 4200, store5: 4400 },
        { quarter: "Q3", store1: 5000, store2: 5500, store3: 5300, store4: 5200, store5: 5400 },
        { quarter: "Q4", store1: 6000, store2: 6500, store3: 6300, store4: 6200, store5: 6400 },
    ]
};

const topProducts = {
    2023: {
        Q1: {
            "P001": { productName: "Product 1", revenue: 1000, salesCount: 50 },
            "P002": { productName: "Product 2", revenue: 1500, salesCount: 75 },
            // More products...
        },
        Q2: {
            "P001": { productName: "Product 1", revenue: 2000, salesCount: 80 },
            "P002": { productName: "Product 2", revenue: 2500, salesCount: 100 },
            // More products...
        },
        Q3: {
            "P001": { productName: "Product 1", revenue: 3000, salesCount: 90 },
            "P002": { productName: "Product 2", revenue: 3500, salesCount: 110 },
            // More products...
        },
        Q4: {
            "P001": { productName: "Product 1", revenue: 4000, salesCount: 100 },
            "P002": { productName: "Product 2", revenue: 4500, salesCount: 120 },
            // More products...
        },
    },
    2024: {
        Q1: {
            "P003": { productName: "Product 3", revenue: 3000, salesCount: 60 },
            // More products...
        },
        // More quarters...
    },
    // More years...
};


const topCustomers = {
    2023: {
        Q1: [
            { customerID: "C001", customerName: "Alice Johnson", revenue: 5000 },
            { customerID: "C002", customerName: "Bob Smith", revenue: 4500 },
        ],
        Q2: [
            { customerID: "C003", customerName: "Charlie Brown", revenue: 3000 },
            { customerID: "C004", customerName: "David Wilson", revenue: 2000 },
        ],
    },
    2024: {
        Q1: [
            { customerID: "C005", customerName: "Eva Green", revenue: 7000 },
            { customerID: "C006", customerName: "Frank Wright", revenue: 4000 },
        ],
        Q2: [
            { customerID: "C007", customerName: "George Brown", revenue: 6000 },
            { customerID: "C008", customerName: "Hannah White", revenue: 8000 },
        ],
    },
};