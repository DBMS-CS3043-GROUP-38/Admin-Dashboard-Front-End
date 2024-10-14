import PageLayout from "../../layouts/admin/PageLayout";
import {CustomTable} from "../../components/OrderDetailsTable";
import Grid from "@mui/material/Grid2";
import {Box} from "@mui/material";
import SchedulePendingOrdersButton from "../../components/SchedulePendingOrdersButton";
import {getPendingOrdersList, scheduleOrders} from "../../services/apiService";
import {useEffect, useState} from "react";


export default function ScheduleOrders() {

    const [pendingOrders, setPendingOrders] = useState([]);

    const fetchData = async () => {
        const orders = await getPendingOrdersList();
        setPendingOrders(orders);
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
                    <CustomTable heading={"Pending Orders"} data={pendingOrders} maxHeight={600} colorSelection={'yellowAccent'}/>
                </Grid>
            </Grid>
            <Box sx={{display: 'flex', width: '100%', alignContent:'center', justifyContent:'center'}}>
                <SchedulePendingOrdersButton onSchedulePendingOrders={handleScheduleOrders} onClose={handleClose}/>
            </Box>
        </PageLayout>
    );
}