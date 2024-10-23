import React, { useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
    Box,
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    Button,
    Typography,
    FormGroup
} from '@mui/material';
import Grid from "@mui/material/Grid2";
import {tokens} from "../theme";
import {useTheme} from "@mui/material";

const COLORS = [
    "#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#387908",
    "#8a2be2", "#00bfff", "#ff6347", "#daa520", "#4caf50",
    "#ff1493", "#32cd32", "#ff4500", "#9370db", "#20b2aa"
];

const MultiLineChart = ({ data = [] }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Process data: convert revenue strings to numbers
    const processedData = data.map(item => ({
        ...item,
        revenue: parseFloat(item.revenue)
    }));

    // Get unique RouteIDs and quarters
    const routes = [...new Set(processedData.map(item => item.RouteID))].sort((a, b) => a - b);

    // Initialize state before any conditional returns
    const [selectedRoutes, setSelectedRoutes] = useState(
        new Set(routes.slice(0, 5).map(route => route.toString()))
    );

    // If no data, show empty state
    if (!data || data.length === 0) {
        return (
            <Card>
                <CardContent>
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
                        <Typography color="textSecondary">
                            No data available
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    }

    const quarters = [...new Set(processedData.map(item => item.quarter))];

    // Organize data by quarter
    const organizedData = quarters.map(quarter => {
        const quarterData = { quarter };
        routes.forEach(routeId => {
            const routeData = processedData.find(
                item => item.quarter === quarter && item.RouteID === routeId
            );
            quarterData[`route${routeId}`] = routeData ? routeData.revenue : null;
        });
        return quarterData;
    });

    // Handle route toggle
    const toggleRoute = (routeId) => {
        const newSelected = new Set(selectedRoutes);
        if (newSelected.has(routeId.toString())) {
            newSelected.delete(routeId.toString());
        } else {
            newSelected.add(routeId.toString());
        }
        setSelectedRoutes(newSelected);
    };

    // Select/Deselect all routes
    const toggleAll = (selectAll) => {
        if (selectAll) {
            setSelectedRoutes(new Set(routes.map(route => route.toString())));
        } else {
            setSelectedRoutes(new Set());
        }
    };

    return (
        <Card>
            <CardContent>
                <Box mb={2}>
                    <Box display="flex" gap={2} mb={2}>
                        <Button
                            variant="contained"
                            onClick={() => toggleAll(true)}
                            size="small"
                            sx={{
                                color: colors.purpleAccent["100"],
                                bgcolor: colors.purpleAccent["700"],
                                '&:hover': {
                                    bgcolor: colors.purpleAccent["800"]
                                }
                            }}
                        >
                            Select All
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => toggleAll(false)}
                            size="small"
                            sx={{
                                color: colors.purpleAccent["100"],
                                borderColor: colors.purpleAccent["700"],
                                '&:hover': {
                                    borderColor: colors.purpleAccent["800"]
                                }
                            }}
                        >
                            Clear All
                        </Button>
                    </Box>
                    <FormGroup>
                        <Grid container spacing={1}>
                            {routes.map((route, index) => (
                                <Grid size={2} key={route}>
                                    <FormControlLabel
                                        control={
                                            // For a single checkbox, modify the FormControlLabel's Checkbox component:
                                            <Checkbox
                                                checked={selectedRoutes.has(route.toString())}
                                                onChange={() => toggleRoute(route)}
                                                size="small"
                                                sx={{
                                                    color: COLORS[index % COLORS.length], // unchecked color
                                                    '&.Mui-checked': {
                                                        color: COLORS[index % COLORS.length], // checked color
                                                    }
                                                }}
                                            />
                                        }
                                        label={
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <Box
                                                    width={12}
                                                    height={12}
                                                    borderRadius="50%"
                                                    bgcolor={COLORS[index % COLORS.length]}
                                                />
                                                <Typography variant="body2">
                                                    Route {route}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </FormGroup>
                </Box>

                <Box height={400}>
                    <ResponsiveContainer>
                        <LineChart
                            data={organizedData}
                            margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="quarter"
                                tick={{ fontSize: 12 }}
                                padding={{ left: 20, right: 20 }}
                            />
                            <YAxis
                                tick={{ fontSize: 12 }}
                                tickFormatter={value => `$${(value / 1000).toFixed(0)}k`}
                            />
                            // Find this part in your code and replace the Tooltip component:
                            <Tooltip
                                formatter={(value, name) => {
                                    // Extract route number from the dataKey (e.g., "route11" -> "11")
                                    const routeNumber = name.replace('route', '');
                                    return [`$${value?.toFixed(2) || '0.00'}`, `${routeNumber}`];
                                }}
                            />
                            <Legend />

                            {routes.map((route, index) => (
                                selectedRoutes.has(route.toString()) && (
                                    <Line
                                        key={route}
                                        type="monotone"
                                        dataKey={`route${route}`}
                                        name={`Route ${route}`}
                                        stroke={COLORS[index % COLORS.length]}
                                        dot={true}
                                        connectNulls={true}
                                    />
                                )
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
};

export default MultiLineChart;