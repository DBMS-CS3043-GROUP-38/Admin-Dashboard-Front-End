import axios from 'axios';
const API_BASE_URL = 'http://localhost:3005';


const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export const testApi = async () => {
    const response = await api.get('/dashboard/admin/test');
    return response.data;
}

// Fetch quarterly sales data
export const getQuarterlySales = async () => {
    const response = await api.get('/dashboard/admin/cards/quarterly-sales');
    return response.data;
};

// Fetch trains completed data
export const getCompletedTrains = async () => {
    const response = await api.get('/dashboard/admin/cards/trains-completed');
    return response.data;
};

// Fetch pending orders data
export const getPendingOrders = async () => {
    const response = await api.get('/dashboard/admin/cards/pending-orders');
    return response.data;
};

// Fetch orders needing attention data
export const getOrdersAttention = async () => {
    const response = await api.get('/dashboard/admin/cards/orders-attention');
    return response.data;
};

// Fetch revenue data
export const getRevenueData = async () => {
    const response = await api.get('/dashboard/admin/charts/revenue-past-year');
    return response.data;
};

// Fetch order status data
export const getOrderStatuses = async () => {
    const response = await api.get('/dashboard/admin/charts/order-statuses');
    return response.data;
};

// Fetch today’s outgoing trains data
export const getTodayTrains = async () => {
    const response = await api.get('/dashboard/admin/tables/trains-today');
    return response.data;
};

// Fetch todays sales data
export const getTodaySales = async () => {
    const response = await api.get('/dashboard/admin/cards/today-sales');
    return response.data;
};

// Fetch revanue for past month
export const getMonthlyRevenue = async () => {
    const response = await api.get('/dashboard/admin/charts/revenue-past-month');
    return response.data;
};

//Fetch the best products of the quarter
export const getBestProductsQuarter = async () => {
    const response = await api.get('/dashboard/admin/tables/best-products-quarter');
    return response.data;
};

//Fetch weekly trains
export const getWeeklyTrains = async () => {
    const response = await api.get('/dashboard/admin/tables/weekly-trains');
    return response.data;
};

