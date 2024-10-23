import PageLayout from "../../layouts/PageLayout";
import Grid from "@mui/material/Grid2";
import CustomTableWithProgressBar from "../../components/CustomTableWithProgressBar";
import {getAssistantsM} from "../../services/apiService";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Assistants = () => {
    const navigate = useNavigate();
    const [assistants, setAssistants] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const drivers = await getAssistantsM();
                setAssistants(drivers);
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
        <PageLayout heading={'Assistants'} subHeading={'Details about Assistants'}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <CustomTableWithProgressBar heading={'Assistant List'} colorSelection={'purpleAccent'} maxHeight={600} data={assistants} />
                </Grid>
            </Grid>
        </PageLayout>
    );
}

export default Assistants;