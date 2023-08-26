import React from "react";
import PropTypes from "prop-types";

const SortCaret = ({ order }) => {
    return (
        <i
            className={
                "bi bi-caret-" + (order === "desc" ? "down" : "up") + "-fill"
            }
        ></i>
    );
};

SortCaret.propTypes = {
    order: PropTypes.string
};

export default SortCaret;
