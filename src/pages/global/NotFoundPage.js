import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { tokens } from '../../theme'; // Assuming this is where your color tokens are defined

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
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

const IconWrapper = styled(Box)(({ theme }) => ({
    animation: `${float} 3s ease-in-out infinite`,
}));

const StyledErrorIcon = styled(ErrorOutlineIcon)(({ theme }) => {
    const colors = tokens(theme.palette.mode);
    return {
        fontSize: '150px',
        color: colors.purpleAccent[500],
        marginBottom: theme.spacing(2),
    };
});

const GlowingText = styled(Typography)(({ theme }) => {
    const colors = tokens(theme.palette.mode);
    return {
        color: colors.yellowAccent[500],
        textShadow: `0 0 10px ${colors.yellowAccent[200]}`,
        animation: `${pulse} 2s ease-in-out infinite`,
        marginBottom: theme.spacing(2),
    };
});

const StyledButton = styled(Button)(({ theme }) => {
    const colors = tokens(theme.palette.mode);
    return {
        backgroundColor: colors.purpleAccent[500],
        color: colors.grey[100],
        '&:hover': {
            backgroundColor: colors.purpleAccent[700],
        },
        transition: 'all 0.3s ease-in-out',
    };
});

const NotFoundPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Container>
            <IconWrapper>
                <StyledErrorIcon />
            </IconWrapper>
            <GlowingText variant="h1">
                404
            </GlowingText>
            <Typography variant="h4" sx={{ color: colors.cyanAccent[400], marginBottom: 2 }}>
                Oops! Page Not Found
            </Typography>
            <Typography variant="body1" sx={{ color: colors.grey[100], maxWidth: '600px', marginBottom: 4 }}>
                It seems like we've hit a supply chain disruption. The page you're looking for might have been relocated, renamed, or is temporarily out of stock.
            </Typography>
            <StyledButton component={Link} to="/" variant="contained" size="large">
                Return to Home Base
            </StyledButton>
        </Container>
    );
};

export default NotFoundPage;