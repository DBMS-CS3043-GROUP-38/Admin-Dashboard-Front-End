import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import StoreIcon from '@mui/icons-material/Store'; // Icon for Store
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

export function TopPerformingStoreCard({ storeId, storeName, currentRevenue }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    return (
        <Card
            onClick={() => navigate(`store-report/${storeId || ''}`)}
            sx={{
                p: 2,
                height: '100%',
                borderRadius: '10px',
                backgroundColor: `${colors.greenAccent["900"]}`,
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
                                Top Performing Store
                            </Typography>
                            <Typography variant="h5">
                                {storeName || 'N/A'} {/* Larger Store Name */}
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary">
                                Store ID: {storeId || 'N/A'} {/* Smaller Store ID */}
                            </Typography>
                            <Typography variant="h5">
                                Revenue: ${currentRevenue ? currentRevenue.toLocaleString() : 'N/A'}
                            </Typography>
                        </Stack>
                        <StoreIcon sx={{ fontSize: 60, color: `${colors.greenAccent["300"]}` }} />
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default TopPerformingStoreCard;
