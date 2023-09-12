import { useEffect, useState } from "react";
import { TableSessionComponent } from "../../components/tableSessionComponent/TableSessionComponent";
import { getAllSessions } from "../../services/sessions.services";
import { useNavigate } from "react-router-dom";

export function SessionsPage() {

    const [sessions, setSessions] = useState([]); //declare sessions
    const navigate = useNavigate();
    //header to pass auth bearer to access in protected routes of the backend
    const headersConfig = 
        {
            'Authorization': `Bearer ${localStorage.getItem("auth")}`,
            'Content-Type': 'application/json',
        }
    /*
        get Sessions and set the value
    */
    useEffect( () => {
        async function getSessions() {
            try {
                const res = await getAllSessions(headersConfig);
                setSessions(res.data);
            } catch (error) {
                if(error.response.status == 401 || error.response.status == 403) { //if unauthorized or without credentials
                    navigate(`/login`)
                }
                
            }
        }

        getSessions();

    }, []);

    return (
        <div className="container p-3">
            <div>
                <h2>Sesiones registradas</h2>
            </div>
            <div className="row">
                <TableSessionComponent data={sessions} type='allSessions'></TableSessionComponent>
            </div>
        </div>
    );
    
};