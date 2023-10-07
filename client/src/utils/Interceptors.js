import { refreshAuthToken } from "../services/auth.services";
import { isExpired } from "react-jwt";

/*
    //header to pass auth bearer to access in protected routes of the backend
  const headersConfig = 
    {
      'Authorization': `Bearer ${localStorage.getItem("auth")}`,
      'Content-Type': 'application/json',
    }
*/

async function renewToken(refToken) {

  const res = await refreshAuthToken(refToken);
  localStorage.setItem("auth", res.data.access);
  return res.data.access;

}

export function addInterceptors(axiosInstance) {

    axiosInstance.interceptors.request.use(
        async (config) => {
          const token = localStorage.getItem('auth'); 
          if (token && !isExpired(token)) {
            config.headers.Authorization = `Bearer ${token}`;
          }else if (token && isExpired(token)) {
            try {
              const newToken = await renewToken(localStorage.getItem('refreshAuth'));
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

