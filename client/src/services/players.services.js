import axios from "axios";
import { addInterceptors } from "../utils/Interceptors";

//create a base URL to avoid repeat the url string
const playersApi = axios.create({
    baseURL: 'https://ldustats-backend-production.up.railway.app/ldustats/api/v1/players/'
})

addInterceptors(playersApi);

export const getAllPlayers = () => {
    return playersApi.get('/');
}

export const getPlayerById = (id) => playersApi.get(`/${id}`);  

export const addPlayer = (player, ) => playersApi.post('/', player);

export const deletePlayer = (id, ) => playersApi.delete(`/${id}`)

export const updatePlayer = (id, player, ) => playersApi.put(`/${id}/`, player)

export const getSessionsByPlayer = (playerId, ) => playersApi.get(`/${playerId}/sessions`); 


