import axios from "axios";

//create a base URL to avoid repeat the url string
const playersApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/ldustats/api/v1/players/'
})


export const getAllPlayers = (headers) => {
    return playersApi.get('/', headers);
}

export const getPlayerById = (id) => playersApi.get('/' + id)  

export const addPlayer = (player) => playersApi.post('/', player)

export const deletePlayer = (id) => playersApi.delete(`/${id}`)

export const updatePlayer = (id, player) => playersApi.put(`/${id}/`, player) //BUG -> Not update the id

export const getSessionsByPlayer = (playerId) => playersApi.get(`/${playerId}/sessions`); 


