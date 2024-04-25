import axios from "axios";
const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};
export const createApiClient = (baseURL) => {
    const fullURL = `http://localhost:3001${baseURL}`;
    return axios.create({
        baseURL: fullURL,
        ...commonConfig,
    });
};
