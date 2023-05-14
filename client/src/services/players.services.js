import axios from "axios";

export const getAllPlayers = () => {
    return axios.get('http://127.0.0.1:8000/ldustats/api/v1/players/')
}