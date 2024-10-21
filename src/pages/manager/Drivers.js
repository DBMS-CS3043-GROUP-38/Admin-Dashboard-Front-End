import PageLayout from "../../layouts/PageLayout";
import Grid from "@mui/material/Grid2";
import CustomGrayCard from "../../components/CustomGrayCard";
import {DriverSearch} from "../../components/Search";
import CustomTableWithProgressBar from "../../components/CustomTableWithProgressBar";
import {searchDriverM} from "../../services/apiService";
import {useState} from "react";

const Drivers = () => {
    const [searchResults, setSearchResults] = useState([]);


    return (
        <PageLayout heading={'Drivers'} subHeading={'Details about Drivers'}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <CustomGrayCard>
                        <DriverSearch onSearch={searchDriverM} onResults={setSearchResults} />
                    </CustomGrayCard>
                </Grid>
                <Grid size={12}>
                    <CustomTableWithProgressBar heading={'Driver List'} colorSelection={'purpleAccent'} maxHeight={600} data={searchResults} />
                </Grid>
            </Grid>
        </PageLayout>
    );
}

export default Drivers;



const drivers = [
    {DriverID: 1, Name: "John Doe", CompletedHours: 12, WorkHours: 40, Availability: "Not Available"}
]