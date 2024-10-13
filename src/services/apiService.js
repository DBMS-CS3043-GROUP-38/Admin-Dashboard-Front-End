import axios from 'axios';
// import dotenv from 'dotenv';
//
// dotenv.config();
const API_BASE_URL = 'http://localhost:3005';


const api = axios.create({
    baseURL: API_BASE_URL,
});

export const testApi = async () => {
    const response = await api.get('/admin/test');
    return response.data;
}

// Fetch quarterly sales data
export const getQuarterlySales = async () => {
    const response = await api.get('/admin/cards/quarterly-sales');
    return response.data;
};

// Fetch trains completed data
export const getCompletedTrains = async () => {
    const response = await api.get('/admin/cards/trains-completed');
    return response.data;
};

// Fetch pending orders data
export const getPendingOrders = async () => {
    const response = await api.get('/admin/cards/pending-orders');
    return response.data;
};

// Fetch orders needing attention data
export const getOrdersAttention = async () => {
    const response = await api.get('/admin/cards/orders-attention');
    return response.data;
};

// Fetch revenue data
export const getRevenueData = async () => {
    const response = await api.get('/admin/charts/revenue-past-year');
    return response.data;
};

// Fetch order status data
export const getOrderStatuses = async () => {
    const response = await api.get('/admin/charts/order-statuses');
    return response.data;
};

// Fetch today’s outgoing trains data
export const getTodayTrains = async () => {
    const response = await api.get('/admin/tables/trains-today');
    return response.data;
};

// Fetch todays sales data
export const getTodaySales = async () => {
    const response = await api.get('/admin/cards/today-sales');
    return response.data;
};

// Fetch revanue for past month
export const getMonthlyRevenue = async () => {
    const response = await api.get('/admin/charts/revenue-past-month');
    return response.data;
};

//Fetch the best products of the quarter
export const getBestProductsQuarter = async () => {
    const response = await api.get('/admin/tables/best-products-quarter');
    return response.data;
};
