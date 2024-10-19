import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ allowedRoles }) => {
    const { user } = useAuth();

    console.log('User:', user);

    if (!user) {
        return <Navigate to="/auth/login" />; // Redirect to log in if not authenticated
    }

    if (!allowedRoles.includes(user.type)) {
        console.log('User role:', user);
        return <Navigate to="/unauthorized" />; // Redirect if user role is not authorized
    }

    return <Outlet />; // Render the child route components if authorized
};

export default PrivateRoute;
