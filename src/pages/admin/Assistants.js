import PageLayout from "../../layouts/admin/PageLayout";
import Grid from "@mui/material/Grid2";
import CustomGrayCard from "../../components/CustomGrayCard";
import {AssistantSearch} from "../../components/Search";
import CustomTableWithProgressBar from "../../components/CustomTableWithProgressBar";
import {searchAssistant} from "../../services/apiService";
import {useState} from "react";

const Assistants = () => {
    const [searchResults, setSearchResults] = useState([]);

    return (
        <PageLayout heading={'Assistants'} subHeading={'Details about Assistants'}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <CustomGrayCard>
                        <AssistantSearch onSearch={searchAssistant} onResults={setSearchResults} />
                    </CustomGrayCard>
                </Grid>
                <Grid size={12}>
                    <CustomTableWithProgressBar heading={'Assistant List'} colorSelection={'purpleAccent'} maxHeight={600} data={searchResults} />
                </Grid>
            </Grid>
        </PageLayout>
    );
}

export default Assistants;