import React from 'react';
import { CardContent, Typography } from '@mui/material';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';
import CustomGrayCard from "./CustomGrayCard";

const data = [
    { name: 'End Customers', value: 0 }, // Default values, will be updated by props
    { name: 'Retailers', value: 0 }
];

const CustomerPieChart = ({ endCustomers, retailers }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const COLORS = [colors.cyanAccent["500"], colors.greenAccent["700"]]; // Use your preferred colors for the pie chart

    // Update data with the values from props
    data[0].value = endCustomers;
    data[1].value = retailers;

    return (
        <CustomGrayCard>
            <CardContent>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                    Customer Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill={colors.cyanAccent["500"]}
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                color: theme.palette.text.primary,
                                backgroundColor: colors.cyanAccent[300],
                                border: `1px solid ${theme.palette.divider}`,
                            }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            horizontalAlign="center"
                            layout="horizontal"
                            wrapperStyle={{
                                paddingTop: '20px',
                                fontSize: '14px',
                                color: theme.palette.text.primary,
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </CustomGrayCard>
    );
};

export default CustomerPieChart;
