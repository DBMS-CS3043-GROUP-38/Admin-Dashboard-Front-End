import React from 'react';
import {Box, CardContent, Typography} from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Cell, LabelList
} from 'recharts';
import {useTheme} from '@mui/material/styles';
import {tokens} from "../theme";
import Card from "./CustomGrayCard";

const OrdersStatusChart = ({orderStatuses}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Transform data for the chart
    const data = [
        {status: 'Pending', count: orderStatuses.pending},
        {status: 'Pending Train', count: orderStatuses.pendingTrain},
        {status: 'Train Assigned', count: orderStatuses.trainAssigned},
        {status: 'In Train', count: orderStatuses.inTrain},
        {status: 'In Store', count: orderStatuses.inStore},
        {status: 'In Shipment', count: orderStatuses.inShipment},
        {status: 'In Truck', count: orderStatuses.inTruck},
        {status: 'Attention', count: orderStatuses.attention}
    ];

    const barColors = [
        colors.yellowAccent["500"],
        colors.greenAccent["500"],
        colors.cyanAccent["500"],
        colors.purpleAccent["500"],
        colors.purpleAccent["200"],
        colors.greenAccent["600"],
        colors.grey["500"],
        colors.redAccent["500"],
    ];

    return (
        <Card >
            <CardContent>
                <Typography
                    variant="h6"
                    color="text.primary"
                    gutterBottom
                    sx={{mb: 1}} // Reduced margin bottom
                >
                    Number of Orders by Status
                </Typography>

                <Box> {/* Reduced height */}
                    <ResponsiveContainer minHeight={300}>
                        <BarChart
                            data={data}
                            layout="vertical"
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke={theme.palette.divider}
                            />
                            <XAxis
                                type="number"
                                stroke={theme.palette.text.secondary}
                            />
                            <YAxis
                                dataKey="status"
                                type="category"
                                width={90}
                                stroke={theme.palette.text.secondary}
                            />
                            <Legend/>
                            <Bar dataKey="count" barSize={10}>
                                {data.map((entry, index) => (
                                    <Cell
                                        key={entry.status}
                                        fill={barColors[index % barColors.length]}
                                    />
                                ))}
                                <LabelList dataKey="count" position="right" fill={theme.palette.text.primary}/>
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </Box>

                <Box sx={{
                    mt: 1, // Reduced margin top
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderTop: `1px solid ${theme.palette.divider}`,
                    pt: 1 // Reduced padding top
                }}>
                    <Typography variant="h4" color={theme.palette.success.main}>
                        Delivered: {orderStatuses.delivered}
                    </Typography>
                    <Typography variant="h4" color={theme.palette.error.main}>
                        Cancelled: {orderStatuses.cancelled}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

const OrdersStatusChartH = ({orderStatuses}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Transform data for the chart
    const data = [
        {status: 'Pending', count: orderStatuses.pending},
        {status: 'Pending Train', count: orderStatuses.pendingTrain},
        {status: 'Train Assigned', count: orderStatuses.trainAssigned},
        {status: 'In Train', count: orderStatuses.inTrain},
        {status: 'In Store', count: orderStatuses.inStore},
        {status: 'In Shipment', count: orderStatuses.inShipment},
        {status: 'In Truck', count: orderStatuses.inTruck},
        {status: 'Attention', count: orderStatuses.attention}
    ];

    const barColors = [
        colors.yellowAccent["500"],
        colors.greenAccent["500"],
        colors.cyanAccent["500"],
        colors.purpleAccent["500"],
        colors.purpleAccent["200"],
        colors.greenAccent["600"],
        colors.grey["500"],
        colors.redAccent["500"],
    ];

    return (
        <Card >
                <Typography
                    variant="h6"
                    color="text.primary"
                    gutterBottom
                    sx={{mb: 1}}
                >
                    Number of Orders by Status
                </Typography>

                <Box>
                    <ResponsiveContainer minHeight={300}>
                        <BarChart
                            data={data}
                            layout="vertical"
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke={theme.palette.divider}
                            />
                            <XAxis
                                type="number"
                                stroke={theme.palette.text.secondary}
                            />
                            <YAxis
                                dataKey="status"
                                type="category"
                                width={90}
                                stroke={theme.palette.text.secondary}
                            />
                            <Bar dataKey="count" fill={colors.yellowAccent["600"]}>
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={barColors[index % barColors.length]}
                                    />
                                ))}
                                <LabelList dataKey="count" position="right" fill={theme.palette.text.primary}/>
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </Box>

                <Box sx={{
                    mt: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderTop: `1px solid ${theme.palette.divider}`,
                    pt: 1
                }}>
                    <Typography variant="h4" color={theme.palette.success.main}>
                        Delivered: {orderStatuses.delivered}
                    </Typography>
                    <Typography variant="h4" color={theme.palette.error.main}>
                        Cancelled: {orderStatuses.cancelled}
                    </Typography>
                </Box>
        </Card>
    );
};

export {OrdersStatusChart, OrdersStatusChartH};