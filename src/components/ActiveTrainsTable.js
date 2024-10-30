import React, { useState, useMemo } from "react";
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
    TablePagination,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../theme";
import CustomGrayCard from "./CustomGrayCard";
import CircleIcon from "@mui/icons-material/Circle";

const CustomTrainTable = ({
    data = [],
    colorSelection,
    heading,
    onRowClick,
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [orderDirection, setOrderDirection] = useState("asc");
    const [orderBy, setOrderBy] = useState(null);
    const [statusFilter, setStatusFilter] = useState("All");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Helper function to safely convert string numbers to numbers
    const parseNumericValue = (value) => {
        const parsed = parseFloat(value);
        return isNaN(parsed) ? 0 : parsed;
    };

    const handleSortRequest = (property) => {
        const isAscending = orderBy === property && orderDirection === "asc";
        setOrderDirection(isAscending ? "desc" : "asc");
        setOrderBy(property);
    };

    // Updated sorting logic with proper type handling
    const sortedData = useMemo(() => {
        const filtered =
            statusFilter === "All"
                ? data
                : data.filter((row) => row.status === statusFilter);
        
        if (!orderBy) return filtered;

        return [...filtered].sort((a, b) => {
            // Define sorting logic based on column type
            let comparison = 0;
            
            switch(orderBy) {
                case "train schedule id":
                case "train id":
                    comparison = a.scheduleID - b.scheduleID;
                    break;
                case "destination":
                    comparison = a.destination.localeCompare(b.destination);
                    break;
                case "full capacity":
                    comparison = parseNumericValue(a.fullCapacity) - parseNumericValue(b.fullCapacity);
                    break;
                case "filled capacity":
                    comparison = parseNumericValue(a.capacityFilled) - parseNumericValue(b.capacityFilled);
                    break;
                case "date & time":
                    comparison = new Date(a.time) - new Date(b.time);
                    break;
                case "filled capacity (progress)":
                    comparison = parseNumericValue(a.capacityFilled) - parseNumericValue(b.capacityFilled);
                    break;
                case "status":
                    comparison = a.status.localeCompare(b.status);
                    break;
                default:
                    comparison = 0;
            }
            
            return orderDirection === "asc" ? comparison : -comparison;
        });
    }, [data, orderBy, orderDirection, statusFilter]);

    // Pagination
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
        setPage(0);
    };

    const columns = [
        { id: "train schedule id", label: "Train Schedule ID", field: "scheduleID" },
        { id: "train id", label: "Train ID", field: "id" },
        { id: "destination", label: "Destination", field: "destination" },
        { id: "full capacity", label: "Full Capacity", field: "fullCapacity" },
        { id: "filled capacity", label: "Filled Capacity", field: "capacityFilled" },
        { id: "date & time", label: "Date & Time", field: "time" },
        { id: "filled capacity (progress)", label: "Filled Capacity (Progress)", field: "capacityFilled" },
        { id: "status", label: "Status", field: "status" },
    ];

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
                        control={<Radio />}
                        sx={{
                            color: colors[colorSelection]["500"],
                            "& .MuiSvgIcon-root": {
                                color: colors[colorSelection]["500"],
                            },
                        }}
                        label="All"
                    />
                    <FormControlLabel
                        value="In Progress"
                        control={<Radio />}
                        label="In Progress"
                        sx={{
                            color: colors[colorSelection]["500"],
                            "& .MuiSvgIcon-root": {
                                color: colors[colorSelection]["500"],
                            },
                        }}
                    />
                    <FormControlLabel
                        value="Not Completed"
                        control={<Radio />}
                        label="Not Completed"
                        sx={{
                            color: colors[colorSelection]["500"],
                            "& .MuiSvgIcon-root": {
                                color: colors[colorSelection]["500"],
                            },
                        }}
                    />
                </RadioGroup>
            </FormControl>
            <TableContainer component={Paper}>
                <Table stickyHeader sx={{ minWidth: 500 }}>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    sx={{
                                        bgcolor: colors[colorSelection]["800"],
                                        color: colors.grey["100"],
                                        position: "sticky",
                                        top: 0,
                                        zIndex: 1,
                                    }}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={orderBy === column.id ? orderDirection : "asc"}
                                        onClick={() => handleSortRequest(column.id)}
                                        sx={{
                                            '& .MuiTableSortLabel-icon': {
                                                color: colors.grey["100"] + '!important',
                                            },
                                        }}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((row, index) => (
                            <TableRow
                                key={index}
                                onClick={() => onRowClick && onRowClick(row.scheduleID)}
                                sx={{
                                    cursor: "pointer",
                                    bgcolor: colors.grey["900"],
                                    "&:hover": {
                                        bgcolor: colors[colorSelection][900],
                                    },
                                }}
                            >
                                <TableCell>{row.scheduleID}</TableCell>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.destination}</TableCell>
                                <TableCell>{parseFloat(row.fullCapacity).toFixed(2)}</TableCell>
                                <TableCell>{parseFloat(row.capacityFilled).toFixed(2)}</TableCell>
                                <TableCell>
                                    {new Date(row.time).toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Box sx={{ width: "100%", mr: 1 }}>
                                            <LinearProgress
                                                variant="determinate"
                                                value={parseFloat(row.capacityFilled)}
                                                sx={{
                                                    bgcolor: colors.grey["800"],
                                                    "& .MuiLinearProgress-bar": {
                                                        bgcolor: colors[colorSelection][500],
                                                    },
                                                }}
                                            />
                                        </Box>
                                        <Typography variant="body2" color="text.secondary">
                                            {`${Math.round(parseFloat(row.capacityFilled))}%`}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                }}>
                                    <CircleIcon
                                        fontSize="small"
                                        sx={{
                                            color:
                                                row.status === "In Progress"
                                                    ? colors.greenAccent[500]
                                                    : colors.yellowAccent[500],
                                        }}
                                    />
                                    {row.status}
                                </TableCell>
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
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </TableContainer>
        </CustomGrayCard>
    );
};

export default CustomTrainTable;