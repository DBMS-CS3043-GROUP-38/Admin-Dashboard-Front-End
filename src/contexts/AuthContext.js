import { createContext, useState, useContext } from 'react';

// Create a context to manage authentication and user data
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData); // Store user data
        localStorage.setItem('user', JSON.stringify(userData)); // Optionally store in localStorage
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
