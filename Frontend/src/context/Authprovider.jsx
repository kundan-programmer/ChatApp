import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Refresh par data lane wala function
    const getInitialState = () => {
        try {
            const initialUserState = localStorage.getItem("ChatApp");
            return initialUserState ? JSON.parse(initialUserState) : null;
        } catch (error) {
            return null;
        }
    };

    const [authUser, setAuthUser] = useState(getInitialState());

    return (
        <AuthContext.Provider value={[authUser, setAuthUser]}>
            {children}
        </AuthContext.Provider>
    );
};

// Yeh line sabse zaroori hai!
export const useAuth = () => useContext(AuthContext);