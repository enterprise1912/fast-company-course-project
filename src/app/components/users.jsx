import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import User from "./user";
import api from "../api/index";
import Pagination from "./pagination";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";

const Users = () => {
    const pageSize = 2;
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProfessionsSelect = (item) => {
        setSelectedProf(item);
    };

    const handleDelete = (userID) => {
        setUsers(users.filter((user) => user._id !== userID));
    };

    const handleToggleBookmark = (id) => {
        setUsers((prevState) =>
            prevState.map((user) =>
                user._id === id ? { ...user, bookmark: !user.bookmark } : user
            )
        );
    };

    const filteredUsers = selectedProf
        ? users.filter((user) => {
              return (
                  JSON.stringify(user.profession) ===
                  JSON.stringify(selectedProf)
              );
          })
        : users;

    const count = filteredUsers?.length;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);

    useEffect(() => {
        if (userCrop.length === 0 && currentPage !== 1) {
            setCurrentPage((prevState) => prevState - 1);
        }
    }, [users]);

    const clearFilter = () => {
        setSelectedProf();
    };

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionsSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Reset
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />
                {count > 0 && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="colSpan">Имя</th>
                                <th scope="colSpan">Качества</th>
                                <th scope="colSpan">Профессия</th>
                                <th scope="colSpan">Встретился, раз</th>
                                <th scope="colSpan">Оценка</th>
                                <th scope="colSpan">Избранное</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {userCrop.map((user) => (
                                <User
                                    key={user._id}
                                    {...user}
                                    handleDelete={handleDelete}
                                    handleToggleBookmark={handleToggleBookmark}
                                />
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.array
};

export default Users;
