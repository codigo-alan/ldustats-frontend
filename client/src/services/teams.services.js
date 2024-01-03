import axios from "axios";
import { addInterceptors } from "../utils/Interceptors";

//create a base URL to avoid repeat the url string
const teamsApi = axios.create({
    baseURL: 'https://ldustats-backend-production.up.railway.app/ldustats/api/v1/teams/'
})

addInterceptors(teamsApi);

export const getAllTeams = () => {
    return teamsApi.get('/');
}