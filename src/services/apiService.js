import axios from 'axios';
const API_BASE_URL = 'http://localhost:3005/dashboard';


const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});


api.interceptors.request.use(
    (config) => {
        // Get the auth token from localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers['Authorization'] = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const testApi = async () => {
    const response = await api.get('/admin/test');
    return response.data;
}

//Login
export const login = async (username, password) => {
    try {
        const response = await api.post('/login', { username, password });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error; // Re-throw error to handle it in the component
    }
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

export const searchDriver = async (by, term) => {
    const response = await api.get(`/admin/searches/driver`, {
        params: { by, term }
    });
    return response.data;
}

export const searchAssistant = async (by, term) => {
    const response = await api.get(`/admin/searches/assistant`, {
        params: { by, term }
    });
    return response.data;
}

export const searchRoute = async (by, term) => {
    const response = await api.get(`/admin/searches/route`, {
        params: { by, term }
    });
    return response.data;
}

export const searchTruck = async (by, term) => {
    const response = await api.get(`/admin/searches/truck`, {
        params: { by, term }
    });
    return response.data;
}


//Manager API
export const getQuarterlySalesM = async () => {
    const response = await api.get('/manager/cards/quarterly-sales');
    return response.data;
};

// Fetch trains completed data
export const getCompletedTrainsM = async () => {
    const response = await api.get('/manager/cards/trains-completed');
    return response.data;
};

// Fetch pending orders data
export const getPendingOrdersM = async () => {
    const response = await api.get('/manager/cards/pending-orders');
    return response.data;
};

// Fetch orders needing attention data
export const getOrdersAttentionM = async () => {
    const response = await api.get('/manager/cards/orders-attention');
    return response.data;
};

// Fetch revenue data
export const getRevenueDataM = async () => {
    const response = await api.get('/manager/charts/revenue-past-year');
    return response.data;
};

// Fetch order status data
export const getOrderStatusesM = async () => {
    const response = await api.get('/manager/charts/order-statuses');
    return response.data;
};

// Fetch today’s outgoing trains data
export const getTodayTrainsM = async () => {
    const response = await api.get('/manager/tables/trains-today');
    return response.data;
};

// Fetch todays sales data
export const getTodaySalesM = async () => {
    const response = await api.get('/manager/cards/today-sales');
    return response.data;
};

// Fetch revanue for past month
export const getMonthlyRevenueM = async () => {
    const response = await api.get('/manager/charts/revenue-past-month');
    return response.data;
};

//Fetch the best products of the quarter
export const getBestProductsQuarterM = async () => {
    const response = await api.get('/manager/tables/best-products-quarter');
    return response.data;
};

//Fetch weekly trains
export const getWeeklyTrainsM = async () => {
    const response = await api.get('/manager/tables/weekly-trains');
    return response.data;
};

//Schedule trains
export const scheduleTrainsM = async () => {
    try {
        const response = await api.post('/manager/buttons/schedule-trains', {
            // If you need to send any data, you can add it here
        });

        return response.data; // Return the number of orders scheduled from the response
    } catch (error) {
        console.error('Error scheduling trains:', error);
        throw error; // Re-throw error to handle it in the component
    }
};

//Get scheduled trains
export const getScheduledTrainsM = async () => {
    const response = await api.get('/manager/tables/scheduled-trains');
    return response.data;
};

export const getActiveTrainsM = async () => {
    const response = await api.get('/manager/tables/active-trains');
    return response.data;
}


export const getTrainStatusesM = async () => {
    const response = await api.get('/manager/cards/train-statuses');
    return response.data;
}

export const getInStoreOrdersListM = async () => {
    const response = await api.get('/manager/tables/instore-orders-list');
    return response.data;
}

export const bundleOrdersM = async () => {
    try {
        const response = await api.post('/manager/buttons/bundle-orders', {
            // If you need to send any data, you can add it here
        });

        return response.data; // Return the number of orders scheduled from the response
    } catch (error) {
        console.error('Error scheduling orders:', error);
        throw error; // Re-throw error to handle it in the component
    }
}

export const getTodayTrainsSelectorM = async () => {
    const response = await api.get('/manager/selectors/today-trains');
    return response.data;
}

export const getOrdersByTrainM = async (trainSchID) => {
    const response = await api.get(`/manager/tables/orders-by-train/${trainSchID}`);
    return response.data;
}

export const receiveTrainM = async (trainSchID) => {
    const response = await api.post(`/manager/buttons/receive-train/${trainSchID}`);
    return response.data;
}

export const getQuarterlyOrdersM = async () => {
    const response = await api.get('/manager/cards/quarterly-orders');
    return response.data;
}

export const getQuarterlyStoresM = async () => {
    const response = await api.get('/manager/cards/quarterly-store');
    return response.data;
}

export const getBestCustomerM = async () => {
    const response = await api.get('/manager/cards/best-customer');
    return response.data;
}

export const getPastRevenueM = async () => {
    const response = await api.get('/manager/charts/past-revenue');
    return response.data;
}

export const getAvailableYearsM = async () => {
    const response = await api.get('/manager/selectors/available-years');
    return response.data;
}

export const getAvailableQuartersM = async (year) => {
    const response = await api.get(`/manager/selectors/available-quarters/${year}`);
    return response.data;
}

export const getRevenuePerStoreM = async (year, quarter) => {
    const response = await api.get(`/manager/charts/revenue-per-store/${year}/${quarter}`);
    return response.data;
}

export const getTopProductsPerQuarterM = async (year, quarter) => {
    const response = await api.get(`/manager/tables/top-products-quarter/${year}/${quarter}`);
    return response.data;
}

export const getTopCustomersPerQuarterM = async (year, quarter) => {
    const response = await api.get(`/manager/tables/top-customers-quarter/${year}/${quarter}`);
    return response.data;
}

export const getOrderDetailsM = async (orderID) => {
    const response = await api.get(`/manager/searches/order/${orderID}`);
    return response.data;
}

export const getOrderProductsM = async (orderID) => {
    const response = await api.get(`/manager/tables/order-products/${orderID}`);
    return response.data;
}

export const getTrackingDetailsM = async (orderID) => {
    const response = await api.get(`/manager/tables/tracking-details/${orderID}`);
    return response.data;
}

export const getTrainAssignedOrdersM = async () => {
    const response = await api.get(`/manager/tables/train-assigned-orders`);
    return response.data;
}

export const getOrdersInTrainM = async () => {
    const response = await api.get(`/manager/tables/orders-in-train`);
    return response.data;
}

export const getOrdersInStoreM = async () => {
    const response = await api.get(`/manager/tables/orders-in-store`);
    return response.data;
}

export const getOrdersInShipmentM = async () => {
    const response = await api.get(`/manager/tables/orders-in-shipment`);
    return response.data;
}

export const getOrdersInTruckM = async () => {
    const response = await api.get(`/manager/tables/orders-in-truck`);
    return response.data;
}

export const reportOrderM = async (orderID) => {
    const response = await api.patch(`/manager/buttons/report-order/${orderID}`);
    return response.data;
}

export const getAttentionOrdersM = async () => {
    const response = await api.get(`/manager/tables/attention-orders`);
    return response.data;
}

export const cancelOrderM = async (orderID) => {
    const response = await api.patch(`/manager/buttons/cancel-order/${orderID}`);
    return response.data;
}


export const getStoresM = async () => {
    const response = await api.get('/manager/selectors/get-stores');
    return response.data;
}

export const getReadyShipmentM = async (id) => {
    const response = await api.get(`/manager/cards/get-ready-shipments/${id}`);
    return response.data;
}

export const getAvailableAssistantsM = async () => {
    const response = await api.get(`/manager/cards/get-available-assistants`);
    return response.data;
}

export const getAvailableDriversM = async () => {
    const response = await api.get(`/manager/cards/get-available-drivers`);
    return response.data;
}

export const getAvailableTrucksM = async () => {
    const response = await api.get(`/manager/cards/get-available-trucks`);
    return response.data;
}

export const getBestProductsM = async () => {
    const response = await api.get('/manager/tables/best-products');
    return response.data;
}

export const getStoreDataM = async () => {
    const response = await api.get('/manager/tables/store-data');
    return response.data;
}

export const getAdminDataM = async () => {
    const response = await api.get('/manager/tables/admin-data');
    return response.data;
}

export const getTopCustomersM = async () => {
    const response = await api.get('/manager/tables/top-customers');
    return response.data;
}

export const getCustomerDistributionM = async () => {
    const response = await api.get('/manager/charts/customer-distribution');
    return response.data;
}

export const searchCustomerM = async (by, term) => {
    const response = await api.get(`/manager/searches/customer`, {
        params: { by, term }
    });
    return response.data;
}

export const searchDriverM = async (by, term) => {
    const response = await api.get(`/manager/searches/driver`, {
        params: { by, term }
    });
    return response.data;
}

export const searchAssistantM = async (by, term) => {
    const response = await api.get(`/manager/searches/assistant`, {
        params: { by, term }
    });
    return response.data;
}

export const searchRouteM = async (by, term) => {
    const response = await api.get(`/manager/searches/route`, {
        params: { by, term }
    });
    return response.data;
}

export const searchTruckM = async (by, term) => {
    const response = await api.get(`/manager/searches/truck`, {
        params: { by, term }
    });
    return response.data;
}

export const getDriversM = async () => {
    const response = await api.get('/manager/tables/drivers');
    return response.data;
}

export const getAssistantsM = async () => {
    const response = await api.get('/manager/tables/assistants');
    return response.data;
}

export const getTrucksM = async () => {
    const response = await api.get('/manager/tables/trucks');
    return response.data;
}

export const getRoutesM = async () => {
    const response = await api.get('/manager/tables/routes');
    return response.data;
}

export const getShipmentStatusesM = async () => {
    const response = await api.get('/manager/cards/shipment-statuses');
    return response.data;
}

export const getActiveShipmentsM = async() => {

    const response = await api.get('/manager/tables/active-shipments');
    return response.data;
}