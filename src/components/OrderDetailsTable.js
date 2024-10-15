import React, {useEffect, useState} from "react";
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
    useTheme, Button, DialogContent, Dialog, DialogContentText, DialogActions, DialogTitle
} from "@mui/material";
import { tokens } from "../theme";
import Card from "./CustomGrayCard";
import CheckIcon from "@mui/icons-material/Check";
import {getAttentionOrders, cancelOrder} from "../services/apiService";


const CustomTable = ({ data = [], colorSelection, heading, maxHeight }) => {
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
        if (!orderBy || data.length === 0) return data;

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
                {data && data.length > 0 ? (
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
                ) : (
                    <Typography variant="body1" color="text.secondary" sx={{ p: 2 }}>
                        No data available
                    </Typography>
                )}
            </TableContainer>
        </Card>
    );
};



const AttentionOrdersTable = ({ colorSelection = 'redAccent', heading, maxHeight }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        getAttentionOrders().then((response) => {
            setData(response);
        });
    }, []);

    const [orderDirection, setOrderDirection] = useState("asc");
    const [orderBy, setOrderBy] = useState(null);

    const handleSortRequest = (property) => {
        const isAscending = orderBy === property && orderDirection === "asc";
        setOrderDirection(isAscending ? "desc" : "asc");
        setOrderBy(property);
    };

    const sortedData = React.useMemo(() => {
        if (!orderBy) return data;

        return [...data].sort((a, b) => {
            if (a[orderBy] < b[orderBy]) return orderDirection === "asc" ? -1 : 1;
            if (a[orderBy] > b[orderBy]) return orderDirection === "asc" ? 1 : -1;
            return 0;
        });
    }, [data, orderBy, orderDirection]);

    const handleOpenConfirmation = (orderId) => {
        setSelectedOrder(orderId);
        setConfirmationOpen(true);
    };

    const handleCancelOrder = async () => {
        setConfirmationOpen(false);
        try {
            const response = await cancelOrder(selectedOrder); // Call your cancel API
            setMessage(response.message);
            setData(data.filter(order => order.OrderID !== selectedOrder));
        } catch (error) {
            setMessage('Failed to cancel order');
        }
    };

    return (
        <Card>
            <Typography variant="h4" color="text.primary" gutterBottom>
                {heading}
            </Typography>
            {(data && data.length > 0)? (
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
                                            onClick={() => handleOpenConfirmation(row.OrderID)}
                                            sx={{
                                                bgcolor: colors[colorSelection]["500"]
                                            }}
                                        >
                                            Cancel Order
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography variant="body1" color="text.secondary" sx={{ p: 2 }}>
                    No Orders need attention
                </Typography>
            )}
            {message && (
                <Typography variant="body1" color="text.secondary" sx={{ p: 2, color: colors.yellowAccent[700] }}>
                    {message}
                </Typography>
            )}

            {/* Confirmation Dialog */}
            <Dialog
                open={confirmationOpen}
                onClose={() => setConfirmationOpen(false)}
            >
                <DialogTitle>Confirm Cancellation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to cancel order {selectedOrder}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmationOpen(false)} color="primary">
                        No
                    </Button>
                    <Button onClick={handleCancelOrder} color="error">
                        Yes, Cancel Order
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export {AttentionOrdersTable, CustomTable};
