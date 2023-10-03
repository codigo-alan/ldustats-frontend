import * as authService from "../services/auth.services";
import { isExpired } from "react-jwt";

export async function verifyTokenExp () {

    const accessToken = localStorage.getItem("auth");
    
    if (accessToken && isExpired(accessToken)) {
        //expired token, call to refresh
        const res = await authService.refreshAuthToken(localStorage.getItem("refreshAuth"));
            
        console.log(res.data.access);
        localStorage.setItem('auth', res.data.access);

    } 

    const headersConfig =
    {
        'Authorization': `Bearer ${localStorage.getItem("auth")}`,
        'Content-Type': 'application/json',
    }
    return headersConfig;
}
