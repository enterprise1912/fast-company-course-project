import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import professionService from "../services/profession.service";

const ProfessionContext = React.createContext();

export const useProfessions = () => {
    return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [professions, setProfessions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProfessionsList();
    }, []);

    const getProfessionsList = async () => {
        try {
            const { content } = await professionService.get();
            setProfessions(content);
            setLoading(false);
        } catch (error) {
            errorCatch(error);
        }
    };

    const errorCatch = (error) => {
        const { message } = error.response.data;
        setError(message);
    };

    useEffect(() => {
        if (error !== null) {
            setError(null);
        }
    }, [error]);

    const getProfession = (id) => {
        return professions.find((profession) => profession._id === id);
    };

    return (
        <ProfessionContext.Provider
            value={{ loading, professions, getProfession }}
        >
            {children}
        </ProfessionContext.Provider>
    );
};

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
