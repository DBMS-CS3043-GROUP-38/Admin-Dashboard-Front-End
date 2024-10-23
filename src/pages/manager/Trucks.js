import PageLayout from "../../layouts/PageLayout";
import Grid from "@mui/material/Grid2";
import CustomAvailableChart from "../../components/CustomAvailableChart";
import { getTrucksM} from "../../services/apiService";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Trucks = () => {
    const [trucks, setTrucks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const drivers = await getTrucksM();
                setTrucks(drivers);
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
        fetchData().then(() => console.log('Driver Data fetched'));
    }, []);

    return (
        <PageLayout heading={'Trucks'} subHeading={'Details about Trucks'}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <CustomAvailableChart heading={'Truck List'} colorSelection={'purpleAccent'} maxHeight={600} data={trucks} />
                </Grid>
            </Grid>
        </PageLayout>
    );
}

export default Trucks;