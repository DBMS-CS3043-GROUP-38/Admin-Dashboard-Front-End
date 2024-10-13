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
import {tokens} from "../../theme";
import Card from "../CustomGrayCard";

const OrdersStatusChart = ({data}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

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

    // Find Delivered and Cancelled counts
    const deliveredEntry = data.find(item => item.status === 'Delivered');
    const cancelledEntry = data.find(item => item.status === 'Cancelled');
    const Delivered = deliveredEntry ? deliveredEntry.count : 0;
    const Cancelled = cancelledEntry ? cancelledEntry.count : 0;

    // Filter out Delivered and Cancelled for chart data
    const rest = data.filter(item => item.status !== 'Delivered' && item.status !== 'Cancelled');

    console.log(rest); // Check if rest contains the expected data

    return (
        <Card>
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
                            data={rest}
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
                                {rest.map((entry, index) => (
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
                        Delivered: {Delivered}
                    </Typography>
                    <Typography variant="h4" color={theme.palette.error.main}>
                        Cancelled: {Cancelled}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};


const OrdersStatusChartH = ({ data }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

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

    // Extract Delivered and Cancelled counts from data
    const deliveredEntry = data.find(item => item.status === 'Delivered');
    const cancelledEntry = data.find(item => item.status === 'Cancelled');
    const Delivered = deliveredEntry ? deliveredEntry.count : 0;
    const Cancelled = cancelledEntry ? cancelledEntry.count : 0;

    // Filter out Delivered and Cancelled for chart data
    const chartData = data.filter(item => item.status !== 'Delivered' && item.status !== 'Cancelled');

    return (
        <Card>
            <Typography
                variant="h6"
                color="text.primary"
                gutterBottom
                sx={{ mb: 1 }}
            >
                Number of Orders by Status
            </Typography>

            <Box>
                <ResponsiveContainer minHeight={300}>
                    <BarChart data={chartData} layout="vertical">
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
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={barColors[index % barColors.length]}
                                />
                            ))}
                            <LabelList dataKey="count" position="right" fill={theme.palette.text.primary} />
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
                    Delivered: {Delivered}
                </Typography>
                <Typography variant="h4" color={theme.palette.error.main}>
                    Cancelled: {Cancelled}
                </Typography>
            </Box>
        </Card>
    );
};


export {OrdersStatusChart, OrdersStatusChartH};