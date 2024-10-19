import PageLayout from "../../layouts/admin/PageLayout";
import {CustomTable} from "../../components/OrderDetailsTable";
import Grid from "@mui/material/Grid2";
import {Box} from "@mui/material";
import SchedulePendingOrdersButton from "../../components/SchedulePendingOrdersButton";
import {getPendingOrdersList, scheduleOrders} from "../../services/apiService";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


export default function ScheduleOrders() {

    const [pendingOrders, setPendingOrders] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const orders = await getPendingOrdersList();
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

    const handleScheduleOrders = async () => {
        // Call the scheduleOrders function
        return await scheduleOrders(); // Return the response to be used in the button
    }

    const handleClose = () => {
        fetchData().then(r => console.log('Data Re - fetched'));
    }


    return (
        <PageLayout heading={"Schedule Orders"} subHeading={"Schedule pending orders"}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <CustomTable heading={"Pending Orders"} data={pendingOrders} maxHeight={600}
                                 colorSelection={'yellowAccent'}/>
                </Grid>
            </Grid>
            <Box sx={{display: 'flex', width: '100%', alignContent: 'center', justifyContent: 'center'}}>
                <SchedulePendingOrdersButton onSchedulePendingOrders={handleScheduleOrders} onClose={handleClose}/>
            </Box>
        </PageLayout>
    );
}