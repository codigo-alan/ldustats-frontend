import axios from "axios";

const tokenApi = axios.create({
    baseURL: 'https://ldustats-backend-production.up.railway.app/api/token/' //with POST returns token
})

const refreshTokenApi = axios.create({
    baseURL: 'https://ldustats-backend-production.up.railway.app/api/token/refresh/' //with POST returns refreshed token
})

export const loginUser = (data) => tokenApi.post('/',
    {username: data.userName, password: data.password});

export const refreshAuthToken = (refreshToken) => refreshTokenApi.post('/', 
    {refresh: refreshToken});
