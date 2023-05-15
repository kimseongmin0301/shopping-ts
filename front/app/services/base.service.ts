import axios, { AxiosResponse } from "axios";

const baseURL = 'http://localhost:3001';

export const axiosInstance = axios.create({
    baseURL,

    // json타입설정
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },

    // 쿠키 보내기
    withCredentials: true,
});

const responseHandler = (response: AxiosResponse) => {
    return response;
}

const errorHandler = () => { };

axiosInstance.interceptors.response.use(responseHandler, errorHandler);