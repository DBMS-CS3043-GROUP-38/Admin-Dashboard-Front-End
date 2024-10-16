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

//Fetch weekly trains
export const getWeeklyTrains = async () => {
    const response = await api.get('/admin/tables/weekly-trains');
    return response.data;
};

//Schedule trains
export const scheduleTrains = async () => {
    try {
        const response = await api.post('/admin/buttons/schedule-trains', {
            // If you need to send any data, you can add it here
        });

        return response.data; // Return the number of orders scheduled from the response
    } catch (error) {
        console.error('Error scheduling trains:', error);
        throw error; // Re-throw error to handle it in the component
    }
};

//Get scheduled trains
export const getScheduledTrains = async () => {
    const response = await api.get('/admin/tables/scheduled-trains');
    return response.data;
};

export const getActiveTrains = async () => {
    const response = await api.get('/admin/tables/active-trains');
    return response.data;
}


export const getTrainStatuses = async () => {
    const response = await api.get('/admin/cards/train-statuses');
    return response.data;
}

export const getPendingOrdersList = async () => {
    const response = await api.get('/admin/tables/pending-orders-list');
    return response.data;
}

export const scheduleOrders = async () => {
    try {
        const response = await api.post('/admin/buttons/schedule-orders', {
            // If you need to send any data, you can add it here
        });

        return response.data; // Return the number of orders scheduled from the response
    } catch (error) {
        console.error('Error scheduling orders:', error);
        throw error; // Re-throw error to handle it in the component
    }
}

export const getTodayTrainsSelector = async () => {
    const response = await api.get('/admin/selectors/today-trains');
    return response.data;
}

export const getOrdersByTrain = async (trainSchID) => {
    const response = await api.get(`/admin/tables/orders-by-train/${trainSchID}`);
    return response.data;
}

export const dispatchTrain = async (trainSchID) => {
    const response = await api.post(`/admin/buttons/dispatch-train/${trainSchID}`);
    return response.data;
}

export const getQuarterlyOrders = async () => {
    const response = await api.get('/admin/cards/quarterly-orders');
    return response.data;
}

export const getQuarterlyStores = async () => {
    const response = await api.get('/admin/cards/quarterly-store');
    return response.data;
}

export const getBestCustomer = async () => {
    const response = await api.get('/admin/cards/best-customer');
    return response.data;
}

export const getPastRevenue = async () => {
    const response = await api.get('/admin/charts/past-revenue');
    return response.data;
}

export const getAvailableYears = async () => {
    const response = await api.get('/admin/selectors/available-years');
    return response.data;
}

export const getAvailableQuarters = async (year) => {
    const response = await api.get(`/admin/selectors/available-quarters/${year}`);
    return response.data;
}

export const getRevenuePerStore = async (year, quarter) => {
    const response = await api.get(`/admin/charts/revenue-per-store/${year}/${quarter}`);
    return response.data;
}

export const getTopProductsPerQuarter = async (year, quarter) => {
    const response = await api.get(`/admin/tables/top-products-quarter/${year}/${quarter}`);
    return response.data;
}

export const getTopCustomersPerQuarter = async (year, quarter) => {
    const response = await api.get(`/admin/tables/top-customers-quarter/${year}/${quarter}`);
    return response.data;
}

export const getOrderDetails = async (orderID) => {
    const response = await api.get(`/admin/searches/order/${orderID}`);
    return response.data;
}

export const getOrderProducts = async (orderID) => {
    const response = await api.get(`/admin/tables/order-products/${orderID}`);
    return response.data;
}

export const getTrackingDetails = async (orderID) => {
    const response = await api.get(`/admin/tables/tracking-details/${orderID}`);
    return response.data;
}

export const getTrainAssignedOrders = async () => {
    const response = await api.get(`/admin/tables/train-assigned-orders`);
    return response.data;
}

export const getOrdersInTrain = async () => {
    const response = await api.get(`/admin/tables/orders-in-train`);
    return response.data;
}

export const getOrdersInStore = async () => {
    const response = await api.get(`/admin/tables/orders-in-store`);
    return response.data;
}

export const getOrdersInShipment = async () => {
    const response = await api.get(`/admin/tables/orders-in-shipment`);
    return response.data;
}

export const getOrdersInTruck = async () => {
    const response = await api.get(`/admin/tables/orders-in-truck`);
    return response.data;
}

export const reportOrder = async (orderID) => {
    const response = await api.patch(`/admin/buttons/report-order/${orderID}`);
    return response.data;
}

export const getAttentionOrders = async () => {
    const response = await api.get(`/admin/tables/attention-orders`);
    return response.data;
}

export const cancelOrder = async (orderID) => {
    const response = await api.patch(`/admin/buttons/cancel-order/${orderID}`);
    return response.data;
}


export const getStores = async () => {
    const response = await api.get('/admin/selectors/get-stores');
    return response.data;
}

export const getReadyShipment = async (id) => {
    const response = await api.get(`/admin/cards/get-ready-shipments/${id}`);
    return response.data;
}

export const getAvailableAssistants = async (id) => {
    const response = await api.get(`/admin/cards/get-available-assistants/${id}`);
    return response.data;
}

export const getAvailableDrivers = async (id) => {
    const response = await api.get(`/admin/cards/get-available-drivers/${id}`);
    return response.data;
}

export const getAvailableTrucks = async (id) => {
    const response = await api.get(`/admin/cards/get-available-trucks/${id}`);
    return response.data;
}

export const getBestProducts = async () => {
    const response = await api.get('/admin/tables/best-products');
    return response.data;
}

export const getStoreData = async () => {
    const response = await api.get('/admin/tables/store-data');
    return response.data;
}

export const getManagerData = async () => {
    const response = await api.get('/admin/tables/manager-data');
    return response.data;
}

export const getTopCustomers = async () => {
    const response = await api.get('/admin/tables/top-customers');
    return response.data;
}

export const getCustomerDistribution = async () => {
    const response = await api.get('/admin/charts/customer-distribution');
    return response.data;
}

export const searchCustomer = async (by, term) => {
    const response = await api.get(`/admin/searches/customer`, {
        params: { by, term }
    });
    return response.data;
}