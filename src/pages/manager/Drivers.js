import PageLayout from "../../layouts/PageLayout";
import Grid from "@mui/material/Grid2";
import CustomGrayCard from "../../components/CustomGrayCard";
import {DriverSearch} from "../../components/Search";
import CustomTableWithProgressBar from "../../components/CustomTableWithProgressBar";
import { getDriversM} from "../../services/apiService";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Drivers = () => {
    const navigate = useNavigate();

    const [drivers, setDrivers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const drivers = await getDriversM();
                setDrivers(drivers);
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
        <PageLayout heading={'Drivers'} subHeading={'Details about Drivers'}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <CustomTableWithProgressBar heading={'Driver List'} colorSelection={'purpleAccent'} maxHeight={600} data={drivers} />
                </Grid>
            </Grid>
        </PageLayout>
    );
}

export default Drivers;



const drivers = [
    {DriverID: 1, Name: "John Doe", CompletedHours: 12, WorkHours: 40, Availability: "Not Available"}
]