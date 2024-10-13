import PageLayout from "../../layouts/admin/PageLayout";
import {tokens} from "../../theme";
import React, {useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select, Box, useTheme} from '@mui/material';
import {CustomTable} from "../../components/OrderDetailsTable";
import CustomGrayCard from "../../components/CustomGrayCard";
import DispatchButton from "../../components/DispatchButton";

const Trains = [
    {trainID: 1, Time: "2022-01-01 08:00:00", Destination: "New York"},
    {trainID: 2, Time: "2022-01-01 09:00:00", Destination: "Los Angeles"},
    {trainID: 3, Time: "2022-01-01 10:00:00", Destination: "Chicago"},
    {trainID: 4, Time: "2022-01-01 11:00:00", Destination: "Houston"},
    {trainID: 5, Time: "2022-01-01 12:00:00", Destination: "Phoenix"},
    {trainID: 6, Time: "2022-01-01 13:00:00", Destination: "Philadelphia"},
    {trainID: 7, Time: "2022-01-01 14:00:00", Destination: "San Antonio"},
    {trainID: 8, Time: "2022-01-01 15:00:00", Destination: "San Diego"},
];

const Dispatches = [
    {orderID: 1, customerID: 1, Capacity: 100, Price: 1000},
    {orderID: 2, customerID: 2, Capacity: 200, Price: 2000},
    {orderID: 3, customerID: 3, Capacity: 300, Price: 3000},
    {orderID: 4, customerID: 4, Capacity: 400, Price: 4000},
    {orderID: 5, customerID: 5, Capacity: 500, Price: 5000},
    {orderID: 6, customerID: 6, Capacity: 600, Price: 6000},
    {orderID: 7, customerID: 7, Capacity: 700, Price: 7000},
    {orderID: 8, customerID: 8, Capacity: 800, Price: 8000}
];

const ScheduledOrders = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selectedTrain, setSelectedTrain] = useState("");


    const handleChange = (event) => {
        setSelectedTrain(event.target.value);
    };

    const trainDetails = Trains.find(train => train.trainID === selectedTrain);

    return (
        <PageLayout heading={'Dispatch'} subHeading={'Select a train to view scheduled orders'}>

            <Box display='flex' flexDirection='column' sx={{gap: 2}}>
                <CustomGrayCard>
                    <FormControl sx={{minWidth: 500, borderRadius: 10}}>
                        <InputLabel id="train-select-label" sx={{
                            color: colors.yellowAccent[500], '&.Mui-focused': {color: colors.yellowAccent[500]} // Ensures the label remains yellow when selected
                        }}>
                            Select Train
                        </InputLabel>
                        <Select
                            variant="outlined"
                            labelId="train-select-label"
                            id="train-select"
                            value={selectedTrain}
                            label="Select Train"
                            onChange={handleChange}
                            sx={{
                                outlineColor: colors.yellowAccent[500],
                                backgroundColor: colors.yellowAccent[900],
                                color: colors.yellowAccent[500],
                                '& .MuiSelect-icon': {color: colors.yellowAccent[500]},
                                '&:hover': {backgroundColor: colors.yellowAccent[900]},
                            }}
                        >
                            {Trains.map((train) => (
                                <MenuItem
                                    key={train.trainID}
                                    value={train.trainID}
                                    sx={{
                                        backgroundColor: colors.grey[800],
                                        '&:hover': {backgroundColor: colors.yellowAccent[800]},
                                    }}
                                >
                                    {`TrainID:  ${train.trainID} to ${train.Destination} at ${train.Time}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </CustomGrayCard>

                {trainDetails && (
                    <CustomTable heading={`Dispatches for TrainID: ${selectedTrain}`} data={Dispatches} maxHeight={400}
                                 colorSelection={'yellowAccent'}/>
                )}

                {trainDetails && (
                <CustomGrayCard>
                    <DispatchButton onDispatch={() => console.log('Scheduled')} onDispatch={() => console.log('Dispatched')}/>
                </CustomGrayCard>
                    )}
            </Box>
        </PageLayout>
    );
};

export default ScheduledOrders;
