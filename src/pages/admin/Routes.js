import PageLayout from "../../layouts/admin/PageLayout";
import Grid from "@mui/material/Grid2";
import {CustomTable} from "../../components/OrderDetailsTable";
import {RouteSearch} from "../../components/Search";

const Routes = () => {
    return (
        <PageLayout heading={'Routes'} subHeading={'Details about Routes'}>
            <Grid container spacing={2}>
                <Grid size={12}>
                   <RouteSearch />
                </Grid>
                <Grid size={12}>
                    <CustomTable heading={'Route List'} maxHeight={500} colorSelection={'purpleAccent'} data={routes} />
                </Grid>
            </Grid>
        </PageLayout>
    );
}


export default Routes;

const routes = [
    {RouteID: 1, Distance: 100, Time: '10:00', Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ac libero ultrices ultricies. Donec nec nunc nec libero ultrices ultricies. Donec nec nunc nec libero ultrices ultricies. Donec nec nunc nec libero ultrices ultricies. Donec nec nunc nec libero ultrices ultricies.'},
    {RouteID: 2, Distance: 200, Time: '11:00', Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ac libero'},
    {RouteID: 3, Distance: 300, Time: '12:00', Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ac libero'},
    {RouteID: 4, Distance: 400, Time: '13:00', Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ac libero'},
    {RouteID: 5, Distance: 500, Time: '14:00', Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ac libero'},
    {RouteID: 6, Distance: 600, Time: '15:00', Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ac libero'},
]
