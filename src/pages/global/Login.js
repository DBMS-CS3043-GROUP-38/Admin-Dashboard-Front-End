import React, {useEffect, useState} from 'react';
import {Box, Typography, TextField, Button, Link, useTheme, IconButton, CircularProgress} from '@mui/material';
import {styled, keyframes} from '@mui/material/styles';
import {tokens} from '../../theme';
import BackgroundImage from '../../assets/truck-8656658_1920.jpg';
import {useNavigate, Link as RouterLink} from 'react-router-dom';
import {login as LoginCall} from '../../services/apiService';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import HomeIcon from '@mui/icons-material/Home';
import {useAuth} from "../../contexts/AuthContext";

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const AnimatedBox = styled(Box)(({theme}) => ({
    animation: `${fadeIn} 0.5s ease-out`,
}));

const FloatingIcon = styled(Box)(({theme}) => ({
    animation: `${keyframes`
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
    `} 3s ease-in-out infinite`,
}));


const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

const LoadingOverlay = styled(Box)(({theme}) => ({
    position: 'fixed',
    flexDirection: 'column',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    animation: `${fadeIn} 0.3s ease-in, ${fadeOut} 0.3s ease-out 1.7s`,
}));

const LoginPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {login, user} = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');

    useEffect(() => {
        if (user) {
            setIsLoading(true);
            setLoadingMessage(`Welcome, ${user.name}! Redirecting to your dashboard...`);
            const timer = setTimeout(() => {
                if (user.type === 'Admin') {
                    navigate('/admin');
                } else if (user.type === 'StoreManager') {
                    navigate('/manager');
                }
            }, 2000); // Wait for 2 seconds before redirecting

            return () => clearTimeout(timer);
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setLoadingMessage('Logging in...');
        try {
            const data = await LoginCall(username, password);
            login(data);
        } catch (err) {
            setError('Invalid credentials');
            setIsLoading(false);
            setLoadingMessage('');
        }
    };

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
                position: 'relative',
            }}
        >
            {/* ... (keep existing IconButton) */}
            <IconButton
                component={RouterLink}
                to="/"
                sx={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    color: colors.grey[100],
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.7)',
                    },
                }}
            >
                <HomeIcon/>
            </IconButton>

            <AnimatedBox
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
                {/* ... (keep existing content) */}
                <FloatingIcon sx={{alignSelf: 'center', mb: 2}}>
                    <LockOutlinedIcon sx={{fontSize: 60, color: colors.purpleAccent[500]}}/>
                </FloatingIcon>

                <Typography variant="h1" sx={{mb: 2, color: colors.purpleAccent[600], fontWeight: 500}}>
                    DB Supply Chain Management System
                </Typography>
                <Typography variant="h5" sx={{mb: 4, color: colors.grey[600]}}>
                    Streamline your logistics and inventory management with ease.
                </Typography>

                <form onSubmit={handleSubmit}>
                    {/* ... (keep existing form fields) */}
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
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
                    {error && (
                        <Typography variant="body2" color="error" sx={{mb: 2}}>
                            {error}
                        </Typography>
                    )}
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        sx={{
                            mt: 2,
                            backgroundColor: colors.purpleAccent[700],
                            color: colors.grey[100],
                            '&:hover': {
                                backgroundColor: colors.purpleAccent[800],
                            },
                        }}
                    >
                        {isLoading ? (
                            <>
                                <CircularProgress size={24} color="inherit"/>
                            </>

                        ) : 'Login'}
                    </Button>
                </form>

                {/* ... (keep existing link) */}
                <Link
                    component={RouterLink}
                    to="/customer/login"
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
            </AnimatedBox>

            {isLoading && (
                <LoadingOverlay>
                    <CircularProgress size={60} sx={{color: colors.purpleAccent[500], mb: 2}}/>
                    <Typography variant="h5" sx={{color: colors.grey[100], textAlign: 'center'}}>
                        {loadingMessage}
                    </Typography>
                </LoadingOverlay>
            )}
        </Box>
    );
};

export default LoginPage;
