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

export const getAllPlayers = (headers) => {
    return playersApi.get('/');
}

export const getPlayerById = (id, headers) => playersApi.get(`/${id}`, {headers: headers});  

export const addPlayer = (player, header) => playersApi.post('/', player, {headers: header});

export const deletePlayer = (id, header) => playersApi.delete(`/${id}`, {headers: header})

export const updatePlayer = (id, player, header) => playersApi.put(`/${id}/`, player, {headers: header})

export const getSessionsByPlayer = (playerId, header) => playersApi.get(`/${playerId}/sessions`, 
{headers: header}); 


