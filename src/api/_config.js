import axios from "axios";

const api = axios.create({
    baseURL: 'http://127.0.0.1:3001', // 如果是/api则是基础路由
    timeout: 30000,
    headers: {
        "Content-Type": "application/json;charset=UTF-8" // 表单数据类型
    }
})

api.interceptors.request.use(
    res => {
        return res
    },
    rej => {
        return Promise.reject(rej);
    }
)

api.interceptors.response.use(
    res => {
        return res;
    },
    rej => {
        return Promise.reject(rej);
    }
)

export default api;