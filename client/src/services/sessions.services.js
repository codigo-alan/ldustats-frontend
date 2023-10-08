import axios from "axios";
import { addInterceptors } from "../utils/Interceptors";

const sessionsApi = axios.create({
    baseURL: 'https://ldustats-backend-production.up.railway.app/ldustats/api/v1/sessions/'
})

addInterceptors(sessionsApi);

export const addSession = (session) => sessionsApi.post('/', session);

export const getAllSessions = () => sessionsApi.get('/');

export const getSessionByPlayerAndFile = (idPlayer, idFile) => sessionsApi.get('/', 
    {params: {idfile: idFile, idplayer: idPlayer}});