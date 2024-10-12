import React, { useContext, useEffect, useState } from 'react';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { ColorModeContext } from "../theme";
import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";

const Topbar = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    // State for current date and time
    const [dateTime, setDateTime] = useState(new Date());

    // Update date and time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <Box display='flex' justifyContent="space-between" alignItems="center" p={2}>
            {/* Date and Time display */}
            <Typography variant="h4" sx={{ color: theme.palette.text.primary }}>
                {dateTime.toLocaleDateString()} - {dateTime.toLocaleTimeString()}
            </Typography>

            {/* Theme toggle button */}
            <Box display='flex'>
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark'
                        ? <LightModeOutlined sx={{ color: theme.palette.grey[100] }} />
                        : <DarkModeOutlined sx={{ color: theme.palette.grey[900] }} />
                    }
                </IconButton>
            </Box>
        </Box>
    );
}

export default Topbar;
