import axios from "axios";

const sessionsApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/ldustats/api/v1/sessions/'
})

const sessionsFilterApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/ldustats/api/v1/sessions-filters/'
})


export const addSession = (session) => sessionsApi.post('/', session)

export const getAllSessions = () => sessionsApi.get('/');

export const getSessionByPlayerAndFile = (idPlayer, idFile) => sessionsFilterApi.get('/', 
    {params: {idfile: idFile, idplayer: idPlayer}});