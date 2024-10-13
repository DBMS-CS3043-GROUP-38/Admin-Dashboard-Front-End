import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    useTheme
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { tokens } from '../theme';
import Card from "./CustomGrayCard";

const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC'
    });
};

const TodayOutgoingTrainsTable = ({data}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [currentTime, setCurrentTime] = useState(Date.now());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(Date.now());
        }, 60000); // Update every minute

        return () => clearInterval(intervalId);
    }, []);

    const getTimeStatus = (timeString) => {
        const trainTime = new Date(timeString);

        return trainTime.getTime() < currentTime;  // Compare train time with the currentTime state
    };

    return (
        <Card >
            <Typography variant="h4" color="text.primary" gutterBottom>
                Today's Trains
            </Typography>
            <TableContainer component={Paper} sx={{ maxWidth: '100%', maxHeight: 400, overflow: 'auto' }}>
                <Table stickyHeader sx={{ minWidth: 600, tableLayout: 'fixed' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ bgcolor: colors.purpleAccent[700], color: colors.grey[100], position: 'sticky', top: 0, zIndex: 1 }}>ID</TableCell>
                            <TableCell sx={{ bgcolor: colors.purpleAccent[700], color: colors.grey[100], position: 'sticky', top: 0, zIndex: 1 }}>Destination</TableCell>
                            <TableCell sx={{ bgcolor: colors.purpleAccent[700], color: colors.grey[100], position: 'sticky', top: 0, zIndex: 1 }}>Capacity (%)</TableCell>
                            <TableCell sx={{ bgcolor: colors.purpleAccent[700], color: colors.grey[100], position: 'sticky', top: 0, zIndex: 1 }}>Full Capacity</TableCell>
                            <TableCell sx={{ bgcolor: colors.purpleAccent[700], color: colors.grey[100], position: 'sticky', top: 0, zIndex: 1 }}>Time</TableCell>
                            <TableCell sx={{ bgcolor: colors.purpleAccent[700], color: colors.grey[100], position: 'sticky', top: 0, zIndex: 1 }}>Passed?</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((train) => {
                            const isPassed = getTimeStatus(train.time);
                            return (
                                <TableRow key={train.id} sx={{ bgcolor: colors.grey["900"], '&:hover': { bgcolor: colors.purpleAccent[900] } }}>
                                    <TableCell sx={{ width: '60px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{train.id}</TableCell>
                                    <TableCell sx={{ width: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{train.destination}</TableCell>
                                    <TableCell sx={{ width: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{train.capacityFilled}</TableCell>
                                    <TableCell sx={{ width: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{train.fullCapacity}</TableCell>
                                    <TableCell sx={{ width: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{(new Date(train.time)).toLocaleTimeString()}</TableCell>
                                    <TableCell sx={{ width: '60px' }}>
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
        </Card>
    );
};

export default TodayOutgoingTrainsTable;