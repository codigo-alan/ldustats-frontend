import { refreshAuthToken } from "../services/auth.services";
import { isExpired } from "react-jwt";
/* export function verifyTokenExp () {

    const accessToken = localStorage.getItem("auth");
    
    if (accessToken && isExpired(accessToken)) {
        //expired token, call to refresh
        //const res = await authService.refreshAuthToken(localStorage.getItem("refreshAuth"));
            
        console.log(res.data.access);
        localStorage.setItem('auth', res.data.access);

    } 

    const headersConfig =
    {
        'Authorization': `Bearer ${localStorage.getItem("auth")}`,
        'Content-Type': 'application/json',
    }
    return headersConfig;
} */

async function renewToken(refToken) {

  const res = await refreshAuthToken(refToken);
  localStorage.setItem("auth", res.data.access);
  return res.data.access;

}

export function addInterceptors(axiosInstance) {

    axiosInstance.interceptors.request.use(
        (config) => {
          const token = localStorage.getItem('auth'); 
          if (token && !isExpired(token)) {
            config.headers.Authorization = `Bearer ${token}`;
          }else if (token && isExpired(token)) {
            try {
              const newToken = renewToken(localStorage.getItem('refreshAuth'));
              config.headers.Authorization = `Bearer ${newToken}`;
            } catch (error) {
              console.log('Error in Renew token')
            }
            
          }
      
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
}

