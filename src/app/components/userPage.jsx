import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";

const UserPage = ({ user }) => {
    const { name, profession, qualities, completedMeetings, rate } = user;
    const history = useHistory();
    const toAllUsers = () => {
        history.push("/users");
    };

    return (
        <>
            <h1>{name}</h1>
            <h2>Профессия: {profession.name}</h2>
            <QualitiesList qualities={qualities} />
            <h2>Completed meetings: {completedMeetings}</h2>
            <h2>Rate: {rate}</h2>
            <button onClick={() => toAllUsers()}>All users</button>
        </>
    );
};

UserPage.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserPage;
