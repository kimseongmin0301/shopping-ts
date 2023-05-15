import { axiosInstance } from "../base.service";

axiosInstance.get('/join')
    .then(res => {
        console.log(res.data);
    })