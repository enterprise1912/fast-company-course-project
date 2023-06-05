import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UsersList = ({ id, name }) => {
    return (
        <Link key={id} to={`users/${id}`}>
            {name}
        </Link>
    );
};

UsersList.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default UsersList;
