import axios from "axios";

const sessionsApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/ldustats/api/v1/sessions/'
})

export const addSession = (session, header) => sessionsApi.post('/', session, {headers: header});

export const getAllSessions = (header) => sessionsApi.get('/', {headers: header});

export const getSessionByPlayerAndFile = (idPlayer, idFile, header) => sessionsApi.get('/', 
    {params: {idfile: idFile, idplayer: idPlayer}, headers: header});