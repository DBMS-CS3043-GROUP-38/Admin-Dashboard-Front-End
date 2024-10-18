import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ allowedRoles }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/auth/login" />; // Redirect to login if not authenticated
    }

    if (!allowedRoles.includes(user.type)) {
        return <Navigate to="/unauthorized" />; // Redirect if user role is not authorized
    }

    return <Outlet />; // Render the child route components if authorized
};

export default PrivateRoute;
