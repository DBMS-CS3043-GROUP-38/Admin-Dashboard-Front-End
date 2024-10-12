import React, {useState, useEffect} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    TablePagination,
    useTheme
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import {tokens} from '../theme';
import Card from "./CustomGrayCard";

const formatDateTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC'
    });
};

const ScheduledTrainsTable = ({data}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [currentTime, setCurrentTime] = useState(Date.now());
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(Date.now());
        }, 60000); // Update every minute

        return () => clearInterval(intervalId);
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getTimeStatus = (timeString) => {
        const trainTime = new Date(timeString);

        // Subtract 5 hours and 30 minutes from train time
        trainTime.setHours(trainTime.getHours() - 5);
        trainTime.setMinutes(trainTime.getMinutes() - 30);

        return trainTime.getTime() < currentTime;
    };

    // Sort data by date/time
    const sortedData = [...data].sort((a, b) => new Date(a.time) - new Date(b.time));

    return (
        <Card >
            <Typography variant="h4" color="text.primary" gutterBottom>
                Scheduled Trains
            </Typography>
            <TableContainer component={Paper} sx={{maxWidth: '100%', maxHeight: 400, overflow: 'auto'}}>
                <Table stickyHeader sx={{minWidth: 600, tableLayout: 'fixed'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{
                                bgcolor: colors.purpleAccent[700],
                                position: 'sticky',
                                top: 0,
                                zIndex: 1
                            }}>ID</TableCell>
                            <TableCell sx={{
                                bgcolor: colors.purpleAccent[700],
                                position: 'sticky',
                                top: 0,
                                zIndex: 1
                            }}>Destination</TableCell>
                            <TableCell sx={{bgcolor: colors.purpleAccent[700], position: 'sticky', top: 0, zIndex: 1}}>Capacity
                                (%)</TableCell>
                            <TableCell sx={{bgcolor: colors.purpleAccent[700], position: 'sticky', top: 0, zIndex: 1}}>Full
                                Capacity</TableCell>
                            <TableCell sx={{bgcolor: colors.purpleAccent[700], position: 'sticky', top: 0, zIndex: 1}}>Date
                                & Time (UTC)</TableCell>
                            <TableCell sx={{
                                bgcolor: colors.purpleAccent[700],
                                position: 'sticky',
                                top: 0,
                                zIndex: 1
                            }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((train) => {
                            const isPassed = getTimeStatus(train.time);
                            return (
                                <TableRow key={train.id} sx={{
                                    bgcolor: colors.grey["900"],
                                    '&:hover': {bgcolor: colors.purpleAccent[900]}
                                }}>
                                    <TableCell>{train.id}</TableCell>
                                    <TableCell>{train.destination}</TableCell>
                                    <TableCell>{train.capacityFilled}</TableCell>
                                    <TableCell>{train.fullCapacity}</TableCell>
                                    <TableCell>{formatDateTime(train.time)}</TableCell>
                                    <TableCell>
                                        <CircleIcon
                                            sx={{
                                                color: isPassed
                                                    ? colors.yellowAccent[500]
                                                    : colors.greenAccent[500],
                                                fontSize: '16px'
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 20, 30]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>
    );
};

export default ScheduledTrainsTable;
