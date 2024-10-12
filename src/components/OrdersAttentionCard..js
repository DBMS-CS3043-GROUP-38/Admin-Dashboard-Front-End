import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AlertIcon from '@mui/icons-material/Warning'; // Original icon
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // New icon for zero orders
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

export function OrdersAttentionCard({ ordersNeedAttention }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    // Determine styles based on ordersNeedAttention value
    const isZero = ordersNeedAttention === 0;
    const backgroundColor = isZero ? colors.greenAccent["900"] : colors.redAccent["900"];
    const IconComponent = isZero ? CheckCircleIcon : AlertIcon;

    return (
        <Card
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
                                Orders Needing Attention
                            </Typography>
                            <Typography variant="h4">
                                {ordersNeedAttention}
                            </Typography>
                        </Stack>
                        <IconComponent sx={{ fontSize: 60, color: isZero ? colors.greenAccent["300"] : colors.redAccent["300"] }} />
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                        {isZero ? 'All orders are fine.' : 'Please check the orders that need immediate attention.'}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default OrdersAttentionCard;
