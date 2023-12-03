import axios from "axios";
import { addInterceptors } from "../utils/Interceptors";

const sessionsApi = axios.create({
    baseURL: 'https://ldustats-backend-production.up.railway.app/ldustats/api/v1/sessions/'
})

const sessionsIntervalsApi = axios.create({
    baseURL: 'https://ldustats-backend-production.up.railway.app/ldustats/api/v1/sessions-intervals/'
})

const sessionsHistoricalApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/ldustats/api/v1/historical-info'
})

addInterceptors(sessionsApi);
addInterceptors(sessionsIntervalsApi);
addInterceptors(sessionsHistoricalApi);

export const addSession = (session) => sessionsApi.post('/', session);

export const getAllSessions = () => sessionsApi.get('/');

export const getSessionByPlayerAndFile = (idPlayer, idFile) => sessionsApi.get('/', 
    {params: {idfile: idFile, idplayer: idPlayer}});

export const getIntervalSession = (searchData) => sessionsIntervalsApi.get('/',
    {params: 
        {playerName: searchData.name, initDate: searchData.startDate, endDate: searchData.endDate}
    });

export const getHistoricalInfoById = (ref) => sessionsHistoricalApi.get(``,
    {params: {refParam: ref}}); //obtains the historical info of determinated player