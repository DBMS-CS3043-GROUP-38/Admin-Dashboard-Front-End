import React from 'react';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import Card from "@mui/material/Card";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MailIcon from '@mui/icons-material/Mail';
import {Archive, Handshake} from "@mui/icons-material";
import DriveEtaIcon from "@mui/icons-material/DriveEta";

// CompletedCard component definition
function CompletedCard({ title, completed, total, color, Icon }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Calculate the completion percentage
    const completionPercentage = (completed / total) * 100;

    return (
        <Card
            sx={{
                p: 2,
                height: '100%',
                borderRadius: '10px',
                backgroundColor: `${colors[color]["900"]}`,
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
                                {title}
                            </Typography>
                            <Typography variant="h4">
                                {completed} / {total}
                            </Typography>
                        </Stack>
                        {Icon && <Icon sx={{ fontSize: 60, color: `${colors[color]["300"]}` }} />}
                    </Stack>
                    <LinearProgress
                        variant="determinate"
                        value={completionPercentage}
                        sx={{
                            height: 10,
                            borderRadius: 5,
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: `${colors[color]["500"]}`,
                            },
                            backgroundColor: `${colors[color]["800"]}`,
                        }}
                    />
                    <Typography variant="body2" color="text.secondary">
                        {completionPercentage.toFixed(2)}% available
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}

// Individual cards
export function TrainsCompletedCard({ completedTrains, totalTrains }) {
    const TrainIcon = require('@mui/icons-material/Train').default; // Import icon as component

    return (
        <CompletedCard
            title="Trains Dispatched with orders"
            completed={completedTrains}
            total={totalTrains}
            color="purpleAccent"
            Icon={TrainIcon} // Pass the icon component
        />
    );
}

export function AvailableDriversCard({ availableDrivers, totalDrivers }) {

    return (
        <CompletedCard
            title="Available Drivers"
            completed={availableDrivers}
            total={totalDrivers}
            color="cyanAccent"
            Icon={DriveEtaIcon} // Pass the icon component
        />
    );
}

export function AvailableTrucksCard({ availableTrucks, totalTrucks }) {

    return (
        <CompletedCard
            title="Available Trucks"
            completed={availableTrucks}
            total={totalTrucks}
            color="purpleAccent"
            Icon={LocalShippingIcon} // Pass the icon component
        />
    );
}

export function AvailableAssistantsCard({ availableAssistants, totalAssistants }) {

    return (
        <CompletedCard
            title="Available Assistants"
            completed={availableAssistants}
            total={totalAssistants}
            color="yellowAccent"
            Icon={Handshake} // Pass the icon component
        />
    );
}

export function ReadyShipmentsCard({ readyShipments, totalShipments }) {
    return (
        <CompletedCard
            title="Ready Shipments"
            completed={readyShipments}
            total={totalShipments}
            color="greenAccent"
            Icon={Archive} // Pass the icon component
        />
    );
}

export default CompletedCard;