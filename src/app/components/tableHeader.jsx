import React from "react";
import PropTypes from "prop-types";
import SortCaret from "./sortCaret";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({
                path: item,
                order: "asc"
            });
        }
    };

    // // alternative to sortCaret.jsx
    // const renderSortCaret = (selectedSort, currentPath) => {
    //     if (selectedSort.path === currentPath) {
    //         if (selectedSort.order === "desc") {
    //             return <i className="bi bi-caret-down-fill"></i>;
    //         } else {
    //             return <i className="bi bi-caret-up-fill"></i>;
    //         }
    //     }
    //     return null;
    // };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        {...{ role: columns[column].path && "button" }}
                        scope="colSpan"
                    >
                        {columns[column].name}
                        {selectedSort.path === columns[column].path && (
                            <SortCaret order={selectedSort.order} />
                        )}
                        {/* {renderSortCaret(selectedSort, columns[column].path)} */}
                    </th>
                ))}
                {/* <th onClick={() => handleSort("name")} scope="colSpan">
                    Имя
                </th>
                <th scope="colSpan">Качества</th>
                <th
                    onClick={() => handleSort("profession.name")}
                    scope="colSpan"
                >
                    Профессия
                </th>
                <th
                    onClick={() => handleSort("completedMeetings")}
                    scope="colSpan"
                >
                    Встретился, раз
                </th>
                <th onClick={() => handleSort("rate")} scope="colSpan">
                    Оценка
                </th>
                <th onClick={() => handleSort("bookmark")} scope="colSpan">
                    Избранное
                </th>
                <th /> */}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
