import React, { useState } from 'react';
import { useLocalState } from '../utils/usingLocalStorage';
import { Navigate } from 'react-router-dom';
import ajax from '../Services/fetchService';

const PrivateRoute = ({ children }) => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [isLoading, setLoading] = useState(true);
    const [isValid, setIsValid] = useState(null);
    if (jwt) {
        ajax(`/auth/validate?token=${jwt}`, "get", jwt).then(isValid => {
            setIsValid(isValid);
            setLoading(false);
        });

    } else {
        return <Navigate to="/login" />;
    }

    return isLoading ? (
        <div>Loading...</div>
    ) : isValid === true ? (
        children
    ) : (
        <Navigate to="/login" />
    );
};


export default PrivateRoute;