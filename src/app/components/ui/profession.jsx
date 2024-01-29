import PropTypes from "prop-types";
import { useProfessions } from "../../hooks/useProfessions";

const Profession = ({ id }) => {
    const { loading, getProfession } = useProfessions();
    const profession = getProfession(id);
    return !loading ? profession.name : null;
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
