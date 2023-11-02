import axios from "axios";
import { addInterceptors } from "../utils/Interceptors";

const sessionsApi = axios.create({
    baseURL: 'https://ldustats-backend-production.up.railway.app/ldustats/api/v1/sessions/'
})

const sessionsIntervalsApi = axios.create({
    baseURL: 'https://ldustats-backend-production.up.railway.app/ldustats/api/v1/sessions-intervals/'
})

addInterceptors(sessionsApi);
addInterceptors(sessionsIntervalsApi);

export const addSession = (session) => sessionsApi.post('/', session);

export const getAllSessions = () => sessionsApi.get('/');

export const getSessionByPlayerAndFile = (idPlayer, idFile) => sessionsApi.get('/', 
    {params: {idfile: idFile, idplayer: idPlayer}});

export const getIntervalSession = (searchData) => sessionsIntervalsApi.get('/',
    {params: 
        {playerName: searchData.name, initDate: searchData.startDate, endDate: searchData.endDate}
    });