import React, { useState } from 'react';
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
import { tokens } from '../theme';
import Card from "./CustomGrayCard";
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';

const ProductSummary = ({ data }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // State for sorting
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    // Sorting function
    const sortedData = [...data].sort((a, b) => {
        if (sortConfig.key) {
            const order = sortConfig.direction === 'asc' ? 1 : -1;
            const valueA = a[sortConfig.key];
            const valueB = b[sortConfig.key];
            if (typeof valueA === 'number' && typeof valueB === 'number') {
                return (valueA - valueB) * order;
            } else {
                return valueA.localeCompare(valueB) * order;
            }
        }
        return 0;
    });

    // Handle sorting toggle
    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <Card>
            <Typography variant="h6" color="text.primary" gutterBottom>
                Product Summary (Current Quarter)
            </Typography>
            <TableContainer component={Paper} sx={{ maxWidth: '100%', maxHeight: 400, overflow: 'auto' }}>
                <Table stickyHeader sx={{ minWidth: 300, tableLayout: 'fixed' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                onClick={() => requestSort('id')}
                                sx={{
                                    bgcolor: colors.greenAccent[800],
                                    color: colors.grey[100],
                                    width: '80px',
                                    cursor: 'pointer',
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1
                                }}
                            >
                                Product ID {sortConfig.key === 'id' ? (sortConfig.direction === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />) : null}
                            </TableCell>
                            <TableCell
                                onClick={() => requestSort('name')}
                                sx={{
                                    bgcolor: colors.greenAccent[800],
                                    color: colors.grey[100],
                                    width: '120px',
                                    cursor: 'pointer',
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1
                                }}
                            >
                                Product Name {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />) : null}
                            </TableCell>
                            <TableCell
                                onClick={() => requestSort('category')}
                                sx={{
                                    bgcolor: colors.greenAccent[800],
                                    color: colors.grey[100],
                                    width: '120px',
                                    cursor: 'pointer',
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1
                                }}
                            >
                                Category {sortConfig.key === 'category' ? (sortConfig.direction === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />) : null}
                            </TableCell>
                            <TableCell
                                onClick={() => requestSort('revenue')}
                                sx={{
                                    bgcolor: colors.greenAccent[800],
                                    color: colors.grey[100],
                                    width: '100px',
                                    cursor: 'pointer',
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1
                                }}
                            >
                                Revenue {sortConfig.key === 'revenue' ? (sortConfig.direction === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />) : null}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData.map((product) => (
                            <TableRow key={product.id} sx={{ bgcolor: colors.grey["900"], '&:hover': { bgcolor: colors.greenAccent[900] } }}>
                                <TableCell sx={{ width: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.id}</TableCell>
                                <TableCell sx={{ width: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</TableCell>
                                <TableCell sx={{ width: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.category}</TableCell>
                                <TableCell sx={{ width: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{`$${parseFloat(product.revenue).toFixed(2)}`}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
};

export default ProductSummary;
