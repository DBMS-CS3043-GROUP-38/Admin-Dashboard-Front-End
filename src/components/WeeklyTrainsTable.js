import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useTheme
} from "@mui/material";
import { tokens } from "../theme";
import Card from "./CustomGrayCard";

const WeeklyTrainsTable = ({ weeklyData }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Card >
            <Typography variant="h4" color="text.primary" gutterBottom>
                Weekly Train Schedule
            </Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
                <Table stickyHeader sx={{ minWidth: 500 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{bgcolor:colors.cyanAccent["800"], color:colors.grey["100"], position: 'sticky', top: 0, zIndex: 1}}>ID</TableCell>
                            <TableCell sx={{bgcolor:colors.cyanAccent["800"], color:colors.grey["100"], position: 'sticky', top: 0, zIndex: 1}}>Day</TableCell>
                            <TableCell sx={{bgcolor:colors.cyanAccent["800"], color:colors.grey["100"], position: 'sticky', top: 0, zIndex: 1}}>Time</TableCell>
                            <TableCell sx={{bgcolor:colors.cyanAccent["800"], color:colors.grey["100"], position: 'sticky', top: 0, zIndex: 1}}>Max Capacity</TableCell>
                            <TableCell sx={{bgcolor:colors.cyanAccent["800"], color:colors.grey["100"], position: 'sticky', top: 0, zIndex: 1}}>Destination</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {weeklyData.map((train) => (
                            <TableRow key={train.id} sx={{
                                bgcolor: colors.grey["900"],
                                '&:hover': {bgcolor: colors.cyanAccent[900]}
                            }}>
                                <TableCell>{train.id}</TableCell>
                                <TableCell>{train.dayOfWeek}</TableCell>
                                <TableCell>{train.time}</TableCell>
                                <TableCell>{train.maxCapacity}</TableCell>
                                <TableCell>{train.destinationCity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
};

export default WeeklyTrainsTable;
