import React, { useContext, useEffect, useState } from 'react';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import {ColorModeContext, tokens} from "../theme";
import {LightModeOutlined, DarkModeOutlined, Logout, LocationCity, LocationOn} from "@mui/icons-material";

const Topbar = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const colors = tokens(theme.palette.mode);

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
        <Box display='flex' justifyContent="space-between" alignItems="center" p={2} sx={{ color: colors.greenAccent["500"] }}>
            <Box display={'flex'} justifyContent={'start'}>
                <LocationOn sx={{mr:2}}/>
                <Typography variant="h4" >
                    Kandy
                </Typography>
            </Box>


            {/* Date and Time display */}
            <Typography variant="h4" sx={{ color: theme.palette.text.primary }}>
                {dateTime.toLocaleDateString()} - {dateTime.toLocaleTimeString()}
            </Typography>

            {/* Theme toggle button */}
            <Box >
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark'
                        ? <LightModeOutlined sx={{ color: theme.palette.grey[100] }} />
                        : <DarkModeOutlined sx={{ color: theme.palette.grey[900] }} />
                    }
                </IconButton>
                <IconButton onClick={() => console.log('Logout')}>
                    <IconButton onClick={() => console.log('Logout')}>
                        <Logout />
                    </IconButton>
                </IconButton>
            </Box>
        </Box>
    );
}

export default Topbar;
