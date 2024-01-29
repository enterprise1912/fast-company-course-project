import React, { useState, useEffect } from "react";
import _ from "lodash";

import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";

import { paginate } from "../../../utils/paginate";
import { useUser } from "../../../hooks/useUsers";
import { useProfessions } from "../../../hooks/useProfessions";

const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({
        path: "name",
        order: "asc"
    });

    const pageSize = 8;
    const { users } = useUser();
    const { professions } = useProfessions();

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProfessionsSelect = (item) => {
        if (searchQuery !== "") setSearchQuery("");
        setSelectedProf(item);
    };

    const handleSearchQuery = ({ target }) => {
        setSelectedProf(undefined);
        setSearchQuery(target.value);
    };

    const handleDelete = (userID) => {
        // setUsers(users.filter((user) => user._id !== userID));
        console.log(userID);
    };

    const handleToggleBookmark = (id) => {
        const newArray = users.map((user) =>
            user._id === id ? { ...user, bookmark: !user.bookmark } : user
        );
        console.log(newArray);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const filteredUsers = searchQuery
        ? users.filter(
              (user) =>
                  user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !==
                  -1
          )
        : selectedProf
        ? users.filter(
              (user) =>
                  JSON.stringify(user.profession) ===
                  JSON.stringify(selectedProf)
          )
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
                    <>
                        <input
                            type="text"
                            name="searchQuery"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearchQuery}
                        />
                        <UsersTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            handleDelete={handleDelete}
                            handleToggleBookmark={handleToggleBookmark}
                        />
                    </>
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

export default UsersList;
