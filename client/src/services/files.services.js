import axios from "axios";
import { addInterceptors } from "../utils/Interceptors";

const filesApi = axios.create({
    baseURL: 'https://ldustats-backend-production.up.railway.app/ldustats/api/v1/files/'
})

const filesFilterApi = axios.create({
    baseURL: 'https://ldustats-backend-production.up.railway.app/ldustats/api/v1/files-filters/'
})

addInterceptors(filesApi);
addInterceptors(filesFilterApi);


export const getSessionsByFile = (fileId) => filesApi.get(`/${fileId}/sessions`);

export const getAllFiles = () => filesApi.get(`/`);

export const addFile = (file) => filesApi.post('/', file);

export const deleteFile = (id) => filesApi.delete(`/${id}`);

export const getFilesByIds = (ids) => filesFilterApi.get('/', 
{params: {ids: ids}});