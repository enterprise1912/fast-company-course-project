import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    const { loading } = useQualities();
    return !loading
        ? qualities.map((quality) => <Quality key={quality} id={quality} />)
        : "";
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
