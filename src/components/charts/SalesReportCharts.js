import React, { useState, useEffect } from 'react';
import { CardContent, Typography, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
import CustomGrayCard from "../CustomGrayCard";

const RevenueBarChart = ({ fetchAvailableYears, fetchAvailableQuarters, fetchRevenueData }) => {
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
        fetchYears().then(r => console.log('Years fetched'));
    }, [fetchAvailableYears]);

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
                    throw error;
                }
            }
        };
        fetchData().then(() => console.log('Data fetched successfully'));
    }, [selectedYear, selectedQuarter, fetchRevenueData]);

    // Calculate the domain for the y-axis
    const getYAxisDomain = () => {
        if (chartData.length === 0) return [0, 100];
        const maxRevenue = Math.max(...chartData.map(item => item.revenue));
        const minRevenue = Math.min(...chartData.map(item => item.revenue));
        const padding = (maxRevenue - minRevenue) * 0.1; // Add 10% padding
        return [Math.max(0, minRevenue - padding), maxRevenue + padding];
    };

    return (
        <CustomGrayCard>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h5" color="text.secondary">
                        Revenue per store
                    </Typography>
                    <Box display="flex" gap={2}>
                        <FormControl sx={{ minWidth: 120, borderRadius: 10 }}>
                            <InputLabel
                                id="year-select-label"
                                sx={{
                                    color: colors.purpleAccent[500],
                                    '&.Mui-focused': { color: colors.purpleAccent[500] },
                                }}
                            >
                                Year
                            </InputLabel>
                            <Select
                                labelId="year-select-label"
                                id="year-select"
                                value={selectedYear}
                                label="Year"
                                onChange={(e) => {
                                    setSelectedYear(e.target.value);
                                    setSelectedQuarter('');  // Reset quarter selection
                                    setError('');  // Clear any existing errors
                                }}
                                variant="outlined"
                                sx={{
                                    outlineColor: colors.purpleAccent[500],
                                    backgroundColor: colors.purpleAccent[900],
                                    color: colors.purpleAccent[500],
                                    '& .MuiSelect-icon': { color: colors.purpleAccent[500] },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: colors.purpleAccent[500],
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: colors.purpleAccent[300],
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: colors.purpleAccent[500],
                                    },
                                    '&:hover': { backgroundColor: colors.purpleAccent[900] },
                                }}
                            >
                                {availableYears.length > 0 ? (
                                    availableYears.map((year) => (
                                        <MenuItem
                                            key={year.Year}
                                            value={year.Year}
                                            sx={{
                                                backgroundColor: colors.grey[800],
                                                '&:hover': { backgroundColor: colors.purpleAccent[800] },
                                            }}
                                        >
                                            {year.Year}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>
                                        No Years Available
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ minWidth: 120, borderRadius: 10 }}>
                            <InputLabel
                                id="quarter-select-label"
                                sx={{
                                    color: colors.purpleAccent[500],
                                    '&.Mui-focused': { color: colors.purpleAccent[500] },
                                }}
                            >
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
                                    outlineColor: colors.purpleAccent[500],
                                    backgroundColor: colors.purpleAccent[900],
                                    color: colors.purpleAccent[500],
                                    '& .MuiSelect-icon': { color: colors.purpleAccent[500] },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: colors.purpleAccent[500],
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: colors.purpleAccent[300],
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: colors.purpleAccent[500],
                                    },
                                    '&:hover': { backgroundColor: colors.purpleAccent[900] },
                                }}
                            >
                                {availableQuarters.length > 0 ? (
                                    availableQuarters.map((quarter) => (
                                        <MenuItem
                                            key={quarter.Quarter}
                                            value={quarter.Quarter}
                                            sx={{
                                                backgroundColor: colors.grey[800],
                                                '&:hover': { backgroundColor: colors.purpleAccent[800] },
                                            }}
                                        >
                                            Q{quarter.Quarter}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>
                                        No Quarters Available
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>

                    </Box>
                </Box>

                {error ? (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="store" />
                            <YAxis domain={getYAxisDomain()} />
                            <Tooltip
                                contentStyle={{
                                    color: theme.palette.text.primary,
                                    backgroundColor: theme.palette.background.paper,
                                    border: `1px solid ${theme.palette.divider}`,
                                }}
                            />
                            <Legend />
                            <Bar dataKey="revenue" fill={colors.purpleAccent[600]} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </CustomGrayCard>
    );
};

export { RevenueBarChart };