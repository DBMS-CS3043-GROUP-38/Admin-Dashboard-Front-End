import React, { useState } from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TableSortLabel,
    useTheme, Button
} from "@mui/material";
import { tokens } from "../theme";
import Card from "./CustomGrayCard";
import CheckIcon from "@mui/icons-material/Check";


const CustomTable = ({ data, colorSelection, heading, maxHeight }) => {
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
        <Card>
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
                                {Object.values(row).map((value, idx) => (
                                    <TableCell key={idx}>{value}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
};





const AttentionOrdersTable = ({ data, colorSelection = 'redAccent', heading, maxHeight }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // State for sorting
    const [orderDirection, setOrderDirection] = useState("asc");
    const [orderBy, setOrderBy] = useState(null);

    // Track fixed orders
    const [fixedOrders, setFixedOrders] = useState({});

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

    const handleFixOrder = async (orderId) => {
        // Simulate a database request with a setTimeout
        const success = await new Promise((resolve) =>
            setTimeout(() => resolve(Math.random() > 0.5), 500)
        );

        if (success) {
            setFixedOrders((prevState) => ({ ...prevState, [orderId]: true }));
            alert("Order fixed successfully!");
        } else {
            alert("Failed to fix the order. Please try again.");
        }
    };

    return (
        <Card>
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
                            <TableCell sx={{
                                bgcolor: colors[colorSelection]["800"],
                                color: colors.grey["100"],
                                position: 'sticky',
                                top: 0,
                                zIndex: 1,
                            }}>
                                Action
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
                                {Object.values(row).map((value, idx) => (
                                    <TableCell key={idx}>{value}</TableCell>
                                ))}
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        startIcon={<CheckIcon />}
                                        onClick={() => handleFixOrder(row.OrderID)}
                                        disabled={fixedOrders[row.OrderID]}
                                        sx={{
                                            bgcolor: fixedOrders[row.OrderID]
                                                ? colors.grey["700"]
                                                : colors[colorSelection]["500"]
                                        }}
                                    >
                                        {fixedOrders[row.OrderID] ? "Fixed" : "Fix"}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
};

export {AttentionOrdersTable, CustomTable};
