import axios from "axios";
import { addInterceptors } from "../utils/Interceptors";

//create a base URL to avoid repeat the url string
const playersApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/ldustats/api/v1/players/'
})

addInterceptors(playersApi);


/* export const getAllPlayers = (headers) => {
    return playersApi.get('/', {headers: headers});
} */

export const getAllPlayers = () => {
    return playersApi.get('/');
}

export const getPlayerById = (id) => playersApi.get(`/${id}`);  

export const addPlayer = (player, ) => playersApi.post('/', player);

export const deletePlayer = (id, ) => playersApi.delete(`/${id}`)

export const updatePlayer = (id, player, ) => playersApi.put(`/${id}/`, player)

export const getSessionsByPlayer = (playerId, ) => playersApi.get(`/${playerId}/sessions`); 


