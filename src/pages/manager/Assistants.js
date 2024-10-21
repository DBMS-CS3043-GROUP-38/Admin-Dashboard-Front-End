import PageLayout from "../../layouts/PageLayout";
import Grid from "@mui/material/Grid2";
import CustomGrayCard from "../../components/CustomGrayCard";
import {AssistantSearch} from "../../components/Search";
import CustomTableWithProgressBar from "../../components/CustomTableWithProgressBar";
import {searchAssistantM} from "../../services/apiService";
import {useState} from "react";

const Assistants = () => {
    const [searchResults, setSearchResults] = useState([]);

    return (
        <PageLayout heading={'Assistants'} subHeading={'Details about Assistants'}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <CustomGrayCard>
                        <AssistantSearch onSearch={searchAssistantM} onResults={setSearchResults} />
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