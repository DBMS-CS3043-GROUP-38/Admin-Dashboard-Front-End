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

    // Convert TotalRevenue to numbers and handle null/empty values
    const formattedData = (revenueData || [])
        .filter((item) => item && item.quarter && item.TotalRevenue !== null) // filter out invalid entries
        .map((item) => ({
            ...item,
            TotalRevenue: parseFloat(item.TotalRevenue),  // Convert TotalRevenue to a number
        }))
        .reverse(); // Reverse the data order

    return (
        <CustomGrayCard>
            <CardContent>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                    Quarterly Revenue
                </Typography>
                {formattedData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={formattedData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="quarter" /> {/* Update dataKey to "quarter" */}
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
                                dataKey="TotalRevenue"
                                stroke={colors.greenAccent["500"]}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <Typography variant="body1" color="text.secondary">
                        No revenue data available.
                    </Typography>
                )}
            </CardContent>
        </CustomGrayCard>
    );
};



export {RevenueLineChart, PastRevanueChart};
