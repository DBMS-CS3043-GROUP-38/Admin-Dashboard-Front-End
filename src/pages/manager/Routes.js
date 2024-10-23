import PageLayout from "../../layouts/PageLayout";
import Grid from "@mui/material/Grid2";
import {CustomTable} from "../../components/OrderDetailsTable";
import {useState} from "react";
import {getRoutesM} from "../../services/apiService";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Routes = () => {
    const navigate = useNavigate();
    const [route, setRoute] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const drivers = await getRoutesM();
                setRoute(drivers);
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
        <PageLayout heading={'Routes'} subHeading={'Details about Routes'}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <CustomTable heading={'Route List'} maxHeight={500} colorSelection={'purpleAccent'} data={route} />
                </Grid>
            </Grid>
        </PageLayout>
    );
}


export default Routes;
