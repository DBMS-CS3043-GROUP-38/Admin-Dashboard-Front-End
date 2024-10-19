import React from 'react';
import {Box, Typography, Button, useTheme} from '@mui/material';
import {styled, keyframes} from '@mui/material/styles';
import {Link} from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import HomeIcon from '@mui/icons-material/Home';
import {tokens} from '../../theme'; // Assuming this is where your color tokens are defined
import {useAuth} from "../../contexts/AuthContext";
import LogoutPage from "./Logout";
import {HiLogout} from "react-icons/hi";

const float = keyframes`
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-20px);
    }
    100% {
        transform: translateY(0px);
    }
`;

const pulse = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
`;

const Container = styled(Box)(({theme}) => {
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

const IconWrapper = styled(Box)(({theme}) => ({
    animation: `${float} 3s ease-in-out infinite`,
}));

const StyledLockIcon = styled(LockIcon)(({theme}) => {
    const colors = tokens(theme.palette.mode);
    return {
        fontSize: '150px',
        color: colors.redAccent[500],
        marginBottom: theme.spacing(2),
    };
});

const GlowingText = styled(Typography)(({theme}) => {
    const colors = tokens(theme.palette.mode);
    return {
        color: colors.yellowAccent[500],
        textShadow: `0 0 10px ${colors.yellowAccent[200]}`,
        animation: `${pulse} 2s ease-in-out infinite`,
        marginBottom: theme.spacing(2),
    };
});

const StyledButton = styled(Button)(({theme}) => {
    const colors = tokens(theme.palette.mode);
    return {
        margin: theme.spacing(1),
        backgroundColor: colors.purpleAccent[500],
        color: colors.grey[100],
        '&:hover': {
            backgroundColor: colors.purpleAccent[700],
        },
        transition: 'all 0.3s ease-in-out',
    };
});

const UnauthorizedPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {logout} = useAuth();

    return (
        <Container>
            <IconWrapper>
                <StyledLockIcon/>
            </IconWrapper>
            <GlowingText variant="h1">
                401 / 403
            </GlowingText>
            <Typography variant="h4" sx={{color: colors.cyanAccent[400], marginBottom: 2}}>
                Access Denied
            </Typography>
            <Typography variant="body1" sx={{color: colors.grey[100], maxWidth: '600px', marginBottom: 4}}>
                Oops! It seems you are not authorized to access this page.
                This might cause due to login session expiration or unauthorized access to the page. Try to re login or
                contact the administrator for further assistance.
            </Typography>
            <Box display={'flex'}>
                <StyledButton
                    component={Link}
                    to="/"
                    variant="contained"
                    size="large"
                    startIcon={<HomeIcon/>}
                >
                    Return to HomePage
                </StyledButton>
                <StyledButton
                    component={Link}
                    to="/"
                    variant="contained"
                    size="large"
                    startIcon={<HiLogout/>}
                    onClick={
                        logout()
                    }
                >
                    Logout
                </StyledButton>
            </Box>
        </Container>
    );
};

export default UnauthorizedPage;