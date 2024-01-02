import axios from "axios";
import { addInterceptors } from "../utils/Interceptors";

//create a base URL to avoid repeat the url string
const teamsApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/ldustats/api/v1/teams/'
})

addInterceptors(teamsApi);

export const getAllTeams = () => {
    return teamsApi.get('/');
}