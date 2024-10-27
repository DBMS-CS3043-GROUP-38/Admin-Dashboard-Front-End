import PageLayout from "../../layouts/PageLayout";
import {
    getActiveTrains,
    getTrainStatuses,
    getOrdersByTrain,
} from "../../services/apiService";
import { useEffect, useState } from "react";
import ActiveTrainsTable from "../../components/ActiveTrainsTable";
import TrainStatusCard from "../../components/TrainStatusCard";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import { CustomTable } from "../../components/OrderDetailsTable";

const Trains = () => {
    const [activeTrains, setActiveTrains] = useState([]);
    const [trainStatuses, setTrainStatuses] = useState([]);
    const [selectedTrain, setSelectedTrain] = useState(-1);
    const [dispatches, setDispatches] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const trains = await getActiveTrains();
                const statuses = await getTrainStatuses();
                setActiveTrains(trains);
                setTrainStatuses(statuses);
            } catch (error) {
                console.error(error);
                // Check for specific status codes
                if (error.response) {
                    const { status } = error.response;
                    if (status === 401 || status === 403) {
                        navigate("/unauthorized"); // Redirect to Unauthorized page
                    } else {
                        navigate("/database-error"); // Redirect to Database Error page
                    }
                } else {
                    // Network error or no response
                    navigate("/database-error"); // Redirect for network or unexpected errors
                }
            }
        };

        fetchData().then((r) => console.log("Data fetched"));
    }, [navigate]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrdersByTrain(selectedTrain);
                setDispatches(data);
            } catch (error) {
                console.error(error);
                // Check for specific status codes
                if (error.response) {
                    const { status } = error.response;
                    if (status === 401 || status === 403) {
                        navigate("/unauthorized"); // Redirect to Unauthorized page
                    } else {
                        navigate("/database-error"); // Redirect to Database Error page
                    }
                } else {
                    // Network error or no response
                    navigate("/database-error"); // Redirect for network or unexpected errors
                }
            }
        };

        fetchOrders().then(() => console.log("Orders fetched"));
    }, [navigate, selectedTrain]);

    return (
        <PageLayout
            heading={"Trains"}
            subHeading={"Details about active trains"}
        >
            <Grid container spacing={2}>
                <Grid size={12}>
                    <TrainStatusCard
                        title={"Current Train Statuses"}
                        statusData={trainStatuses}
                    />
                </Grid>
                <Grid size={12}>
                    <ActiveTrainsTable
                        heading={"Active Trains"}
                        data={activeTrains}
                        maxHeight={600}
                        colorSelection={"greenAccent"}
                        onRowClick={(id) => {
                            setSelectedTrain(id);
                        }}
                    />
                </Grid>
                <Grid size={12}>
                    <CustomTable
                        heading={ (selectedTrain !== -1) ? `Orders for Train ${selectedTrain}` : "Select a train to view orders" }
                        data={dispatches}
                        colorSelection={"greenAccent"}
                        maxHeight={600}
                    />
                </Grid>
            </Grid>
        </PageLayout>
    );
};

export default Trains;
