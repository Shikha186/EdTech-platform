import axios from "axios";

export const apiConnector = (
    method,
    url,
    bodyData,
    headers,
    params
) => {

    return axios({
        method: method,
        url: url,
        data: bodyData,
        headers: headers,
        params: params
    });
};