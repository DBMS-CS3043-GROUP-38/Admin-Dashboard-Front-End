import React from 'react';
import {   CardContent, Typography } from '@mui/material';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
import CustomGrayCard from "../CustomGrayCard";

const RevenueLineChart = ({ revenueData }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <CustomGrayCard>
                <CardContent>
                    <Typography variant="h5" color="text.secondary" gutterBottom>
                        Revenue for the Past 12 Months
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
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

export default RevenueLineChart;