import axios from "axios";

const config = {
    baseURL: 'https://api.exchangeratesapi.io',
};

export const callApi = (end, method = 'GET') => {
    const headers = {
        'Content-Type': 'application/json'
    };
    return axios({
        url: `${config.baseURL}/${end}`,
        method,
        headers: {
            ...headers,
        }
    }).then(response => response.data)
        .catch(error => error)

}