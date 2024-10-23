import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import {useTheme} from "@mui/material";
import {tokens} from "../theme";
import CustomGrayCard from "./CustomGrayCard";

const BigCard = ({title, statusData}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Ensure all statuses have a value, defaulting to 0 if not found
    const statuses = [
        {Status: "Completed", count: 0},
        {Status: "Not Completed", count: 0},
        {Status: "In Progress", count: 0},
    ];

    statusData.forEach((status) => {
        const foundStatus = statuses.find(s => s.Status === status.Status);
        if (foundStatus) {
            foundStatus.count = status.count; // Update count if found
        }
    });

    return (
        <CustomGrayCard>
                <Typography variant="h5" color="text.primary" sx={{mb: 2}}>
                    {title}
                </Typography>
                <Stack direction="row" spacing={4} sx={{alignItems: 'center'}}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <CheckCircleIcon sx={{color: "#66BB6A"}}/>
                        <Typography variant="body1" color="text.primary">
                            Completed Trains: {statuses.find(s => s.Status === "Completed").count}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <CancelIcon sx={{color: "#FF5252"}}/>
                        <Typography variant="body1" color="text.primary">
                            Not Completed Trains: {statuses.find(s => s.Status === "Not Completed").count}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <HourglassEmptyIcon sx={{color: "#FFA726"}}/>
                        <Typography variant="body1" color="text.primary">
                            In Progress Trains: {statuses.find(s => s.Status === "In Progress").count}
                        </Typography>
                    </Stack>
                </Stack>
        </CustomGrayCard>
    );
};

export default BigCard;
