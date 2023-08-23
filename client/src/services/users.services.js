import axios from "axios";

const usersApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/ldustats/api/v1/users/' //TODO not implemented yet url in back
})

export const getAllUsers = () => usersApi.get('/');

export const getUser = (idUser) => usersApi.get('/', 
    {params: {idUser: idUser}});

//data will be username, email and password
export const addUser = (user) => usersApi.post('/', user);

export const deleteUser = (id) => usersApi.delete(`/${id}`);

export const updateUser = (id, user) => usersApi.put(`/${id}/`, player);

//data will be username, email and password
export const loginUser = (data) => usersApi.get('/', data); //TODO how log a user?