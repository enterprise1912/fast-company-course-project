import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import api from "../api/index";
import Pagination from "../components/pagination";
import GroupList from "../components/groupList";
import SearchStatus from "../components/searchStatus";
import UsersTable from "../components/usersTable";
import _ from "lodash";
import { useParams } from "react-router-dom";
import UserPage from "../components/userPage";

const Users = () => {
    const pageSize = 8;
    const params = useParams();
    const { userId } = params;
    const [user, setUser] = useState();
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({
        path: "name",
        order: "asc"
    });

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, [userId]);

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

    const handleSort = (item) => {
        setSortBy(item);
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

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    useEffect(() => {
        if (userCrop.length === 0 && currentPage !== 1) {
            setCurrentPage((prevState) => prevState - 1);
        }
    }, [users]);

    const clearFilter = () => {
        setSelectedProf();
    };

    return (
        <>
            {userId ? (
                user && <UserPage user={user} />
            ) : (
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
                            <UsersTable
                                users={userCrop}
                                onSort={handleSort}
                                selectedSort={sortBy}
                                handleDelete={handleDelete}
                                handleToggleBookmark={handleToggleBookmark}
                            />
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
            )}
        </>
    );
};

export default Users;
