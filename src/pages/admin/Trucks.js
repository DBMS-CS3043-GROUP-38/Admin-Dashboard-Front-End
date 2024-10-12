import PageLayout from "../../layouts/admin/PageLayout";
import Grid from "@mui/material/Grid2";
import CustomGrayCard from "../../components/CustomGrayCard";
import {TruckSearch} from "../../components/Search";
import CustomAvailableChart from "../../components/CustomAvailableChart";

const Trucks = () => {
    return (
        <PageLayout heading={'Trucks'} subHeading={'Details about Trucks'}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <CustomGrayCard>
                        <TruckSearch label={'Truck'} />
                    </CustomGrayCard>
                </Grid>
                <Grid size={12}>
                    <CustomAvailableChart heading={'Truck List'} colorSelection={'purpleAccent'} maxHeight={600} data={trucks} />
                </Grid>
            </Grid>
        </PageLayout>
    );
}

export default Trucks;

const trucks = [
    {TruckID: 1, Licence: "XYZ1234", Availability: "Not Available", Distance: 100},
    {TruckID: 2, Licence: "ABC1234", Availability: "Available", Distance: 200},
    {TruckID: 3, Licence: "DEF1234", Availability: "Available", Distance: 300},
    {TruckID: 4, Licence: "GHI1234", Availability: "Available", Distance: 400},
    {TruckID: 5, Licence: "JKL1234", Availability: "Available", Distance: 500},
    {TruckID: 6, Licence: "MNO1234", Availability: "Available", Distance: 600},
    {TruckID: 7, Licence: "PQR1234", Availability: "Available", Distance: 700},
]