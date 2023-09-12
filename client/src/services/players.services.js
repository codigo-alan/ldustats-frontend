import axios from "axios";

//create a base URL to avoid repeat the url string
const playersApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/ldustats/api/v1/players/'
})


export const getAllPlayers = (headers) => {
    return playersApi.get('/', {headers: headers});
}

export const getPlayerById = (id, headers) => playersApi.get(`/${id}`, {headers: headers});  

export const addPlayer = (player) => playersApi.post('/', player)

export const deletePlayer = (id) => playersApi.delete(`/${id}`)

export const updatePlayer = (id, player) => playersApi.put(`/${id}/`, player) //BUG -> Not update the id

export const getSessionsByPlayer = (playerId, header) => playersApi.get(`/${playerId}/sessions`, 
{headers: header}); 


