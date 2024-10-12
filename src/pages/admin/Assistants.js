import PageLayout from "../../layouts/admin/PageLayout";
import Grid from "@mui/material/Grid2";
import CustomGrayCard from "../../components/CustomGrayCard";
import {AssistantSearch} from "../../components/Search";
import CustomTableWithProgressBar from "../../components/CustomTableWithProgressBar";

const Assistants = () => {
    return (
        <PageLayout heading={'Assistants'} subHeading={'Details about Assistants'}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <CustomGrayCard>
                        <AssistantSearch label={'Assistant'} />
                    </CustomGrayCard>
                </Grid>
                <Grid size={12}>
                    <CustomTableWithProgressBar heading={'Assistant List'} colorSelection={'purpleAccent'} maxHeight={600} data={assistants} />
                </Grid>
            </Grid>
        </PageLayout>
    );
}

export default Assistants;


const assistants = [
    {AssistantID: 1, Name: "John Doe", CompletedHours: 12, WorkHours: 40, Availability: "Available"},
    {AssistantID: 2, Name: "Jane Doe", CompletedHours: 25, WorkHours: 40, Availability: "Available"},
    {AssistantID: 3, Name: "John Smith", CompletedHours: 16, WorkHours: 40, Availability: "Available"},
    {AssistantID: 4, Name: "Jane Smith", CompletedHours: 39, WorkHours: 40, Availability: "Available"},
    {AssistantID: 5, Name: "John Johnson", CompletedHours: 15, WorkHours: 40, Availability: "Available"},
    {AssistantID: 6, Name: "Jane Johnson", CompletedHours: 16, WorkHours: 40, Availability: "Available"},
    {AssistantID: 7, Name: "John Brown", CompletedHours: 14, WorkHours: 40, Availability: "Available"},
]