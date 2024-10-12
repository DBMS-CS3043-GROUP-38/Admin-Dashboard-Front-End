import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

export function QuarterlySalesCard({ currentQuarterSales, previousQuarterSales }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    // Calculate the percentage change
    const percentageChange = ((currentQuarterSales - previousQuarterSales) / previousQuarterSales) * 100;
    const isIncrease = percentageChange > 0;

    // Determine trend and value for display
    const trend = isIncrease ? 'up' : 'down';
    const TrendIcon = trend === 'up' ? ArrowUpwardIcon : ArrowDownwardIcon;
    const trendColor = trend === 'up' ? 'success.main' : 'error.main';

    return (
        <Card
            onClick={() => navigate('sales-report/')}
            sx={{
                p: 2,
                height: '100%',
                borderRadius: '10px',
                backgroundColor: `${colors.cyanAccent["900"]}`,
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
                                Quarterly Sales
                            </Typography>
                            <Typography variant="h4">
                                ${currentQuarterSales.toLocaleString()}
                            </Typography>
                        </Stack>
                        <MonetizationOnIcon sx={{ fontSize: 60, color: `${colors.cyanAccent["300"]}` }} />
                    </Stack>
                    {percentageChange !== 0 && (
                        <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
                            <TrendIcon sx={{ color: trendColor }} />
                            <Typography color={trendColor} variant="body2">
                                {Math.abs(percentageChange).toFixed(2)}%
                            </Typography>
                            <Typography color="text.secondary" variant="caption">
                                {isIncrease ? 'higher' : 'lower'} than last quarter
                            </Typography>
                        </Stack>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
}

export default QuarterlySalesCard;
