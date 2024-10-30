import React, { useState } from "react";
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
    Box,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    LinearProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../theme";
import CustomGrayCard from "./CustomGrayCard";
import CircleIcon from "@mui/icons-material/Circle";

const CustomScheduleTable = ({
    data,
    colorSelection,
    heading,
    maxHeight,
    setSelectedSchedule,
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [orderDirection, setOrderDirection] = useState("asc");
    const [orderBy, setOrderBy] = useState(null);
    const [statusFilter, setStatusFilter] = useState("Not Completed");

    const handleSortRequest = (property) => {
        const isAscending = orderBy === property && orderDirection === "asc";
        setOrderDirection(isAscending ? "desc" : "asc");
        setOrderBy(property);
    };

    const sortedData = React.useMemo(() => {
        if (!orderBy) return data;
        return [...data].sort((a, b) => {
            let aValue = a[orderBy],
                bValue = b[orderBy];
            if (aValue < bValue) return orderDirection === "asc" ? -1 : 1;
            if (aValue > bValue) return orderDirection === "asc" ? 1 : -1;
            return 0;
        });
    }, [data, orderBy, orderDirection]);

    const filteredData = sortedData.filter((row) => {
        if (statusFilter === "All") return true;
        return row.Status === statusFilter;
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
                                    "&.Mui-checked": {
                                        color: colors[colorSelection][500],
                                    },
                                }}
                            />
                        }
                        label="All"
                    />

                    <FormControlLabel
                        value="Not Completed"
                        control={
                            <Radio
                                sx={{
                                    color: colors[colorSelection][500],
                                    "&.Mui-checked": {
                                        color: colors[colorSelection][500],
                                    },
                                }}
                            />
                        }
                        label="Not Completed"
                    />
                    <FormControlLabel
                        value="In Progress"
                        control={
                            <Radio
                                sx={{
                                    color: colors[colorSelection][500],
                                    "&.Mui-checked": {
                                        color: colors[colorSelection][500],
                                    },
                                }}
                            />
                        }
                        label="In Progress"
                    />
                    <FormControlLabel
                        value="Completed"
                        control={
                            <Radio
                                sx={{
                                    color: colors[colorSelection][500],
                                    "&.Mui-checked": {
                                        color: colors[colorSelection][500],
                                    },
                                }}
                            />
                        }
                        label="Completed"
                    />
                </RadioGroup>
            </FormControl>
            <TableContainer component={Paper} sx={{ maxHeight }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    bgcolor: colors[colorSelection][800],
                                    "&:hover": {
                                        bgcolor: colors[colorSelection][900],
                                    },
                                }}
                            >
                                <TableSortLabel
                                    active={orderBy === "Schedule ID"}
                                    direction={
                                        orderBy === "Schedule ID"
                                            ? orderDirection
                                            : "asc"
                                    }
                                    onClick={() =>
                                        handleSortRequest("Schedule ID")
                                    }
                                >
                                    Schedule ID
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sx={{
                                    bgcolor: colors[colorSelection][800],
                                }}
                            >
                                Schedule Time
                            </TableCell>
                            <TableCell
                                sx={{
                                    bgcolor: colors[colorSelection][800],
                                }}
                            >
                                Shipment ID
                            </TableCell>
                            <TableCell
                                sx={{
                                    bgcolor: colors[colorSelection][800],
                                }}
                            >
                                Truck ID
                            </TableCell>
                            <TableCell
                                sx={{
                                    bgcolor: colors[colorSelection][800],
                                }}
                            >
                                Driver
                            </TableCell>
                            <TableCell
                                sx={{
                                    bgcolor: colors[colorSelection][800],
                                }}
                            >
                                Assistant
                            </TableCell>
                            <TableCell
                                sx={{
                                    bgcolor: colors[colorSelection][800],
                                }}
                            >
                                Delivery Progress
                            </TableCell>

                            <TableCell
                                sx={{
                                    bgcolor: colors[colorSelection][800],
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
                                onClick={() =>
                                    setSelectedSchedule(row["Shipment ID"])
                                }
                                sx={{
                                    "&:hover": {
                                        bgcolor: colors[colorSelection][900],
                                    },
                                }}
                            >
                                <TableCell>{row["Schedule ID"]}</TableCell>
                                <TableCell>
                                    {row["Schedule Time"].split("T")[0] +
                                        " " +
                                        row["Schedule Time"]
                                            .split("T")[1]
                                            .split(".")[0]}
                                </TableCell>
                                <TableCell>{row["Shipment ID"]}</TableCell>
                                <TableCell>{row["Truck ID"]}</TableCell>
                                <TableCell>
                                    {row["Driver ID"] +
                                        " - " +
                                        row["Driver Name"]}
                                </TableCell>
                                <TableCell>
                                    {row["Assistant ID"] +
                                        " - " +
                                        row["Assistant Name"]}
                                </TableCell>

                                <TableCell>
                                    {/* Progress Cell with LinearProgress */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box sx={{ width: "100%", mr: 1 }}>
                                            <LinearProgress
                                                variant="determinate"
                                                value={
                                                    (row.Delivered /
                                                        row["Total Orders"]) *
                                                    100
                                                }
                                                sx={{
                                                    bgcolor: colors.grey[800],
                                                    "& .MuiLinearProgress-bar":
                                                        {
                                                            bgcolor:
                                                                colors[
                                                                    colorSelection
                                                                ][500],
                                                        },
                                                }}
                                            />
                                        </Box>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {`${row.Delivered}/${row["Total Orders"]}`}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <CircleIcon
                                        fontSize="small"
                                        sx={{
                                            color:
                                                row.Status === "Completed"
                                                    ? colors.greenAccent[500]
                                                    : row.Status ===
                                                      "In Progress"
                                                    ? colors.yellowAccent[500]
                                                    : colors.redAccent[500],
                                        }}
                                    />
                                    {row.Status}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </CustomGrayCard>
    );
};

export default CustomScheduleTable;
