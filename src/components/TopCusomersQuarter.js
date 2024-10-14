import React, { useState, useEffect } from 'react';
import { Typography, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import {CustomTable} from "./OrderDetailsTable";
import { useTheme } from '@mui/material';
import { tokens } from '../theme';
import CustomGrayCard from "./CustomGrayCard";

const TopCustomersQuarter = ({ fetchAvailableYears, fetchAvailableQuarters, fetchRevenueData }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [availableYears, setAvailableYears] = useState([]);
    const [availableQuarters, setAvailableQuarters] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedQuarter, setSelectedQuarter] = useState('');
    const [chartData, setChartData] = useState([]);
    const [error, setError] = useState('');

    // Fetch available years on component mount
    useEffect(() => {
        const fetchYears = async () => {
            try {
                const years = await fetchAvailableYears();
                if (years.length === 0) {
                    setError('No years available');
                } else {
                    setAvailableYears(years);
                    setSelectedYear(years[0]?.Year);  // set first available year as default
                }
            } catch (error) {
                console.error('Error fetching years:', error);
                setError('Failed to fetch available years');
            }
        };
        fetchYears().then(r => console.log('Years fetched for table'));
    }, []);

    // Fetch available quarters when a year is selected
    useEffect(() => {
        const fetchQuarters = async () => {
            if (selectedYear) {
                try {
                    const quarters = await fetchAvailableQuarters(selectedYear);
                    if (quarters.length === 0) {
                        setError(`No quarters available for year ${selectedYear}`);
                    } else {
                        setAvailableQuarters(quarters);
                        setSelectedQuarter(quarters[0]?.Quarter); // set first available quarter as default
                    }
                } catch (error) {
                    console.error('Error fetching quarters:', error);
                    setError('Failed to fetch available quarters');
                }
            }
        };
        fetchQuarters().then(r => console.log('Quarters fetched'));
    }, [fetchAvailableQuarters, selectedYear]);

    // Fetch revenue data for the selected year and quarter
    useEffect(() => {
        const fetchData = async () => {
            if (selectedYear && selectedQuarter) {
                try {
                    const data = await fetchRevenueData(selectedYear, selectedQuarter);
                    if (data.length === 0) {
                        setError(`No data available for ${selectedYear} Q${selectedQuarter}`);
                    } else {
                        setChartData(data);
                        setError(''); // Clear any previous errors
                    }
                } catch (error) {
                    console.error('Error fetching revenue data:', error);
                    setError('Failed to fetch revenue data');
                }
            }
        };
        fetchData().then(r => console.log('Revenue data fetched'));
    }, [selectedYear, selectedQuarter, fetchRevenueData]);


    return (
        <CustomGrayCard>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" color="text.secondary">
                    Top Customers by Quarter
                </Typography>
                <Box display="flex" gap={2}>
                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel id="year-select-label" sx={{ color: colors.redAccent[500] }}>
                            Year
                        </InputLabel>
                        <Select
                            labelId="year-select-label"
                            id="year-select"
                            value={selectedYear}
                            label="Year"
                            onChange={(e) => {
                                setSelectedYear(e.target.value);
                                setSelectedQuarter('');
                                setError('');
                            }}
                            variant="outlined"
                            sx={{
                                color: colors.redAccent[500],
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: colors.redAccent[500],
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: colors.redAccent[300],
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: colors.redAccent[500],
                                },
                            }}
                        >
                            {availableYears.map((year) => (
                                <MenuItem key={year.Year} value={year.Year}>
                                    {year.Year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel id="quarter-select-label" sx={{ color: colors.redAccent[500] }}>
                            Quarter
                        </InputLabel>
                        <Select
                            labelId="quarter-select-label"
                            id="quarter-select"
                            value={selectedQuarter}
                            label="Quarter"
                            onChange={(e) => {
                                setSelectedQuarter(e.target.value);
                                setError('');
                            }}
                            variant="outlined"
                            disabled={!availableQuarters.length}
                            sx={{
                                color: colors.redAccent[500],
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: colors.redAccent[500],
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: colors.redAccent[300],
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: colors.redAccent[500],
                                },
                            }}
                        >
                            {availableQuarters.map((quarter) => (
                                <MenuItem key={quarter.Quarter} value={quarter.Quarter}>
                                    Q{quarter.Quarter}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            {error ? (
                <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                </Typography>
            ) : (
                <CustomTable
                    heading={`Top Customers for ${selectedYear} Q${selectedQuarter}`}
                    data={chartData}
                    maxHeight={400}
                    colorSelection={'redAccent'}
                />
            )}
        </CustomGrayCard>
    );
};

export default TopCustomersQuarter;