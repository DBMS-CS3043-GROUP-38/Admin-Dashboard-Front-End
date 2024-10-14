import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person'; // Icon for Customer
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

export function BestCustomerCard({ customerId, customerName, customerCity, totalRevenue }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    return (
        <Card
            onClick={() => navigate(`customer-report/${customerId || ''}`)}
            sx={{
                p: 2,
                height: '100%',
                borderRadius: '10px',
                backgroundColor: `${colors.grey["900"]}`,
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.02)',
                }
            }}
        >
            <CardContent>
                <Stack spacing={3}>
                    <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
                        <Stack spacing={1}>
                            <Typography color="text.secondary" variant="overline">
                                Best Customer
                            </Typography>
                            <Typography variant="h5">
                                {customerName || 'N/A'} {/* Larger Customer Name */}
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary">
                                City: {customerCity || 'N/A'} {/* Customer City */}
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary">
                                Customer ID: {customerId || 'N/A'} {/* Customer ID */}
                            </Typography>
                            <Typography variant="h5">
                                Total Revenue: ${totalRevenue ? totalRevenue.toLocaleString() : 'N/A'}
                            </Typography>
                        </Stack>
                        <PersonIcon sx={{ fontSize: 60, color: `${colors.grey["300"]}` }} />
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default BestCustomerCard;
