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

const errorHandler = (error: AxiosResponse) => {
    return error.status
};

axiosInstance.interceptors.response.use(responseHandler,
    error => {
        if (error.response && error.response.status === 401) {
            // 401 에러 처리 로직을 여기에 작성합니다.
            // 예를 들어, 로그인 페이지로 리다이렉트하거나 다른 처리를 수행할 수 있습니다.
            console.log('401 Unauthorized Error');
        }
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;