//Schedule trains
export const scheduleTrains = async () => {
    try {
        const response = await api.post('/dashboard/admin/buttons/schedule-trains', {
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
    const response = await api.get('/dashboard/admin/tables/scheduled-trains');
    return response.data;
};

export const getActiveTrains = async () => {
    const response = await api.get('/dashboard/admin/tables/active-trains');
    return response.data;
}


export const getTrainStatuses = async () => {
    const response = await api.get('/dashboard/admin/cards/train-statuses');
    return response.data;
}

export const getPendingOrdersList = async () => {
    const response = await api.get('/dashboard/admin/tables/pending-orders-list');
    return response.data;
}

export const scheduleOrders = async () => {
    try {
        const response = await api.post('/dashboard/admin/buttons/schedule-orders', {
            // If you need to send any data, you can add it here
        });

        return response.data; // Return the number of orders scheduled from the response
    } catch (error) {
        console.error('Error scheduling orders:', error);
        throw error; // Re-throw error to handle it in the component
    }
}

export const getTodayTrainsSelector = async () => {
    const response = await api.get('/dashboard/admin/selectors/today-trains');
    return response.data;
}

export const getOrdersByTrain = async (trainSchID) => {
    const response = await api.get(`/dashboard/admin/tables/orders-by-train/${trainSchID}`);
    return response.data;
}

export const dispatchTrain = async (trainSchID) => {
    const response = await api.post(`/dashboard/admin/buttons/dispatch-train/${trainSchID}`);
    return response.data;
}

export const getQuarterlyOrders = async () => {
    const response = await api.get('/dashboard/admin/cards/quarterly-orders');
    return response.data;
}

export const getQuarterlyStores = async () => {
    const response = await api.get('/dashboard/admin/cards/quarterly-store');
    return response.data;
}

export const getBestCustomer = async () => {
    const response = await api.get('/dashboard/admin/cards/best-customer');
    return response.data;
}

export const getPastRevenue = async () => {
    const response = await api.get('/dashboard/admin/charts/past-revenue');
    return response.data;
}

export const getAvailableYears = async () => {
    const response = await api.get('/dashboard/admin/selectors/available-years');
    return response.data;
}

export const getAvailableQuarters = async (year) => {
    const response = await api.get(`/dashboard/admin/selectors/available-quarters/${year}`);
    return response.data;
}

export const getRevenuePerStore = async (year, quarter) => {
    const response = await api.get(`/dashboard/admin/charts/revenue-per-store/${year}/${quarter}`);
    return response.data;
}

export const getTopProductsPerQuarter = async (year, quarter) => {
    const response = await api.get(`/dashboard/admin/tables/top-products-quarter/${year}/${quarter}`);
    return response.data;
}

export const getTopCustomersPerQuarter = async (year, quarter) => {
    const response = await api.get(`/dashboard/admin/tables/top-customers-quarter/${year}/${quarter}`);
    return response.data;
}

export const getOrderDetails = async (orderID) => {
    const response = await api.get(`/dashboard/admin/searches/order/${orderID}`);
    return response.data;
}

export const getOrderProducts = async (orderID) => {
    const response = await api.get(`/dashboard/admin/tables/order-products/${orderID}`);
    return response.data;
}

export const getTrackingDetails = async (orderID) => {
    const response = await api.get(`/dashboard/admin/tables/tracking-details/${orderID}`);
    return response.data;
}

export const getTrainAssignedOrders = async () => {
    const response = await api.get(`/dashboard/admin/tables/train-assigned-orders`);
    return response.data;
}

export const getOrdersInTrain = async () => {
    const response = await api.get(`/dashboard/admin/tables/orders-in-train`);
    return response.data;
}

export const getOrdersInStore = async () => {
    const response = await api.get(`/dashboard/admin/tables/orders-in-store`);
    return response.data;
}

export const getOrdersInShipment = async () => {
    const response = await api.get(`/dashboard/admin/tables/orders-in-shipment`);
    return response.data;
}

export const getOrdersInTruck = async () => {
    const response = await api.get(`/dashboard/admin/tables/orders-in-truck`);
    return response.data;
}

export const reportOrder = async (orderID) => {
    const response = await api.patch(`/dashboard/admin/buttons/report-order/${orderID}`);
    return response.data;
}

export const getAttentionOrders = async () => {
    const response = await api.get(`/dashboard/admin/tables/attention-orders`);
    return response.data;
}

export const cancelOrder = async (orderID) => {
    const response = await api.patch(`/dashboard/admin/buttons/cancel-order/${orderID}`);
    return response.data;
}


export const getStores = async () => {
    const response = await api.get('/dashboard/admin/selectors/get-stores');
    return response.data;
}

export const getReadyShipment = async (id) => {
    const response = await api.get(`/dashboard/admin/cards/get-ready-shipments/${id}`);
    return response.data;
}

export const getAvailableAssistants = async (id) => {
    const response = await api.get(`/dashboard/admin/cards/get-available-assistants/${id}`);
    return response.data;
}

export const getAvailableDrivers = async (id) => {
    const response = await api.get(`/dashboard/admin/cards/get-available-drivers/${id}`);
    return response.data;
}

export const getAvailableTrucks = async (id) => {
    const response = await api.get(`/dashboard/admin/cards/get-available-trucks/${id}`);
    return response.data;
}

export const getBestProducts = async () => {
    const response = await api.get('/dashboard/admin/tables/best-products');
    return response.data;
}

export const getStoreData = async () => {
    const response = await api.get('/dashboard/admin/tables/store-data');
    return response.data;
}

export const getManagerData = async () => {
    const response = await api.get('/dashboard/admin/tables/manager-data');
    return response.data;
}

export const getTopCustomers = async () => {
    const response = await api.get('/dashboard/admin/tables/top-customers');
    return response.data;
}

export const getCustomerDistribution = async () => {
    const response = await api.get('/dashboard/admin/charts/customer-distribution');
    return response.data;
}

export const searchCustomer = async (by, term) => {
    const response = await api.get(`/dashboard/admin/searches/customer`, {
        params: { by, term }
    });
    return response.data;
}

export const searchDriver = async (by, term) => {
    const response = await api.get(`/dashboard/admin/searches/driver`, {
        params: { by, term }
    });
    return response.data;
}

export const searchAssistant = async (by, term) => {
    const response = await api.get(`/dashboard/admin/searches/assistant`, {
        params: { by, term }
    });
    return response.data;
}

export const searchRoute = async (by, term) => {
    const response = await api.get(`/dashboard/admin/searches/route`, {
        params: { by, term }
    });
    return response.data;
}

export const searchTruck = async (by, term) => {
    const response = await api.get(`/dashboard/admin/searches/truck`, {
        params: { by, term }
    });
    return response.data;
}