import { useEffect, useState } from "react";
import { TableSessionComponent } from "../../components/tableSessionComponent/TableSessionComponent";
import { getAllSessions } from "../../services/sessions.services";
import { useNavigate } from "react-router-dom";
import { SearchReportComponent } from "../../components/searchReportComponent/searchReportComponent";

export function SessionsPage() {

    const [sessions, setSessions] = useState([]); //declare sessions
    const navigate = useNavigate();

    /*
        get Sessions and set the value
    */
    useEffect( () => {
        async function getSessions() {
            try {
                const res = await getAllSessions();
                setSessions(res.data);
            } catch (error) {
                if(error.response.status == 401 || error.response.status == 403) { //if unauthorized or without credentials
                    navigate(`/login`)
                }
                
            }
        }

        getSessions();

    }, []);

    /* useEffect( () => {
        if (sessions) {
            console.log(sessions[0]['date']);
        }

    }, [sessions]); */

    return (
        <div className="container p-3">
            <div>
                <h2 className="mb-3">Reportes de intervalos</h2>
            </div>
            
            <SearchReportComponent></SearchReportComponent>

            <div className="row">
                <TableSessionComponent data={sessions} type='allSessions'></TableSessionComponent>
            </div>
        </div>
    );
    
};