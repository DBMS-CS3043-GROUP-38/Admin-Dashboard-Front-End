import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import BusinessIcon from '@mui/icons-material/Business';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StoreIcon from '@mui/icons-material/Store';
import { tokens } from '../../theme'; // Assuming this is where your color tokens are defined
import image from '../../assets/TrucksParked.jpg'
import {useAuth} from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";

const BackgroundImage = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)', // Dark overlay
        zIndex: 1,
    },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 2,
}));

const GlassCard = styled(Card)(({ theme }) => {
    const colors = tokens(theme.palette.mode);
    return {
        background: `rgba(${parseInt(colors.primary[400].slice(1, 3), 16)}, ${parseInt(colors.primary[400].slice(3, 5), 16)}, ${parseInt(colors.primary[400].slice(5, 7), 16)}, 0.1)`,
        backdropFilter: 'blur(10px)',
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${colors.purpleAccent[200]}`,
        color: colors.grey[100],
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
            transform: 'translateY(-5px)',
        },
    };
});

const AnimatedButton = styled(Button)(({ theme }) => ({
    transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));

const HomePage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { user } = useAuth();
    const navigate = useNavigate();


    const features = [
        { icon: BusinessIcon, title: 'Scalable Business Solutions', description: 'Manage orders, routes, and warehouses from a centralized platform.' },
        { icon: LocalShippingIcon, title: 'Optimized Logistics', description: 'Real-time tracking for your products with integrated shipping solutions.' },
        { icon: SupervisorAccountIcon, title: 'Admin and Manager Control', description: 'Seamless control for administrators and managers to monitor and manage operations.' },
        { icon: StoreIcon, title: 'Store Management', description: 'Integrate your store and manage your entire inventory from anywhere.' },
    ];

    const handleDashboard = () =>  {
        if( !user ) {
            navigate('/auth/login');
        }
        else if (user.type === 'Admin') {
            navigate('/admin');
        }
        else if (user.type === 'StoreManager') {
            navigate('/manager');
        }
    }


    return (
        <BackgroundImage>
            <ContentWrapper>
                <Box sx={{ textAlign: 'center', mt: 8, mb: 4 }}>
                    <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2, color: colors.purpleAccent[400] }}>
                        DB Supply Chain Management
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 4, color: colors.cyanAccent[400] }}>
                        Streamlining Logistics and Deliveries Across the Globe
                    </Typography>
                    <Typography sx={{ maxWidth: '800px', margin: '0 auto', mb: 4, color: colors.grey[100] }}>
                        Powered by cutting-edge technologies, DB helps businesses of all sizes connect, track, and scale their supply chain operations globally.
                    </Typography>
                </Box>

                <Grid container spacing={4} justifyContent="center" sx={{ mb: 6 }}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <GlassCard>
                                <CardContent>
                                    <feature.icon sx={{ fontSize: 60, mb: 2, color: colors.purpleAccent[300] }} />
                                    <Typography variant="h6" sx={{ mb: 2, color: colors.yellowAccent[500] }}>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: colors.grey[100] }}>
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                            </GlassCard>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <AnimatedButton
                        variant="contained"
                        size="large"
                        component={Link}
                        to="/auth/login"
                        sx={{
                            mr: 2,
                            mb: 2,
                            backgroundColor: colors.purpleAccent[700],
                            color: colors.grey[100],
                            '&:hover': {
                                backgroundColor: colors.purpleAccent[900],
                            },
                        }}
                    >
                        Log In
                    </AnimatedButton>
                    <AnimatedButton
                        variant="contained"
                        size="large"
                        onClick={handleDashboard}
                        sx={{
                            mr: 2,
                            mb: 2,
                            backgroundColor: colors.greenAccent[700],
                            color: colors.grey[100],
                            '&:hover': {
                                backgroundColor: colors.greenAccent[900],
                            },
                        }}
                    >
                        Dashboard Panel
                    </AnimatedButton>
                </Box>

                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="body1" sx={{ mb: 2, color: colors.grey[100] }}>
                        Are you a customer?
                    </Typography>
                    <AnimatedButton
                        variant="outlined"
                        component={Link}
                        to="/customer"
                        sx={{
                            borderColor: colors.yellowAccent[400],
                            color: colors.yellowAccent[400],
                            '&:hover': {
                                borderColor: colors.yellowAccent[600],
                                color: colors.yellowAccent[600],
                            },
                        }}
                    >
                        Go to Customer Page
                    </AnimatedButton>
                </Box>
            </ContentWrapper>
        </BackgroundImage>
    );
};

export default HomePage;