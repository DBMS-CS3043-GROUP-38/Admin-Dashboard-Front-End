import React, { useState, useMemo } from "react";
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
    useTheme,
    TablePagination,
} from "@mui/material";
import { tokens } from "../theme";

const ProductsTable = ({ data = [], colorSelection, heading, onRowClick }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // State for sorting
    const [orderDirection, setOrderDirection] = useState("asc");
    const [orderBy, setOrderBy] = useState(null);

    // State for pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleSortRequest = (property) => {
        const isAscending = orderBy === property && orderDirection === "asc";
        setOrderDirection(isAscending ? "desc" : "asc");
        setOrderBy(property);
    };

    // Sort the data based on selected column and direction
    const sortedData = useMemo(() => {
        if (!orderBy || data.length === 0) return data;

        return [...data].sort((a, b) => {
            if (a[orderBy] < b[orderBy]) return orderDirection === "asc" ? -1 : 1;
            if (a[orderBy] > b[orderBy]) return orderDirection === "asc" ? 1 : -1;
            return 0;
        });
    }, [data, orderBy, orderDirection]);

    // Slice the data based on pagination
    const paginatedData = useMemo(() => {
        const start = page * rowsPerPage;
        const end = start + rowsPerPage;
        return sortedData.slice(start, end);
    }, [sortedData, page, rowsPerPage]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset page to 0 when rows per page change
    };

    return (
        <>
            <Typography variant="h4" color="text.primary" gutterBottom>
                {heading}
            </Typography>
            <TableContainer component={Paper} >
                {data && data.length > 0 ? (
                    <>
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
                                {paginatedData.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        onClick={() => onRowClick(row.id)}  // Call the passed function with row id
                                        sx={{
                                            cursor: 'pointer',  // Make the row look clickable
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
                        <TablePagination
                            component="div"
                            count={sortedData.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            rowsPerPageOptions={[5, 10, 25]}  // Customize this as per your needs
                        />
                    </>
                ) : (
                    <Typography variant="body1" color="text.secondary" sx={{ p: 2 }}>
                        No data available
                    </Typography>
                )}
            </TableContainer>
        </>
    );
};

export default ProductsTable;
