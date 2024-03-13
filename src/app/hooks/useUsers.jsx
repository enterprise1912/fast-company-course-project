import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import userService from "../services/user.service";
import { useAuth } from "./useAuth";

const UserContext = React.createContext();

export const useUsers = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true); // loading = true when component mounting
    const [error, setError] = useState(null);

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        if (!loading) {
            const newUsersArray = [...users];
            const indexOfUser = newUsersArray.findIndex(
                (user) => user._id === currentUser._id
            );
            newUsersArray[indexOfUser] = currentUser;
            setUsers(newUsersArray);
        }
    }, [currentUser]);

    const getUsers = async () => {
        try {
            const { content } = await userService.get();
            setUsers(content);
            setLoading(false);
        } catch (error) {
            errorCatch(error);
        }
    };

    const getUserbyID = (userId) => users.find((user) => user._id === userId);

    const errorCatch = (error) => {
        const { message } = error.response.data;
        setError(message);
    };

    useEffect(() => {
        if (error !== null) {
            setError(null);
        }
    }, [error]);

    return (
        <UserContext.Provider value={{ users, getUserbyID }}>
            {!loading ? children : <h1>Loading...</h1>}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UserProvider;
