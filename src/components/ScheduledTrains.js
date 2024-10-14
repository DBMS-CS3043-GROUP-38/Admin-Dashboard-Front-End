import React, { useState } from 'react';
import {
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableSortLabel,
    Paper,
    LinearProgress,
    Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../theme'; // Assuming tokens is where your color palette is defined
import CustomGrayCard from "./CustomGrayCard"; // Ensure this path is correct

const CustomTrainTable = ({ data, colorSelection, heading, maxHeight }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // State for sorting
    const [orderDirection, setOrderDirection] = useState("asc");
    const [orderBy, setOrderBy] = useState(null);

    const handleSortRequest = (property) => {
        const isAscending = orderBy === property && orderDirection === "asc";
        setOrderDirection(isAscending ? "desc" : "asc");
        setOrderBy(property);
    };

    // Sort the data based on selected column and direction
    const sortedData = React.useMemo(() => {
        if (!orderBy) return data;

        return [...data].sort((a, b) => {
            if (a[orderBy] < b[orderBy]) return orderDirection === "asc" ? -1 : 1;
            if (a[orderBy] > b[orderBy]) return orderDirection === "asc" ? 1 : -1;
            return 0;
        });
    }, [data, orderBy, orderDirection]);

    return (
        <CustomGrayCard>
            <Typography variant="h4" color="text.primary" gutterBottom>
                {heading}
            </Typography>
            <TableContainer component={Paper} sx={{ maxHeight }}>
                <Table stickyHeader sx={{ minWidth: 500 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    bgcolor: colors[colorSelection]["800"],
                                    color: colors.grey["100"],
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1,
                                }}
                            >
                                <TableSortLabel
                                    active={orderBy === 'scheduleID'}
                                    direction={orderBy === 'scheduleID' ? orderDirection : "asc"}
                                    onClick={() => handleSortRequest('scheduleID')}
                                >
                                    Train Schedule ID
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sx={{
                                    bgcolor: colors[colorSelection]["800"],
                                    color: colors.grey["100"],
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1,
                                }}
                            >
                                <TableSortLabel
                                    active={orderBy === 'id'}
                                    direction={orderBy === 'id' ? orderDirection : "asc"}
                                    onClick={() => handleSortRequest('id')}
                                >
                                    Train ID
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sx={{
                                    bgcolor: colors[colorSelection]["800"],
                                    color: colors.grey["100"],
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1,
                                }}
                            >
                                <TableSortLabel
                                    active={orderBy === 'destination'}
                                    direction={orderBy === 'destination' ? orderDirection : "asc"}
                                    onClick={() => handleSortRequest('destination')}
                                >
                                    Destination
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sx={{
                                    bgcolor: colors[colorSelection]["800"],
                                    color: colors.grey["100"],
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1,
                                }}
                            >
                                <TableSortLabel
                                    active={orderBy === 'fullCapacity'}
                                    direction={orderBy === 'fullCapacity' ? orderDirection : "asc"}
                                    onClick={() => handleSortRequest('fullCapacity')}
                                >
                                    Full Capacity
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sx={{
                                    bgcolor: colors[colorSelection]["800"],
                                    color: colors.grey["100"],
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1,
                                }}
                            >
                                <TableSortLabel
                                    active={orderBy === 'time'}
                                    direction={orderBy === 'time' ? orderDirection : "asc"}
                                    onClick={() => handleSortRequest('time')}
                                >
                                    Date & Time
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sx={{
                                    bgcolor: colors[colorSelection]["800"],
                                    color: colors.grey["100"],
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1,
                                }}
                            >
                                Filled Capacity
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    bgcolor: colors.grey["900"],
                                    '&:hover': { bgcolor: colors[colorSelection][900] }
                                }}
                            >
                                <TableCell>{row.scheduleID}</TableCell>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.destination}</TableCell>
                                <TableCell>{parseFloat(row.fullCapacity).toFixed(2)}</TableCell> {/* Ensure this is displayed correctly */}
                                <TableCell>{new Date(row.time).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box sx={{ width: '100%', mr: 1 }}>
                                            <LinearProgress
                                                variant="determinate"
                                                value={parseFloat(row.capacityFilled).toFixed(2)} // Ensure it's between 0-100
                                                sx={{
                                                    bgcolor: colors.grey["800"],
                                                    '& .MuiLinearProgress-bar': {
                                                        bgcolor: colors[colorSelection][500],
                                                    }
                                                }}
                                            />
                                        </Box>
                                        <Typography variant="body2" color="text.secondary">
                                            {`${parseFloat(row.capacityFilled) .toFixed(2)}%`} {/* Round to 2 decimal places */}
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </CustomGrayCard>
    );
};

export default CustomTrainTable;
