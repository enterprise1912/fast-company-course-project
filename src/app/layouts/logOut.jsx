import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const LogOut = () => {
    const { signOut } = useAuth();
    useEffect(() => {
        signOut();
    }, []);
    return <div>Loading...</div>;
};

export default LogOut;
