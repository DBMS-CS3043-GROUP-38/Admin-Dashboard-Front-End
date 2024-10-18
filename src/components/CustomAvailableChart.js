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
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CircleIcon from '@mui/icons-material/Circle';
import { tokens } from '../theme';
import CustomGrayCard from "./CustomGrayCard"; // Assuming tokens is where your color palette is defined

const CustomTableWithoutProgressBar = ({ data, colorSelection, heading, maxHeight }) => {
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

    // Render no data message if data is empty
    if (!data || data.length === 0) {
        return (
            <CustomGrayCard>
                <Typography variant="h4" color="text.primary" gutterBottom>
                    {heading}
                </Typography>
                <Typography color="text.secondary">No data available</Typography>
            </CustomGrayCard>
        );
    }

    // Extract column names from the data dynamically
    const columnNames = Object.keys(data[0]);

    return (
        <CustomGrayCard>
            <Typography variant="h4" color="text.primary" gutterBottom>
                {heading}
            </Typography>
            <TableContainer component={Paper} sx={{ maxHeight }}>
                <Table stickyHeader sx={{ minWidth: 500 }}>
                    <TableHead>
                        <TableRow>
                            {columnNames.filter(key => key !== "Availability").map((key) => (
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
                                Availability
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
                                {columnNames.filter(key => key !== "Availability").map((key, idx) => (
                                    <TableCell key={idx}>
                                        {row[key] ?? "N/A"}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <CircleIcon
                                        fontSize="small"
                                        sx={{
                                            color: row["Availability"] === "Available" ? colors.greenAccent[500] : colors.redAccent[500]
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </CustomGrayCard>
    );
};

export default CustomTableWithoutProgressBar;
