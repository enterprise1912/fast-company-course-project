import React from "react";
import PropTypes from "prop-types";
import Bookmark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";
import UsersList from "./usersList";

const UsersTable = ({
    users,
    onSort,
    selectedSort,
    handleToggleBookmark,
    handleDelete
}) => {
    const columns = {
        name: {
            name: "Имя",
            component: (user) => <UsersList id={user._id} name={user.name} />
        },
        qualities: {
            name: "Качество",
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    status={user.bookmark}
                    onClick={() => handleToggleBookmark(user._id)}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    className={"btn btn-danger"}
                    onClick={() => handleDelete(user._id)}
                >
                    Удалить
                </button>
            )
        }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    handleToggleBookmark: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
};

export default UsersTable;
