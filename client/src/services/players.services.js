import axios from "axios";

//create a base URL to avoid repeat the url string
const playersApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/ldustats/api/v1/players/'
})

const sessionsApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/ldustats/api/v1/sessions/'
})

const filesApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/ldustats/api/v1/files/'
})

const filesFilterApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/ldustats/api/v1/files-filters/'
})

const sessionsFilterApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/ldustats/api/v1/sessions-filters/'
})

export const getAllPlayers = () => {
    return playersApi.get('/')
}

export const getPlayerById = (id) => playersApi.get('/' + id)  

export const addPlayer = (player) => playersApi.post('/', player)

export const deletePlayer = (id) => playersApi.delete(`/${id}`)

export const updatePlayer = (id, player) => playersApi.put(`/${id}/`, player) //BUG -> Not update the id

export const addSession = (session) => sessionsApi.post('/', session)

export const getAllSessions = () => sessionsApi.get('/');

export const getSessionsByPlayer = (playerId) => playersApi.get(`/${playerId}/sessions`); 

export const getSessionsByFile = (fileId) => filesApi.get(`/${fileId}/sessions`);

export const getAllFiles = () => filesApi.get(`/`);

export const getFilesByIds = (ids) => filesFilterApi.get('/', {params: {ids: ids},});

export const getSessionByPlayerAndFile = (idPlayer, idFile) => sessionsFilterApi.get('/', 
    {params: {idfile: idFile, idplayer: idPlayer}});

export const addFile = (file) => filesApi.post('/', file);
