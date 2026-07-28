"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { STORAGE_KEYS } from "@/constants/storageKeys";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const isLoggedIn = localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN);
        const currentUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);

        if (isLoggedIn === "true" && currentUser) {
            setUser(JSON.parse(currentUser));
            setIsAuthenticated(true);
        }

        setLoading(false);

    }, []);

    const login = (userData) => {

        localStorage.setItem(
            STORAGE_KEYS.CURRENT_USER,
            JSON.stringify(userData)
        );

        localStorage.setItem(
            STORAGE_KEYS.IS_LOGGED_IN,
            "true"
        );

        setUser(userData);
        setIsAuthenticated(true);

    };

    const logout = () => {

        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);

        localStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);

        setUser(null);
        setIsAuthenticated(false);

    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                loading,
                isAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => useContext(AuthContext);