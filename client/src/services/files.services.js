import axios from "axios";

const filesApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/ldustats/api/v1/files/'
})

const filesFilterApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/ldustats/api/v1/files-filters/'
})


export const getSessionsByFile = (fileId) => filesApi.get(`/${fileId}/sessions`);

export const getAllFiles = (header) => filesApi.get(`/`, {headers: header});

export const addFile = (file, header) => filesApi.post('/', file, {headers: header});

export const getFilesByIds = (ids, header) => filesFilterApi.get('/', 
{params: {ids: ids}, headers: header});