import PageLayout from "../../layouts/admin/PageLayout";
import Grid from "@mui/material/Grid2";
import CustomGrayCard from "../../components/CustomGrayCard";
import {TruckSearch} from "../../components/Search";
import CustomAvailableChart from "../../components/CustomAvailableChart";
import {searchTruck} from "../../services/apiService";
import {useState} from "react";

const Trucks = () => {
    const [searchResults, setSearchResults] = useState([]);

    return (
        <PageLayout heading={'Trucks'} subHeading={'Details about Trucks'}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <CustomGrayCard>
                        <TruckSearch onSearch={searchTruck} onResults={setSearchResults} />
                    </CustomGrayCard>
                </Grid>
                <Grid size={12}>
                    <CustomAvailableChart heading={'Truck List'} colorSelection={'purpleAccent'} maxHeight={600} data={searchResults} />
                </Grid>
            </Grid>
        </PageLayout>
    );
}

export default Trucks;