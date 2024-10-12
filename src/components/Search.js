import React, { useState } from 'react';
import {TextField, Box, Radio, RadioGroup, FormControlLabel, useTheme, Button} from '@mui/material';
import { tokens } from "../theme";

// General Search Component
const SearchComponent = ({ label, searchBy, setSearchBy, searchValue, setSearchValue, handleSearch }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', mb: 2 }}>
                <RadioGroup
                    row
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                    sx={{ color: colors.purpleAccent[500] }}
                >
                    <FormControlLabel
                        value="id"
                        control={<Radio sx={{
                            color: colors.purpleAccent[500],
                            '&.Mui-checked': {
                                color: colors.purpleAccent[500],
                            }
                        }} />}
                        label="ID"
                    />
                    <FormControlLabel
                        value="name"
                        control={<Radio sx={{
                            color: colors.purpleAccent[500],
                            '&.Mui-checked': {
                                color: colors.purpleAccent[500],
                            }
                        }} />}
                        label="Name"
                    />
                </RadioGroup>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    variant="outlined"
                    label={searchBy === 'id' ? `Search ${label} ID` : `Search ${label} Name`}
                    value={searchValue} // Use searchValue prop
                    onChange={(e) => setSearchValue(e.target.value)} // Update searchValue on change
                    sx={{
                        mr: 2,
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: colors.purpleAccent[900],
                            color: colors.purpleAccent[500],
                            '& fieldset': {
                                borderColor: colors.purpleAccent[500],
                            },
                            '&:hover fieldset': {
                                borderColor: colors.purpleAccent[500],
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: colors.purpleAccent[500],
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: colors.purpleAccent[500],
                            '&.Mui-focused': {
                                color: colors.purpleAccent[500],
                            },
                        },
                    }}
                />
                <Button
                    variant="contained"
                    sx={{
                        height: '50px',
                        color: colors.grey["100"],
                        backgroundColor: colors.purpleAccent["700"],
                        '&:hover': {
                            backgroundColor: colors.purpleAccent["800"],
                        },
                        '&:focus': {
                            outline: `2px solid ${colors.purpleAccent[500]}`,
                        },
                    }}
                    onClick={handleSearch} // Add the search functionality
                >
                    Search
                </Button>
            </Box>
        </Box>
    );
};

// Customer Search Component
const CustomerSearch = () => {
    const [searchBy, setSearchBy] = useState('id');
    const [searchValue, setSearchValue] = useState(''); // Define searchValue state
    const handleSearch = (value, searchBy) => {
        console.log(`Searching for Customer ${searchBy}: ${value}`);
    };

    return <SearchComponent label="Customer" searchBy={searchBy} setSearchBy={setSearchBy} searchValue={searchValue} setSearchValue={setSearchValue} handleSearch={handleSearch} />;
};

// Route Search Component
const RouteSearch = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [routeId, setRouteId] = useState(''); // State for Route ID

    const handleSearch = () => {
        console.log(`Searching for Route ID: ${routeId}`);
    };

    return (
        <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    variant="outlined"
                    label="Search Route ID"
                    value={routeId} // Use routeId state
                    onChange={(e) => setRouteId(e.target.value)} // Update routeId on change
                    sx={{
                        mr: 2,
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: colors.purpleAccent[900],
                            color: colors.purpleAccent[500],
                            '& fieldset': {
                                borderColor: colors.purpleAccent[500],
                            },
                            '&:hover fieldset': {
                                borderColor: colors.purpleAccent[500],
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: colors.purpleAccent[500],
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: colors.purpleAccent[500],
                            '&.Mui-focused': {
                                color: colors.purpleAccent[500],
                            },
                        },
                    }}
                />
                <Button
                    variant="contained"
                    sx={{
                        height: '50px',
                        color: colors.grey["100"],
                        backgroundColor: colors.purpleAccent["700"],
                        '&:hover': {
                            backgroundColor: colors.purpleAccent["800"],
                        },
                        '&:focus': {
                            outline: `2px solid ${colors.purpleAccent[500]}`,
                        },
                    }}
                    onClick={handleSearch} // Add the search functionality
                >
                    Search
                </Button>
            </Box>
        </Box>
    );
};

// Driver Search Component
const DriverSearch = () => {
    const [searchBy, setSearchBy] = useState('id');
    const [searchValue, setSearchValue] = useState(''); // Define searchValue state
    const handleSearch = (value, searchBy) => {
        console.log(`Searching for Driver ${searchBy}: ${value}`);
    };

    return <SearchComponent label="Driver" searchBy={searchBy} setSearchBy={setSearchBy} searchValue={searchValue} setSearchValue={setSearchValue} handleSearch={handleSearch} />;
};

// Assistant Search Component
const AssistantSearch = () => {
    const [searchBy, setSearchBy] = useState('id');
    const [searchValue, setSearchValue] = useState(''); // Define searchValue state
    const handleSearch = (value, searchBy) => {
        console.log(`Searching for Assistant ${searchBy}: ${value}`);
    };

    return <SearchComponent label="Assistant" searchBy={searchBy} setSearchBy={setSearchBy} searchValue={searchValue} setSearchValue={setSearchValue} handleSearch={handleSearch} />;
};

// Truck Search Component
const TruckSearch = () => {
    const [searchBy, setSearchBy] = useState('id');
    const [searchValue, setSearchValue] = useState(''); // Define searchValue state
    const handleSearch = (value, searchBy) => {
        console.log(`Searching for Truck ${searchBy}: ${value}`);
    };

    return <SearchComponent label="Truck" searchBy={searchBy} setSearchBy={setSearchBy} searchValue={searchValue} setSearchValue={setSearchValue} handleSearch={handleSearch} />;
};

export { CustomerSearch, RouteSearch, DriverSearch, AssistantSearch, TruckSearch };