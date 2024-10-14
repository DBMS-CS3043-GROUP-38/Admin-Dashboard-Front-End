import React from 'react';
import { CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
import CustomGrayCard from "../CustomGrayCard";

const RevenueLineChart = ({ revenueData }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Convert revenue values to numbers
    const formattedData = revenueData.map((item) => ({
        ...item,
        revenue: parseFloat(item.revenue),  // Convert revenue to a number
    }));

    //Reverse the data
    formattedData.reverse();

    return (
        <CustomGrayCard>
            <CardContent>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                    Revenue for the Past 30 days
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={formattedData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip
                            contentStyle={{
                                color: theme.palette.text.primary,
                                backgroundColor: theme.palette.background.paper,
                                border: `1px solid ${theme.palette.divider}`,
                            }}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke={colors.cyanAccent["500"]}
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </CustomGrayCard>
    );
};

const PastRevanueChart = ({ revenueData }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Convert revenue values to numbers and handle null values
    const formattedData = revenueData
        .filter((item) => item && item.month && item.revenue !== null) // filter out items with null values
        .map((item) => ({
            ...item,
            revenue: parseFloat(item.revenue),  // Convert revenue to a number
        }))
        .reverse(); // Reverse the data order

    return (
        <CustomGrayCard>
            <CardContent>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                    Revenue for the Past Year
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={formattedData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" /> {/* Update dataKey to match "month" */}
                        <YAxis />
                        <Tooltip
                            contentStyle={{
                                color: theme.palette.text.primary,
                                backgroundColor: theme.palette.background.paper,
                                border: `1px solid ${theme.palette.divider}`,
                            }}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke={colors.greenAccent["500"]}
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </CustomGrayCard>
    );
};


export {RevenueLineChart, PastRevanueChart};
