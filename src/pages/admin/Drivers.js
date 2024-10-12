import PageLayout from "../../layouts/admin/PageLayout";
import Grid from "@mui/material/Grid2";
import CustomGrayCard from "../../components/CustomGrayCard";
import {DriverSearch} from "../../components/Search";
import CustomTableWithProgressBar from "../../components/CustomTableWithProgressBar";

const Drivers = () => {
    return (
        <PageLayout heading={'Drivers'} subHeading={'Details about Drivers'}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <CustomGrayCard>
                        <DriverSearch label={'Driver'} />
                    </CustomGrayCard>
                </Grid>
                <Grid size={12}>
                    <CustomTableWithProgressBar heading={'Driver Lisr'} colorSelection={'purpleAccent'} maxHeight={600} data={drivers} />
                </Grid>
            </Grid>
        </PageLayout>
    );
}

export default Drivers;



const drivers = [
    {DriverID: 1, Name: "John Doe", CompletedHours: 12, WorkHours: 40, Availability: "Not Available"},
    {DriverID: 2, Name: "Jane Doe", CompletedHours: 25, WorkHours: 40, Availability: "Available"},
    {DriverID: 3, Name: "John Smith", CompletedHours: 16, WorkHours: 40, Availability: "Available"},
    {DriverID: 4, Name: "Jane Smith", CompletedHours: 39, WorkHours: 40, Availability: "Available"},
    {DriverID: 5, Name: "John Johnson", CompletedHours: 15, WorkHours: 40, Availability: "Available"},
    {DriverID: 6, Name: "Jane Johnson", CompletedHours: 16, WorkHours: 40, Availability: "Available"},
    {DriverID: 7, Name: "John Brown", CompletedHours: 14, WorkHours: 40, Availability: "Available"},
]