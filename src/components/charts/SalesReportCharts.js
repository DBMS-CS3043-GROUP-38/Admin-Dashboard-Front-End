import React, {useMemo, useState} from 'react';
import {CardContent, Typography, FormControl, InputLabel, Select, MenuItem, Box} from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie, Cell
} from 'recharts';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
import CustomGrayCard from "../CustomGrayCard";

const RevenueGroupedBarChart = ({ revenueData }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // State for selected year
    const [selectedYear, setSelectedYear] = useState(Object.keys(revenueData)[0]); // Set default to the first year

    // Extracting the data for the selected year
    const chartData = revenueData[selectedYear];

    return (
        <CustomGrayCard>
            <CardContent>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                    Revenue by Store for {selectedYear}
                </Typography>
                <FormControl variant="filled" margin="normal" sx={{
                    m:2
                }}>
                    <InputLabel color={'secondary'}>Year</InputLabel>
                    <Select
                        variant={'filled'}
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        {Object.keys(revenueData).map(year => (
                            <MenuItem key={year} value={year}>{year}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="quarter" />
                        <YAxis />
                        <Tooltip
                            contentStyle={{
                                color: theme.palette.text.primary,
                                backgroundColor: theme.palette.background.paper,
                                border: `1px solid ${theme.palette.divider}`,
                            }}
                        />
                        <Legend />
                        <Bar dataKey="store1" fill={colors.greenAccent["500"]} />
                        <Bar dataKey="store2" fill={colors.redAccent["500"]} />
                        <Bar dataKey="store3" fill={colors.yellowAccent["500"]} />
                        <Bar dataKey="store4" fill={colors.purpleAccent["500"]} />
                        <Bar dataKey="store5" fill={colors.cyanAccent["500"]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </CustomGrayCard>
    );
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const ProductPerformancePieChart = ({ data }) => {
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedQuarter, setSelectedQuarter] = useState('');

    const years = useMemo(() => [...new Set(data.map(item => item.year))], [data]);
    const quarters = useMemo(() => [...new Set(data.map(item => item.quarter))], [data]);

    const filteredData = useMemo(() => {
        if (!selectedYear || !selectedQuarter) return [];
        return data.filter(item => item.year === selectedYear && item.quarter === selectedQuarter);
    }, [data, selectedYear, selectedQuarter]);

    const chartData = useMemo(() => {
        return filteredData.map(item => ({
            name: item.productName,
            value: item.sales
        }));
    }, [filteredData]);

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Best Performing Products
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Select
                    variant={"filled"}
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    displayEmpty
                    sx={{ minWidth: 120 }}
                >
                    <MenuItem value="">
                        <em>Select Year</em>
                    </MenuItem>
                    {years.map(year => (
                        <MenuItem key={year} value={year}>{year}</MenuItem>
                    ))}
                </Select>
                <Select
                    variant={"filled"}
                    value={selectedQuarter}
                    onChange={(e) => setSelectedQuarter(e.target.value)}
                    displayEmpty
                    sx={{ minWidth: 120 }}
                >
                    <MenuItem value="">
                        <em>Select Quarter</em>
                    </MenuItem>
                    {quarters.map(quarter => (
                        <MenuItem key={quarter} value={quarter}>{quarter}</MenuItem>
                    ))}
                </Select>
            </Box>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
};


export {RevenueGroupedBarChart, ProductPerformancePieChart};