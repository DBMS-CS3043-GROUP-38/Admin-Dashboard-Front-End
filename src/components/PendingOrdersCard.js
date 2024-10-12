import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'; // Original icon
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // New icon for zero orders
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

export function PendingOrdersCard({ pendingOrders }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('orders/'); // Redirect on click
    };

    // Determine styles based on pendingOrders value
    const isZero = pendingOrders === 0;
    const backgroundColor = isZero ? colors.greenAccent["900"] : colors.yellowAccent["900"];
    const IconComponent = isZero ? CheckCircleIcon : HourglassEmptyIcon;

    return (
        <Card
            onClick={handleClick}
            sx={{
                p: 2,
                height: '100%',
                borderRadius: '10px',
                backgroundColor,
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
                                Pending Orders
                            </Typography>
                            <Typography variant="h4">
                                {pendingOrders}
                            </Typography>
                        </Stack>
                        <IconComponent sx={{ fontSize: 60, color: isZero ? colors.greenAccent["300"] : colors.yellowAccent["300"] }} />
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                        {isZero ? 'No pending orders!' : 'Check the pending orders that need your attention.'}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default PendingOrdersCard;
