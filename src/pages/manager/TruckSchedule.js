import PageLayout from "../../layouts/PageLayout";
import {
    getTruckScheduleStatuses,
    getTruckSchedules,
    getOrdersByShipment
} from "../../services/apiService";
import { useEffect, useState } from "react";
import TruckScheduleStatuses from "../../components/TruckScheduleStatusesCard";
import Grid from "@mui/material/Grid2";
import TruckScheduleTable from "../../components/TruckScheduleTable";
import { CustomTable } from "../../components/OrderDetailsTable";

export default function TruckSchedule() {
    const [statuses, setStatuses] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState(-1);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statuses = await getTruckScheduleStatuses();
                const schedules = await getTruckSchedules();
                setStatuses(statuses);
                setSchedules(schedules);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData().then((r) => console.log("Data fetched"));
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (selectedSchedule !== -1) {
                    const orders = await getOrdersByShipment(selectedSchedule);
                    setOrders(orders);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData().then((r) => console.log("Data fetched"));
    }, [selectedSchedule]);




    return (
        <PageLayout
            heading={"Truck Schedule"}
            subHeading={"View truck schedules"}
        >
            <Grid container spacing={2}>
                <Grid size={12}>
                    <TruckScheduleStatuses
                        title={"Truck Schedule Statuses"}
                        statusData={statuses}
                    />
                </Grid>
                <Grid size={12}>
                    <TruckScheduleTable
                        data={schedules}
                        colorSelection={"greenAccent"}
                        heading={"Truck Schedules"}
                        maxHeight={500}
                        setSelectedSchedule={setSelectedSchedule}
                    />
                </Grid>
                <Grid size={12}>
                    <CustomTable 
                        data={orders}
                        heading={(selectedSchedule === -1) ? "Select a truck schedule to view orders" : `Orders for Truck Schedule ${selectedSchedule}`}
                        maxHeight={500}
                        colorSelection={"greenAccent"}
                    />
                    </Grid>
            </Grid>
        </PageLayout>
    );
}
