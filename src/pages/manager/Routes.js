import PageLayout from "../../layouts/PageLayout";
import Grid from "@mui/material/Grid2";
import {CustomTable} from "../../components/OrderDetailsTable";
import {RouteSearch} from "../../components/Search";
import {searchRouteM} from "../../services/apiService";
import {useState} from "react";

const Routes = () => {
    const [searchResults, setSearchResults] = useState([]);



    return (
        <PageLayout heading={'Routes'} subHeading={'Details about Routes'}>
            <Grid container spacing={2}>
                <Grid size={12}>
                   <RouteSearch onSearch={searchRouteM} onResults={setSearchResults} />
                </Grid>
                <Grid size={12}>
                    <CustomTable heading={'Route List'} maxHeight={500} colorSelection={'purpleAccent'} data={searchResults} />
                </Grid>
            </Grid>
        </PageLayout>
    );
}


export default Routes;
