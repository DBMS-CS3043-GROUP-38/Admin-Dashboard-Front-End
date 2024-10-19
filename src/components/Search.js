import React, {useState} from 'react';
import {TextField, Box, Radio, RadioGroup, FormControlLabel, useTheme, Button, Typography} from '@mui/material';
import {tokens} from "../theme";
import {useNavigate} from "react-router-dom";

// General Search Component
const SearchComponent = ({label, searchBy, setSearchBy, searchValue, setSearchValue, handleSearch}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box sx={{mb: 4}}>
            <Box sx={{display: 'flex', mb: 2}}>
                <RadioGroup
                    row
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                    sx={{color: colors.purpleAccent[500]}}
                >
                    <FormControlLabel
                        value="id"
                        control={<Radio sx={{
                            color: colors.purpleAccent[500],
                            '&.Mui-checked': {
                                color: colors.purpleAccent[500],
                            }
                        }}/>}
                        label="ID"
                    />
                    <FormControlLabel
                        value="name"
                        control={<Radio sx={{
                            color: colors.purpleAccent[500],
                            '&.Mui-checked': {
                                color: colors.purpleAccent[500],
                            }
                        }}/>}
                        label="Name"
                    />
                </RadioGroup>
            </Box>

            <Box sx={{display: 'flex', alignItems: 'center'}}>
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
            <Typography mt={2} color={`${colors.purpleAccent["500"]}`}> Search without anything for a full
                list</Typography>
        </Box>
    );
};

// Customer Search Component
const CustomerSearch = ({onSearch, onResults}) => {
    const [searchBy, setSearchBy] = useState('id');
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        onSearch(searchBy, searchValue)
            .then(results => onResults(results))
            .catch(error => {
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
            });
    };

    return (
        <SearchComponent
            label="Customer"
            searchBy={searchBy}
            setSearchBy={setSearchBy}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            handleSearch={handleSearch}
        />
    );
};


// Route Search Component
const RouteSearch = ({onSearch, onResults}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const [routeId, setRouteId] = useState(''); // State for Route ID

    const handleSearch = () => {
        onSearch('id', routeId)
            .then(results => onResults(results))
            .catch(error => {
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
            });
    };

    return (
        <Box sx={{mb: 4}}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
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
            <Typography mt={2} color={`${colors.purpleAccent["500"]}`}> Search without anything for a full
                list</Typography>
        </Box>
    );
};

// Driver Search Component
const DriverSearch = ({onSearch, onResults}) => {
    const [searchBy, setSearchBy] = useState('id');
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        onSearch(searchBy, searchValue)
            .then(results => onResults(results))
            .catch(error => {
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
            });
    };

    return (
        <SearchComponent
            label="Driver"
            searchBy={searchBy}
            setSearchBy={setSearchBy}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            handleSearch={handleSearch}
        />
    );
}

// Assistant Search Component
const AssistantSearch = ({onSearch, onResults}) => {
    const [searchBy, setSearchBy] = useState('id');
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();


    const handleSearch = () => {
        onSearch(searchBy, searchValue)
            .then(results => onResults(results))
            .catch(error => {
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
            });
    };

    return (
        <SearchComponent
            label="Assistant"
            searchBy={searchBy}
            setSearchBy={setSearchBy}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            handleSearch={handleSearch}
        />
    );
}
// Truck Search Component
const TruckSearch = ({onSearch, onResults}) => {
    const [searchBy, setSearchBy] = useState('id');
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();


    const handleSearch = () => {
        onSearch(searchBy, searchValue)
            .then(results => onResults(results))
            .catch(error => {
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
            });
    };

    return (
        <SearchComponent
            label="Truck"
            searchBy={searchBy}
            setSearchBy={setSearchBy}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            handleSearch={handleSearch}
        />
    );
};

export {CustomerSearch, RouteSearch, DriverSearch, AssistantSearch, TruckSearch};