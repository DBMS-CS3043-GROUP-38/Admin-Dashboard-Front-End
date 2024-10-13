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
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../theme'; // Assuming tokens is where your color palette is defined
import CustomGrayCard from "./CustomGrayCard"; // Ensure this path is correct
import CircleIcon from '@mui/icons-material/Circle';

const CustomTrainTable = ({ data, colorSelection, heading, maxHeight }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // State for sorting and filtering
    const [orderDirection, setOrderDirection] = useState("asc");
    const [orderBy, setOrderBy] = useState(null);
    const [statusFilter, setStatusFilter] = useState('All');

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

    // Filter data based on selected status
    const filteredData = sortedData.filter((row) => {
        if (statusFilter === 'All') return true;
        return row.status === statusFilter;
    });

    return (
        <CustomGrayCard>
            <Typography variant="h4" color="text.primary" gutterBottom>
                {heading}
            </Typography>
            <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
                <RadioGroup
                    row
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <FormControlLabel
                        value="All"
                        control={
                            <Radio
                                sx={{
                                    color: colors[colorSelection][500],
                                    '&.Mui-checked': {
                                        color: colors[colorSelection][500],
                                    },
                                }}
                            />
                        }
                        label="All"
                    />
                    <FormControlLabel
                        value="In Progress"
                        control={
                            <Radio
                                sx={{
                                    color: colors[colorSelection][500],
                                    '&.Mui-checked': {
                                        color: colors[colorSelection][500],
                                    },
                                }}
                            />
                        }
                        label="In Progress"
                    />
                    <FormControlLabel
                        value="Not Completed"
                        control={
                            <Radio
                                sx={{
                                    color: colors[colorSelection][500],
                                    '&.Mui-checked': {
                                        color: colors[colorSelection][500],
                                    },
                                }}
                            />
                        }
                        label="Not Completed"
                    />
                </RadioGroup>
            </FormControl>
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
                            <TableCell
                                sx={{
                                    bgcolor: colors[colorSelection]["800"],
                                    color: colors.grey["100"],
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1,
                                }}
                            >
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    bgcolor: colors.grey["900"],
                                    '&:hover': { bgcolor: colors[colorSelection][900] }
                                }}
                            >
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.destination}</TableCell>
                                <TableCell>{row.fullCapacity}</TableCell>
                                <TableCell>{new Date(row.time).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box sx={{ width: '100%', mr: 1 }}>
                                            <LinearProgress
                                                variant="determinate"
                                                value={parseFloat(row.capacityFilled) * 100} // Already a percentage
                                                sx={{
                                                    bgcolor: colors.grey["800"],
                                                    '& .MuiLinearProgress-bar': {
                                                        bgcolor: colors[colorSelection][500],
                                                    }
                                                }}
                                            />
                                        </Box>
                                        <Typography variant="body2" color="text.secondary">
                                            {`${Math.round(parseFloat(row.capacityFilled) * 100)}%`}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <CircleIcon
                                        fontSize="small"
                                        sx={{
                                            color: row.status === "In Progress" ? colors.greenAccent[500] : colors.yellowAccent[500]
                                        }}
                                    />
                                    {row.status}
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