import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

// {...rest} to import all params (path, login, ...)
const ProtectedRoutes = ({ component: Component, children, ...rest }) => {
    const { currentUser } = useAuth();
    return (
        // to make <Switch></Switch> work:
        <Route
            {...rest}
            render={(props) => {
                if (!currentUser) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login/",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
                return Component ? <Component {...props} /> : children;
            }}
        />
    );
};

ProtectedRoutes.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    component: PropTypes.func,
    location: PropTypes.object
};

export default ProtectedRoutes;
