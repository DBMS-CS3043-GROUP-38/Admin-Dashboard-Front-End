import PageLayout from "../../layouts/PageLayout";
import {CustomTable} from "../../components/OrderDetailsTable";
import Grid from "@mui/material/Grid2";
import CustomGrayCard from "../../components/CustomGrayCard";
import {FormControl, InputLabel, MenuItem, Select, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import {useEffect, useState} from "react";
import {
    AvailableAssistantsCard,
    AvailableDriversCard, AvailableTrucksCard, ReadyShipmentsCard,
} from "../../components/CompletedCard";
import {useNavigate} from "react-router-dom";

import {getStores, getReadyShipment, getAvailableAssistants, getAvailableDrivers, getAvailableTrucks, getStoreData} from "../../services/apiService";
import MultiLineChart from "../../components/MultilineRouteChart";

const Stores = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(0);
    const [readyShipments, setReadyShipments] = useState([]);
    const [availableAssistants, setAvailableAssistants] = useState([]);
    const [availableDrivers, setAvailableDrivers] = useState([]);
    const [availableTrucks, setAvailableTrucks] = useState([]);
    const [storesData, setStoresData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const stores = await getStores();
                setStores(stores);
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

        fetchData().then(() => console.log('Stores Data fetched'));
    }, []);

    const handleStoreChange = (event) => {
        setSelectedStore(event.target.value);
        console.log(event.target.value);
    };

    useEffect(() => {
        try {
            getReadyShipment(selectedStore).then((data) => {
                setReadyShipments(data);
                console.log(data);
            });
            getAvailableAssistants(selectedStore).then((data) => {
                setAvailableAssistants(data);
                console.log(data);
            });
            getAvailableDrivers(selectedStore).then((data) => {
                setAvailableDrivers(data);
                console.log(data);
            });
            getAvailableTrucks(selectedStore).then((data) => {
                setAvailableTrucks(data);
                console.log(data);
            });
            getStoreData().then((data) => {
                setStoresData(data);
                console.log(data);
            });
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
    }, [navigate, selectedStore]);

    return (
        <PageLayout heading={'Stores'} subHeading={'Details about stores'}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CustomGrayCard>
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                 <FormControl sx={{ minWidth: 500, borderRadius: 10 }}>
                                    <InputLabel
                                        id="store-select-label"
                                        sx={{
                                            color: colors.purpleAccent[500],
                                            '&.Mui-focused': { color: colors.purpleAccent[500] }
                                        }}
                                    >
                                        Select Store
                                    </InputLabel>
                                    <Select
                                        variant="outlined"
                                        labelId="store-select-label"
                                        id="store-select"
                                        value={selectedStore || ""} // Handle initial empty state
                                        label="Select Store"
                                        onChange={handleStoreChange}
                                        sx={{
                                            outlineColor: colors.purpleAccent[500],
                                            backgroundColor: colors.purpleAccent[900],
                                            color: colors.purpleAccent[500],
                                            '& .MuiSelect-icon': { color: colors.purpleAccent[500] },
                                            '&:hover': { backgroundColor: colors.purpleAccent[900] },
                                        }}
                                    >
                                        {stores.length > 0 ? (
                                            stores.map((store) => (
                                                <MenuItem
                                                    key={store.StoreID}
                                                    value={store.StoreID}
                                                    sx={{
                                                        backgroundColor: colors.grey[800],
                                                        '&:hover': { backgroundColor: colors.purpleAccent[800] },
                                                    }}
                                                >
                                                    {store.City}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem disabled>
                                                No Stores Available
                                            </MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid size={3}>
                                <ReadyShipmentsCard readyShipments={readyShipments.Ready} totalShipments={readyShipments.NotReady} />
                            </Grid>
                            <Grid size={3}>
                                <AvailableAssistantsCard availableAssistants={availableAssistants.Available} totalAssistants={availableAssistants.Available + availableAssistants.Busy}/>
                            </Grid>
                            <Grid size={3}>
                                <AvailableDriversCard availableDrivers={availableDrivers.Available} totalDrivers={availableDrivers.Available + availableDrivers.Busy}/>
                            </Grid>
                            <Grid size={3}>
                                <AvailableTrucksCard availableTrucks={availableTrucks.Available} totalTrucks={availableTrucks.Available + availableTrucks.Busy}/>
                            </Grid>
                        </Grid>
                    </CustomGrayCard>
                </Grid>

                <Grid size={12}>
                    <CustomTable data={storesData} heading={'Store Information'} colorSelection={'purpleAccent'} maxHeight={500} />
                </Grid>
            </Grid>
        </PageLayout>
    );
}

export default Stores;