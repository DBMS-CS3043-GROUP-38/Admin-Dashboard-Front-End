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


const CustomTable = ({ data, colorSelection, heading, maxHeight }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Card >
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
                                        zIndex: 1
                                    }}>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    bgcolor: colors.grey["900"],
                                    '&:hover': { bgcolor: colors[colorSelection][900] }
                                }}>
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


export default CustomTable;
