import { createContext, useState, useContext } from 'react';

// Create a context to manage authentication and user data
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (userData) => {
        console.log('User data received at login function', userData);
        setUser(userData); // Store user data in state
        localStorage.setItem('user', JSON.stringify(userData)); // Persist in localStorage
        console.log('User logged in:', userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access authentication context
export const useAuth = () => useContext(AuthContext);
