import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import {CustomTable} from './OrderDetailsTable'; // Make sure to import your CustomTable component

const TopProductsCard = ({ topProducts, colorSelection }) => {
    const [selectedYear, setSelectedYear] = useState(Object.keys(topProducts)[0]);
    const [selectedQuarter, setSelectedQuarter] = useState(Object.keys(topProducts[selectedYear])[0]);

    const handleYearChange = (event) => {
        const newYear = event.target.value;
        setSelectedYear(newYear);
        setSelectedQuarter(Object.keys(topProducts[newYear])[0]);
    };

    const handleQuarterChange = (event) => {
        setSelectedQuarter(event.target.value);
    };

    const getProductsForYearAndQuarter = (year, quarter) => {
        return Object.values(topProducts[year][quarter]).sort((a, b) => b.revenue - a.revenue);
    };

    const products = getProductsForYearAndQuarter(selectedYear, selectedQuarter);

    return (
        <Card sx={{ minWidth: 275, maxWidth: 800, margin: 'auto' }}>
            <CardHeader
                title="Top Performing Products"
                action={
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel id="year-select-label">Year</InputLabel>
                            <Select
                                labelId="year-select-label"
                                value={selectedYear}
                                label="Year"
                                onChange={handleYearChange}
                            >
                                {Object.keys(topProducts).map((year) => (
                                    <MenuItem key={year} value={year}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel id="quarter-select-label">Quarter</InputLabel>
                            <Select
                                labelId="quarter-select-label"
                                value={selectedQuarter}
                                label="Quarter"
                                onChange={handleQuarterChange}
                            >
                                {Object.keys(topProducts[selectedYear]).map((quarter) => (
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
                    data={products}
                    colorSelection={colorSelection} // Pass the color selection to the CustomTable
                    heading="Top Products for Selected Quarter"
                    maxHeight="400px" // Adjust max height as needed
                />
            </CardContent>
        </Card>
    );
};

export default TopProductsCard;
