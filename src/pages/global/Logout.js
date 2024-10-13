import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { tokens } from "../../theme";
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/auth/login'); // Adjust the route as needed
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.purpleAccent[900],
                color: colors.grey[100],
                textAlign: 'center',
            }}
        >
            <Typography variant="h4" sx={{ mb: 2 }}>
                Logout Successful
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
                You have been successfully logged out.
            </Typography>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: colors.purpleAccent[700],
                    color: colors.grey[100],
                    '&:hover': {
                        backgroundColor: colors.purpleAccent[800],
                    },
                }}
                onClick={handleLoginRedirect}
            >
                Go to Login Page
            </Button>
        </Box>
    );
};

export default LogoutPage;
