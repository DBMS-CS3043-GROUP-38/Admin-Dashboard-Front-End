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
    Card,
    useTheme
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { tokens } from '../theme';

const dummyData = [
    { id: 'T001', destination: 'City A', capacityFilled: 80, fullCapacity: 100, time: '2024-10-12T01:00:00Z' },
    { id: 'T002', destination: 'City B', capacityFilled: 50, fullCapacity: 100, time: '2024-10-12T05:16:00Z' },
    { id: 'T003', destination: 'City C', capacityFilled: 30, fullCapacity: 100, time: '2024-10-12T05:26:30Z' },
    { id: 'T004', destination: 'City D', capacityFilled: 90, fullCapacity: 100, time: '2024-10-12T13:45:00Z' },
    { id: 'T005', destination: 'City E', capacityFilled: 20, fullCapacity: 100, time: '2024-10-12T15:30:00Z' },
    { id: 'T006', destination: 'City F', capacityFilled: 100, fullCapacity: 100, time: '2024-10-12T17:00:00Z' },
    { id: 'T007', destination: 'City G', capacityFilled: 70, fullCapacity: 100, time: '2024-10-12T18:00:00Z' },
    { id: 'T008', destination: 'City H', capacityFilled: 0, fullCapacity: 100, time: '2024-10-12T20:00:00Z' },
    { id: 'T009', destination: 'City I', capacityFilled: 60, fullCapacity: 100, time: '2024-10-12T21:30:00Z' },
    { id: 'T010', destination: 'City J', capacityFilled: 40, fullCapacity: 100, time: '2024-10-12T23:00:00Z' },
    { id: 'T011', destination: 'City K', capacityFilled: 20, fullCapacity: 100, time: '2024-10-13T01:00:00Z' },
];

const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC'
    });
};

const TodayOutgoingTrainsTable = () => {
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

        // Subtract 5 hours and 30 minutes from train time
        trainTime.setHours(trainTime.getHours() - 5);
        trainTime.setMinutes(trainTime.getMinutes() - 30);

        return trainTime.getTime() < currentTime;  // Compare train time with the currentTime state
    };

    return (
        <Card sx={{
            borderRadius: 2,
            backgroundColor: colors.grey["900"],
            height: 'auto', // Use auto height
            cursor: 'pointer',
            transition: 'transform 0.2s',
            '&:hover': {
                transform: 'scale(1.02)',
            },
            boxShadow: theme.shadows[1],
            p: 2
        }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
                Today's Trains
            </Typography>
            <TableContainer component={Paper} sx={{ maxWidth: '100%', maxHeight: 400, overflow: 'auto' }}>
                <Table stickyHeader sx={{ minWidth: 600, tableLayout: 'fixed' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ bgcolor: colors.purpleAccent[500], color: colors.grey[100], width: '60px', position: 'sticky', top: 0, zIndex: 1 }}>ID</TableCell>
                            <TableCell sx={{ bgcolor: colors.purpleAccent[500], color: colors.grey[100], width: '100px', position: 'sticky', top: 0, zIndex: 1 }}>Destination</TableCell>
                            <TableCell sx={{ bgcolor: colors.purpleAccent[500], color: colors.grey[100], width: '80px', position: 'sticky', top: 0, zIndex: 1 }}>Capacity (%)</TableCell>
                            <TableCell sx={{ bgcolor: colors.purpleAccent[500], color: colors.grey[100], width: '80px', position: 'sticky', top: 0, zIndex: 1 }}>Full Capacity</TableCell>
                            <TableCell sx={{ bgcolor: colors.purpleAccent[500], color: colors.grey[100], width: '100px', position: 'sticky', top: 0, zIndex: 1 }}>Time (UTC)</TableCell>
                            <TableCell sx={{ bgcolor: colors.purpleAccent[500], color: colors.grey[100], width: '60px', position: 'sticky', top: 0, zIndex: 1 }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dummyData.map((train) => {
                            const isPassed = getTimeStatus(train.time);
                            return (
                                <TableRow key={train.id} sx={{ bgcolor: colors.grey["900"], '&:hover': { bgcolor: colors.purpleAccent[900] } }}>
                                    <TableCell sx={{ width: '60px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{train.id}</TableCell>
                                    <TableCell sx={{ width: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{train.destination}</TableCell>
                                    <TableCell sx={{ width: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{train.capacityFilled}</TableCell>
                                    <TableCell sx={{ width: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{train.fullCapacity}</TableCell>
                                    <TableCell sx={{ width: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{formatTime(train.time)}</TableCell>
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