// components/ProtectedRoute.js
import React from 'react';
import useUserStore from "@/store/useUserStore";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { user } = useUserStore(); // Accessing the user from Zustand store
    
    // If the user is not authenticated, redirect to the login page
    return user ? <Outlet /> : <Navigate to="/login" />; // Make sure to return this JSX
};

export default ProtectedRoute;
