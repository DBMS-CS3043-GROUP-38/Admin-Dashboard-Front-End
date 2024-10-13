import React from 'react';
import { Box, Typography, TextField, Button, Link, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import BackgroundImage from '../../assets/truck-8656658_1920.jpg';

const LoginPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundImage: `url(${BackgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Translucent Box */}
            <Box
                sx={{
                    width: '33%',
                    minHeight: '100vh',
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    padding: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    boxShadow: `0 4px 12px rgba(0, 0, 0, 0.3)`,
                }}
            >
                {/* Heading */}
                <Typography variant="h1" sx={{ mb: 2, color: colors.purpleAccent[600], fontWeight:500}}>
                    DB Supply Chain Management System
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, color: colors.grey[600] }}>
                    Streamline your logistics and inventory management with ease.
                </Typography>

                {/* Login Form */}
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Username"
                    sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                            // backgroundColor: colors.purpleAccent[900],
                            color: colors.purpleAccent[500],
                            '& fieldset': {
                                borderColor: colors.purpleAccent[500],
                            },
                            '&:hover fieldset': {
                                borderColor: colors.purpleAccent[500],
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: colors.purpleAccent[500],
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: colors.purpleAccent[500],
                            '&.Mui-focused': {
                                color: colors.purpleAccent[500],
                            },
                        },
                    }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    type="password"
                    label="Password"
                    sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                            // backgroundColor: colors.purpleAccent[900],
                            color: colors.purpleAccent[500],
                            '& fieldset': {
                                borderColor: colors.purpleAccent[500],
                            },
                            '&:hover fieldset': {
                                borderColor: colors.purpleAccent[500],
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: colors.purpleAccent[500],
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: colors.purpleAccent[500],
                            '&.Mui-focused': {
                                color: colors.purpleAccent[500],
                            },
                        },
                    }}
                />
                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 2,
                        backgroundColor: colors.purpleAccent[700],
                        color: colors.grey[100],
                        '&:hover': {
                            backgroundColor: colors.purpleAccent[800],
                        },
                    }}
                >
                    Login
                </Button>

                {/* Link for Customer Login */}
                <Link
                    href="/customer/login"
                    variant="body2"
                    sx={{
                        mt: 2,
                        display: 'block',
                        color: colors.purpleAccent[500],
                        textAlign: 'center',
                        '&:hover': {
                            textDecoration: 'underline',
                            color: colors.purpleAccent[700],
                        },
                    }}
                >
                    Are you a customer? Login via here
                </Link>
            </Box>
        </Box>
    );
};

export default LoginPage;
