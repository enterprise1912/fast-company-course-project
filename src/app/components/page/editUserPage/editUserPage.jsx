import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import MultiSelectField from "../../common/form/multiSelectField";
import RadioField from "../../common/form/radioField";
import BackHistoryBtn from "../../common/backButton";
import { useQualities } from "../../../hooks/useQualities";
import { useProfessions } from "../../../hooks/useProfessions";
import { useAuth } from "../../../hooks/useAuth";

const EditUserPage = () => {
    const { currentUser, updateUserData } = useAuth();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const [errors, setErrors] = useState({});
    const { qualities, loading: qualitiesLoading } = useQualities();
    const qualitiesList = qualities.map((quality) => ({
        value: quality._id,
        label: quality.name,
        color: quality.color
    }));

    const { professions, loading: professionsLoading } = useProfessions();
    const professionsList = professions.map((profession) => ({
        label: profession.name,
        value: profession._id
    }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        await updateUserData({
            ...data,
            qualities: data.qualities.map((quality) => quality.value)
        });
        history.push(`/users/${currentUser._id}`);
    };

    const getQualitiesByID = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality of qualities) {
                if (elem === quality._id) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    };

    const convertQualities = (data) => {
        return getQualitiesByID(data).map((quality) => ({
            label: quality.name,
            value: quality._id
        }));
    };

    useEffect(() => {
        if (!professionsLoading && !qualitiesLoading && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: convertQualities(currentUser.qualities)
            });
        }
    }, [professionsLoading, qualitiesLoading, currentUser, data]);

    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Email is required"
            },
            isEmail: {
                message: "Email is invalid"
            }
        },
        name: {
            isRequired: {
                message: "Please, enter your name"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    return (
        <div className="container mt-5">
            <BackHistoryBtn />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading && Object.keys(professionsList).length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Name"
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Email"
                                type="text"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Choose your profession"
                                defaultOption="Choose..."
                                name="profession"
                                options={professionsList}
                                value={data.profession}
                                error={errors.profession}
                                onChange={handleChange}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.gender}
                                name="gender"
                                onChange={handleChange}
                                label="Choose your gender"
                            />
                            <MultiSelectField
                                options={qualitiesList}
                                onChange={handleChange}
                                defaultValue={data.qualities}
                                name="qualities"
                                label="Choose your qualities"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Update
                            </button>
                        </form>
                    ) : (
                        <h1>Loading...</h1>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
