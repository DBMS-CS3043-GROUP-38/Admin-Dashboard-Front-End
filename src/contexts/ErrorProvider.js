import React, { createContext, useContext, useState } from 'react';

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(null);

    const handleError = (error) => {
        if (error.response) {
            const { status } = error.response;
            if (status === 401 || status === 403) {
                setError('unauthorized');
            } else {
                setError('database-error');
            }
        } else {
            setError('database-error');
        }
    };

    return (
        <ErrorContext.Provider value={{ error, setError, handleError }}>
            {children}
        </ErrorContext.Provider>
    );
};

export const useError = () => useContext(ErrorContext);
