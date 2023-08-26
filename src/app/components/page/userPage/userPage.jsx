import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Qualities from "../../ui/qualities";
import api from "../../../api/index";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, [userId]);

    const history = useHistory();
    const toAllUsers = () => {
        history.push("/users");
    };

    return (
        <div>
            {user ? (
                <div>
                    <h1>{user.name}</h1>
                    <h2>Профессия: {user.profession.name}</h2>
                    <Qualities qualities={user.qualities} />
                    <h2>Completed meetings: {user.completedMeetings}</h2>
                    <h2>Rate: {user.rate}</h2>
                    <button onClick={() => toAllUsers()}>All users</button>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
