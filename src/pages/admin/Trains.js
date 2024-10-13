import PageLayout from "../../layouts/admin/PageLayout";
import {getActiveTrains, getTrainStatuses} from "../../services/apiService";
import {useEffect, useState} from "react";
import ActiveTrainsTable from "../../components/ActiveTrainsTable";
import TrainStatusCard from "../../components/TrainStatusCard";
import Grid from "@mui/material/Grid2";

const Trains = () => {
    const [activeTrains, setActiveTrains] = useState([]);
    const [trainStatuses, setTrainStatuses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const trains = await getActiveTrains();
            const statuses = await getTrainStatuses();
            setActiveTrains(trains);
            setTrainStatuses(statuses);
        }

        fetchData().then(r => console.log('Data fetched'));
    }, []);


    return (
        <PageLayout heading={'Trains'} subHeading={'Details about active trains'}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <TrainStatusCard title={"Current Train Statuses"} statusData={trainStatuses}/>
                </Grid>
                <Grid size={12}>
                    <ActiveTrainsTable heading={"Active Trains"} data={activeTrains} maxHeight={600}
                                       colorSelection={'greenAccent'}/>
                < /Grid>
            < /Grid>
        </PageLayout>
    );
}

export default Trains;