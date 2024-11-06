import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // For handling cookies
import useUserStore from '@/store/useUserStore'; // Zustand store to set user data

const GoogleCallback = () => {
    const navigate = useNavigate();
    const {setUser} = useUserStore(); // Zustand store to set user data

    useEffect(() => {
        // When the component mounts, we extract the user data and token from the URL
        const fetchGoogleUserData = () => {
            try {
                // Extract token and user from the URL query parameters
                const urlParams = new URLSearchParams(window.location.search);
                const token = urlParams.get('token');
                const user = JSON.parse(decodeURIComponent(urlParams.get('user')));

                if (token && user) {
                    // If token and user are found, store them in cookies and localStorage
                    const expirationDate = new Date();
                    expirationDate.setDate(expirationDate.getDate() + 90); // Token expiration in 90 days

                    // Store the JWT token in cookies
                    Cookies.set('pdfgenieai_token', token, { expires: expirationDate });

                    // Store user data in Zustand store and localStorage for future reference
                    setUser(user);
                    localStorage.setItem('pdfgenieai_user', JSON.stringify(user));

                    // Navigate to the home page or dashboard
                    navigate('/');
                } else {
                    console.log('Invalid Google callback parameters');
                    // Optionally, handle the case when token or user data is not available
                }
            } catch (error) {
                console.error('Error during Google authentication:', error);
                // Optionally show an error message to the user
            }
        };

        fetchGoogleUserData(); // Call the function to handle the data extraction and storing
    }, [navigate, setUser]);

    return <div>Loading...</div>;
};

export default GoogleCallback;
