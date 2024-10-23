import PageLayout from "../../layouts/PageLayout";
import {tokens} from "../../theme";
import React, {useEffect, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select, Box, useTheme} from '@mui/material';
import {CustomTable} from "../../components/OrderDetailsTable";
import CustomGrayCard from "../../components/CustomGrayCard";
import {DispatchButton} from "../../components/DispatchButton";
import {getTodayTrainsSelector, getOrdersByTrain, dispatchTrain} from "../../services/apiService";
import {useNavigate} from "react-router-dom";

const Dispatch = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selectedTrain, setSelectedTrain] = useState("");
    const [Trains, setTrains] = useState([]);
    const [Dispatches, setDispatches] = useState([]);
    const navigate = useNavigate();

    // Move fetchTrains outside useEffect
    const fetchTrains = async () => {
        try {
            const data = await getTodayTrainsSelector();
            setTrains(data);
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
    };

    useEffect(() => {
        fetchTrains().then(() => console.log('Trains fetched'));
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrdersByTrain(selectedTrain);
                setDispatches(data);
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
        };

        if (selectedTrain) {
            fetchOrders().then(() => console.log('Orders fetched'));
        }
    }, [navigate, selectedTrain]);

    const handleChange = (event) => {
        setSelectedTrain(event.target.value);
        console.log(event.target.value);
    };

    const handleDispatch = async () => {
        try {
            const response = await dispatchTrain(selectedTrain);
            console.log('Train dispatched');
            return response;
        } catch (error) {
            alert('Error dispatching train');
            console.error('Error dispatching train:', error);
        }
    };

    const handleClose = () => {
        // Reset selected train and re-fetch trains
        setSelectedTrain("");
        fetchTrains().then(() => console.log('Trains re-fetched'));
    };

    return (
        <PageLayout heading={'Dispatch'} subHeading={'Select a train to view scheduled orders'}>
            <Box display='flex' flexDirection='column' sx={{gap: 2}}>
                <CustomGrayCard>
                    <FormControl sx={{ minWidth: 500, borderRadius: 10 }}>
                        <InputLabel
                            id="train-select-label"
                            sx={{
                                color: colors.yellowAccent[500],
                                '&.Mui-focused': { color: colors.yellowAccent[500] },
                            }}
                        >
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
                                '& .MuiSelect-icon': { color: colors.yellowAccent[500] },
                                '&:hover': { backgroundColor: colors.yellowAccent[900] },
                            }}
                        >
                            {Trains.length === 0 ? (
                                <MenuItem disabled>{'No trains for today'}</MenuItem>
                            ) : (
                                Trains.map((train) => (
                                    <MenuItem
                                        key={train.trainID}
                                        value={train.trainID}
                                        sx={{
                                            backgroundColor: colors.grey[800],
                                            '&:hover': { backgroundColor: colors.yellowAccent[800] },
                                        }}
                                    >
                                        {`ScheduleID: ${train.trainID} to ${train.Destination} at ${train.Time}`}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                    </FormControl>
                </CustomGrayCard>

                {selectedTrain && (
                    <CustomTable heading={`Dispatches for ScheduleID: ${selectedTrain}`} data={Dispatches} maxHeight={400}
                                 colorSelection={'yellowAccent'} />
                )}

                {selectedTrain && (
                    <CustomGrayCard>
                        <DispatchButton onDispatch={handleDispatch} resetData={handleClose} />
                    </CustomGrayCard>
                )}
            </Box>
        </PageLayout>
    );
};

export default Dispatch;
