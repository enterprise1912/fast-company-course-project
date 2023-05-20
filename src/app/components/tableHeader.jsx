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
