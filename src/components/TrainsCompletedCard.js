import React from 'react';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import TrainIcon from '@mui/icons-material/Train';
import Card from "@mui/material/Card";

export function TrainsCompletedCard({ completedTrains, totalTrains }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Calculate the completion percentage
    const completionPercentage = (completedTrains / totalTrains) * 100;

    return (
        <Card
            sx={{
                p: 2,
                height: '100%',
                borderRadius: '10px',
                backgroundColor: `${colors.purpleAccent["900"]}`,
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.02)', // Zoom effect on hover
                }
            }}
        >
            <CardContent>
                <Stack spacing={3}>
                    <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
                        <Stack spacing={1}>
                            <Typography color="text.secondary" variant="overline">
                                Trains Completed
                            </Typography>
                            <Typography variant="h4">
                                {completedTrains} / {totalTrains}
                            </Typography>
                        </Stack>
                        <TrainIcon sx={{ fontSize: 60, color: `${colors.purpleAccent
                                ["300"]}` }} />
                    </Stack>
                    <LinearProgress
                        variant="determinate"
                        value={completionPercentage}
                        sx={{
                            height: 10,
                            borderRadius: 5,
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: `${colors.purpleAccent["500"]}`,
                            },
                            backgroundColor: `${colors.purpleAccent["800"]}`,
                        }}
                    />
                    <Typography variant="body2" color="text.secondary">
                        {completionPercentage.toFixed(2)}% completed
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default TrainsCompletedCard;
