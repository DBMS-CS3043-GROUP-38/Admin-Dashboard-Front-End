import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { tokens } from "../../theme";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // You can replace this with a different icon if preferred

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
        color: colors.grey[100],
        textAlign: 'center',
        padding: theme.spacing(3),
    };
});

const IconWrapper = styled(Box)(({ theme }) => ({
    animation: `${float} 3s ease-in-out infinite`,
    marginBottom: '16px',
}));

const StyledErrorIcon = styled(ErrorOutlineIcon)(({ theme }) => {
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

const LogoutPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLoginRedirect = () => {
        logout();
        navigate('/'); // Adjust the route as needed
    };

    return (
        <Container>
            <IconWrapper>
                <StyledErrorIcon />
            </IconWrapper>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Do you want to log out?
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
                Please confirm if you want to log out from your account.
            </Typography>
            <Box display={'flex'} justifyContent={'center'}>
                <StyledButton
                    variant="contained"
                    onClick={handleLoginRedirect}
                >
                    Log out
                </StyledButton>
                <StyledButton
                    variant="contained"
                    sx={{
                        backgroundColor: colors.yellowAccent[700],
                        '&:hover': {
                            backgroundColor: colors.yellowAccent[800],
                        },
                    }}
                    onClick={() => navigate('/')}
                >
                    Cancel
                </StyledButton>
            </Box>
        </Container>
    );
};

export default LogoutPage;
