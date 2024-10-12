import PageLayout from "../../layouts/admin/PageLayout";
import {CustomTable} from "../../components/OrderDetailsTable";
import Grid from "@mui/material/Grid2";
import CustomGrayCard from "../../components/CustomGrayCard";
import {FormControl, InputLabel, MenuItem, Select, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import {useState} from "react";
import {
    AvailableAssistantsCard,
    AvailableDriversCard, AvailableTrucksCard, ReadyShipmentsCard,
} from "../../components/CompletedCard";

const Stores = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [selectedStore, setSelectedStore] = useState('');
    const stores = ['Store 1', 'Store 2', 'Store 3', 'Store 4', 'Store 5', 'Store 6', 'Store 7'];

    const handleStoreChange = (event) => {
        setSelectedStore(event.target.value);
    };

    const selectedStoreData = storesData.find(store => store.StoreName === selectedStore);

    return (
        <PageLayout heading={'Stores'} subHeading={'Details about stores'}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <CustomGrayCard>
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <FormControl sx={{minWidth: 500, borderRadius: 10}}>
                                    <InputLabel id="store-select-label" sx={{
                                        color: colors.purpleAccent[500],
                                        '&.Mui-focused': {color: colors.purpleAccent[500]} // Ensures the label remains purple when selected
                                    }}>
                                        Select Store
                                    </InputLabel>
                                    <Select
                                        variant="outlined"
                                        labelId="store-select-label"
                                        id="store-select"
                                        value={selectedStore}
                                        label="Select Store"
                                        onChange={handleStoreChange}
                                        sx={{
                                            outlineColor: colors.purpleAccent[500],
                                            backgroundColor: colors.purpleAccent[900],
                                            color: colors.purpleAccent[500],
                                            '& .MuiSelect-icon': {color: colors.purpleAccent[500]},
                                            '&:hover': {backgroundColor: colors.purpleAccent[900]},
                                        }}
                                    >
                                        {stores.map((store, index) => (
                                            <MenuItem
                                                key={index}
                                                value={store}
                                                sx={{
                                                    backgroundColor: colors.grey[800],
                                                    '&:hover': {backgroundColor: colors.purpleAccent[800]},
                                                }}
                                            >
                                                {store}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid size={3}>
                                <ReadyShipmentsCard readyShipments={5} totalShipments={16}/>
                            </Grid>
                            <Grid size={3}>
                                <AvailableAssistantsCard availableAssistants={10} totalAssistants={25}/>
                            </Grid>
                            <Grid size={3}>
                                <AvailableDriversCard availableDrivers={5} totalDrivers={10}/>
                            </Grid>
                            <Grid size={3}>
                                <AvailableTrucksCard availableTrucks={1} totalTrucks={10}/>
                            </Grid>
                        </Grid>
                    </CustomGrayCard>
                </Grid>

                <Grid size={12}>
                    <CustomTable data={storesData} heading={'Store Information'} colorSelection={'purpleAccent'}
                                 maxHeight={500}/>
                </Grid>
            </Grid>
        </PageLayout>

    );
}

export default Stores;

//Store data. Store ID, Store Name, Store City, Trucks, Drivers, Assistants, Orders, Sales
const storesData = [
    {
        StoreID: 1,
        StoreName: 'Store 1',
        StoreCity: 'City 1',
        Routes: 10,
        Trucks: 2,
        Drivers: 3,
        Assistants: 4,
        Orders: 5,
        Sales: 6
    },
    {
        StoreID: 2,
        StoreName: 'Store 2',
        StoreCity: 'City 2',
        Routes: 10,
        Trucks: 2,
        Drivers: 3,
        Assistants: 4,
        Orders: 5,
        Sales: 6
    },
    {
        StoreID: 3,
        StoreName: 'Store 3',
        StoreCity: 'City 3',
        Routes: 10,
        Trucks: 2,
        Drivers: 3,
        Assistants: 4,
        Orders: 5,
        Sales: 6
    },
    {
        StoreID: 4,
        StoreName: 'Store 4',
        StoreCity: 'City 4',
        Routes: 10,
        Trucks: 2,
        Drivers: 3,
        Assistants: 4,
        Orders: 5,
        Sales: 6
    },
    {
        StoreID: 5,
        StoreName: 'Store 5',
        StoreCity: 'City 5',
        Routes: 10,
        Trucks: 2,
        Drivers: 3,
        Assistants: 4,
        Orders: 5,
        Sales: 6
    },
    {
        StoreID: 6,
        StoreName: 'Store 6',
        StoreCity: 'City 6',
        Routes: 10,
        Trucks: 2,
        Drivers: 3,
        Assistants: 4,
        Orders: 5,
        Sales: 6
    },
    {
        StoreID: 7,
        StoreName: 'Store 7',
        StoreCity: 'City 7',
        Routes: 10,
        Trucks: 2,
        Drivers: 3,
        Assistants: 4,
        Orders: 5,
        Sales: 6
    },
];



