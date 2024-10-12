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
import CircleIcon from '@mui/icons-material/Circle';
import { tokens } from '../theme';
import CustomGrayCard from "./CustomGrayCard"; // Assuming tokens is where your color palette is defined

const CustomTableWithProgressBar = ({ data, colorSelection, heading, maxHeight }) => {
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
                            {Object.keys(data[0]).map((key) => (
                                <TableCell
                                    key={key}
                                    sx={{
                                        bgcolor: colors[colorSelection]["800"],
                                        color: colors.grey["100"],
                                        position: 'sticky',
                                        top: 0,
                                        zIndex: 1,
                                    }}
                                >
                                    <TableSortLabel
                                        active={orderBy === key}
                                        direction={orderBy === key ? orderDirection : "asc"}
                                        onClick={() => handleSortRequest(key)}
                                    >
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                            <TableCell
                                sx={{
                                    bgcolor: colors[colorSelection]["800"],
                                    color: colors.grey["100"],
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1,
                                }}
                            >
                                Progress
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
                                {Object.keys(row).map((key, idx) => (
                                    <TableCell key={idx}>
                                        {key === "Availability" ? (
                                            <CircleIcon
                                                fontSize="small"
                                                sx={{
                                                    color: row[key] === "Available" ? colors.greenAccent[500] : colors.redAccent[500]
                                                }}
                                            />
                                        ) : (
                                            row[key]
                                        )}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box sx={{ width: '100%', mr: 1 }}>
                                            <LinearProgress
                                                variant="determinate"
                                                value={(row.CompletedHours / row.WorkHours) * 100}
                                                sx={{
                                                    bgcolor: colors.grey["800"],
                                                    '& .MuiLinearProgress-bar': {
                                                        bgcolor: colors[colorSelection][500],
                                                    }
                                                }}
                                            />
                                        </Box>
                                        <Typography variant="body2" color="text.secondary">
                                            {`${Math.round((row.CompletedHours / row.WorkHours) * 100)}%`}
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

export default CustomTableWithProgressBar;
