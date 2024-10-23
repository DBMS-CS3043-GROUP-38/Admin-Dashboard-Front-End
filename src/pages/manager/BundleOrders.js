import PageLayout from "../../layouts/PageLayout";
import {CustomTable} from "../../components/OrderDetailsTable";
import Grid from "@mui/material/Grid2";
import {Box} from "@mui/material";
import {BundleInStoreOrdersButton} from "../../components/SchedulePendingOrdersButton";
import {getInStoreOrdersListM, bundleOrdersM} from "../../services/apiService";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


export default function BundleOrders() {

    const [pendingOrders, setPendingOrders] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const orders = await getInStoreOrdersListM();
            setPendingOrders(orders);
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

    useEffect(() => {
        fetchData().then(r => console.log('Data fetched'));
    }, []);

    const handleBundleOrders = async () => {
        // Call the scheduleOrders function
        return await bundleOrdersM(); // Return the response to be used in the button
    }

    const handleClose = () => {
        fetchData().then(r => console.log('Data Re - fetched'));
    }


    return (
        <PageLayout heading={"Bundle Orders"} subHeading={"Bundle orders into existing or new Shipments"}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <CustomTable heading={"In Store Orders"} data={pendingOrders} maxHeight={600}
                                 colorSelection={'yellowAccent'}/>
                </Grid>
            </Grid>
            <Box sx={{display: 'flex', width: '100%', alignContent: 'center', justifyContent: 'center'}}>
                <BundleInStoreOrdersButton onBundleInStoreOrders={handleBundleOrders} onClose={handleClose}/>
            </Box>
        </PageLayout>
    );
}