import axios from "axios";
import { addInterceptors } from "../utils/Interceptors";

const usersApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/ldustats/api/v1/register/' //TODO not works yet url in back
})

addInterceptors(usersApi);

export const getAllUsers = () => usersApi.get('/');

export const getUser = (idUser) => usersApi.get('/', 
    {params: {idUser: idUser}});

//data will be username and password
export const addUser = (data) => usersApi.post('/', 
{params: {username: data.userName, password: data.password} });

export const deleteUser = (id) => usersApi.delete(`/${id}`);

export const updateUser = (id, user) => usersApi.put(`/${id}/`, user);