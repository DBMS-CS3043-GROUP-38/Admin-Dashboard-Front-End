import React from 'react';
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

// Dummy data remains the same
const dummyData = [
    { id: 'P001',name: 'Witcher potion', category: 'Clothes', revenue: 1500 },
    { id: 'P002',name: 'Ciri sword', category: 'Weapons', revenue: 3000 },
    { id: 'P003',name: 'Geralt armor', category: 'Armor', revenue: 2000 },
    { id: 'P004',name: 'Yennefer robe', category: 'Clothes', revenue: 2500 },
    { id: 'P005',name: 'Triss hat', category: 'Clothes', revenue: 1000 },
    { id: 'P006',name: 'Dandelion lute', category: 'Instruments', revenue: 500 },
    { id: 'P007',name: 'Zoltan axe', category: 'Weapons', revenue: 1500 },
    { id: 'P008',name: 'Vesemir sword', category: 'Weapons', revenue: 2000 },
    { id: 'P009',name: 'Eskel bow', category: 'Weapons', revenue: 1000 },
    { id: 'P010',name: 'Lambert dagger', category: 'Weapons', revenue: 800 },
    { id: 'P011',name: 'Keira staff', category: 'Weapons', revenue: 1200 },
    { id: 'P012',name: 'Cahir armor', category: 'Armor', revenue: 3000 },
    { id: 'P013',name: 'Emhyr robe', category: 'Clothes', revenue: 2500 },
    { id: 'P014',name: 'Radovid armor', category: 'Armor', revenue: 2000 },
    { id: 'P015',name: 'Dijkstra robe', category: 'Clothes', revenue: 1500 },
    { id: 'P016',name: 'Philippa hat', category: 'Clothes', revenue: 1000 },
    { id: 'P017',name: 'Vernon lute', category: 'Instruments', revenue: 500 },
    { id: 'P018',name: 'Iorveth axe', category: 'Weapons', revenue: 1500 },
    { id: 'P019',name: 'Roche sword', category: 'Weapons', revenue: 2000 },
    { id: 'P020',name: 'Thaler bow', category: 'Weapons', revenue: 1000 },
    { id: 'P021',name: 'Ves dagger', category: 'Weapons', revenue: 800 },
    { id: 'P022',name: 'Triss staff', category: 'Weapons', revenue: 1200 },
    { id: 'P023',name: 'Letho armor', category: 'Armor', revenue: 3000 },
    { id: 'P024',name: 'Imlerith robe', category: 'Clothes', revenue: 2500 },
    { id: 'P025',name: 'Eredin armor', category: 'Armor', revenue: 2000 },
    { id: 'P026',name: 'Gaunter robe', category: 'Clothes', revenue: 1500 },
    { id: 'P027',name: 'Olgierd hat', category: 'Clothes', revenue: 1000 },
    { id: 'P028',name: 'Regis lute', category: 'Instruments', revenue: 500 }
];

const ProductSummary = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Card >
            <Typography variant="h6" color="text.primary" gutterBottom>
                Product Summary (Current Quarter)
            </Typography>
            <TableContainer component={Paper} sx={{ maxWidth: '100%', maxHeight: 400, overflow: 'auto' }}>
                <Table stickyHeader sx={{ minWidth: 300, tableLayout: 'fixed' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    bgcolor: colors.greenAccent[800],
                                    color: colors.grey[100],
                                    width: '80px',
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1
                                }}
                            >
                                Product ID
                            </TableCell>
                            <TableCell
                                sx={{
                                    bgcolor: colors.greenAccent[800],
                                    color: colors.grey[100],
                                    width: '120px',
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1
                                }}
                            >
                                Product Name
                            </TableCell>
                            <TableCell
                                sx={{
                                    bgcolor: colors.greenAccent[800],
                                    color: colors.grey[100],
                                    width: '120px',
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1
                                }}
                            >
                                Category
                            </TableCell>
                            <TableCell
                                sx={{
                                    bgcolor: colors.greenAccent[800],
                                    color: colors.grey[100],
                                    width: '100px',
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1
                                }}
                            >
                                Revenue
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dummyData.map((product) => (
                            <TableRow key={product.id} sx={{ bgcolor: colors.grey["900"], '&:hover': { bgcolor: colors.greenAccent[900] } }}>
                                <TableCell sx={{ width: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.id}</TableCell>
                                <TableCell sx={{ width: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</TableCell>
                                <TableCell sx={{ width: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.category}</TableCell>
                                <TableCell sx={{ width: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{`$${product.revenue.toFixed(2)}`}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
};

export default ProductSummary;