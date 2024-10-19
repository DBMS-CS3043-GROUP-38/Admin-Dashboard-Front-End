import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { tokens } from '../../theme';
import {DiDatabase} from "react-icons/di"; // Assuming this is where your color tokens are defined

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const Container = styled(Box)(({ theme }) => {
    const colors = tokens(theme.palette.mode);
    return {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary[600],
        padding: theme.spacing(3),
        textAlign: 'center',
    };
});

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const IconWrapper = styled(Box)(({ theme }) => ({
    animation: `${float} 3s ease-in-out infinite`,
    marginBottom: '16px',
}));

const GlowingText = styled(Typography)(({ theme }) => {
    const colors = tokens(theme.palette.mode);
    return {
        color: colors.yellowAccent[500],
        textShadow: `0 0 10px ${colors.yellowAccent[200]}`,
        animation: `${pulse} 2s ease-in-out infinite`,
        marginBottom: theme.spacing(2),
    };
});

const StyledErrorIcon = styled(DiDatabase)(({ theme }) => {
    const colors = tokens(theme.palette.mode);
    return {
        fontSize: '100px', // Adjust size as needed
        color: colors.purpleAccent[500],
    };
});

const StyledButton = styled(Button)(({ theme }) => {
    const colors = tokens(theme.palette.mode);
    return {
        backgroundColor: colors.purpleAccent[500],
        color: colors.grey[100],
        margin: theme.spacing(1),
        '&:hover': {
            backgroundColor: colors.purpleAccent[700],
        },
        transition: 'all 0.3s ease-in-out',
    };
});

const DatabaseErrorPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleRefresh = () => {
        window.location.reload(); // Refresh the page
    };

    return (
        <Container>
            <IconWrapper>
                <StyledErrorIcon />
            </IconWrapper>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Database Error
            </Typography>
            <GlowingText variant="h1">
                500
            </GlowingText>
            <Typography variant="body1" sx={{ mb: 4 }}>
                Oops! Something went wrong while connecting to the database.
                Please try again later or refresh the page.
            </Typography>
            <Box display={'flex'} justifyContent={'center'}>
                <StyledButton component={Link} to="/" variant="contained">
                    Return to Home
                </StyledButton>
                <StyledButton variant="contained" onClick={handleRefresh}>
                    Refresh Page
                </StyledButton>
            </Box>
        </Container>
    );
};

export default DatabaseErrorPage;
