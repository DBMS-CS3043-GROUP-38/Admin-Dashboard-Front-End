import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import {CustomTable} from './OrderDetailsTable'; // Import your CustomTable

const TopCustomersCard = ({ topCustomers }) => {
    const [selectedYear, setSelectedYear] = useState(Object.keys(topCustomers)[0]);
    const [selectedQuarter, setSelectedQuarter] = useState(Object.keys(topCustomers[selectedYear])[0]);

    const handleYearChange = (event) => {
        const newYear = event.target.value;
        setSelectedYear(newYear);
        setSelectedQuarter(Object.keys(topCustomers[newYear])[0]); // Reset quarter when year changes
    };

    const handleQuarterChange = (event) => {
        setSelectedQuarter(event.target.value);
    };

    const getCustomersForYearAndQuarter = (year, quarter) => {
        return topCustomers[year][quarter] || [];
    };

    const customers = getCustomersForYearAndQuarter(selectedYear, selectedQuarter);

    return (
        <Card sx={{ minWidth: 275, maxWidth: 800, margin: 'auto' }}>
            <CardHeader
                title="Top Performing Customers"
                action={
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel id="year-select-label">Year</InputLabel>
                            <Select
                                variant={"outlined"}
                                labelId="year-select-label"
                                value={selectedYear}
                                label="Year"
                                onChange={handleYearChange}
                            >
                                {Object.keys(topCustomers).map((year) => (
                                    <MenuItem key={year} value={year}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel id="quarter-select-label">Quarter</InputLabel>
                            <Select
                                variant={"outlined"}
                                labelId="quarter-select-label"
                                value={selectedQuarter}
                                label="Quarter"
                                onChange={handleQuarterChange}
                            >
                                {Object.keys(topCustomers[selectedYear]).map((quarter) => (
                                    <MenuItem key={quarter} value={quarter}>
                                        {quarter}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                }
            />
            <CardContent>
                <CustomTable
                    data={customers}
                    colorSelection="cyanAccent"
                    heading="Top Customers"
                    maxHeight={400}
                />
            </CardContent>
        </Card>
    );
};

export default TopCustomersCard;
