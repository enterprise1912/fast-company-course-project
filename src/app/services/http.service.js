import axios from "axios";
import { toast } from "react-toastify";
import config from "../config.json";

// if we use an HTTP-service only to connect the application to one resource - our server, on backend, and no other websites/resources/URIs/etc, then define baseURL as follows:
axios.defaults.baseURL = config.apiEndPoint;

axios.interceptors.response.use(
    (response) => response,
    function (error) {
        const isExpectedError =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

        if (!isExpectedError) {
            console.log(error);
            toast.error("Something went wrong. Please try again later!");
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export default httpService;
