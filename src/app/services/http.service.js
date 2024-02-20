import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";

// if we use an HTTP-service only to connect the application to one resource - our server, on backend, and no other websites/resources/URIs/etc, then define baseURL as follows:
axios.defaults.baseURL = configFile.apiEndPoint;

axios.interceptors.request.use(
    function (config) {
        if (configFile.ifFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

function transformData(data) {
    return data
        ? Object.keys(data).map((key) => ({
              ...data[key]
          }))
        : [];
}

axios.interceptors.response.use(
    (response) => {
        if (configFile.ifFireBase) {
            response.data = { content: transformData(response.data) };
        }
        return response;
    },
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
