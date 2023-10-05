import axios from "axios";
import { addInterceptors } from "../utils/Interceptors";

const filesApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/ldustats/api/v1/files/'
})

const filesFilterApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/ldustats/api/v1/files-filters/'
})

addInterceptors(filesApi);
addInterceptors(filesFilterApi);


export const getSessionsByFile = (fileId) => filesApi.get(`/${fileId}/sessions`);

export const getAllFiles = () => filesApi.get(`/`);

export const addFile = (file) => filesApi.post('/', file);

export const getFilesByIds = (ids) => filesFilterApi.get('/', 
{params: {ids: ids}});