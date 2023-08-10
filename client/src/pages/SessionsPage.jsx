import { useEffect, useState } from "react";
import { TableSessionComponent } from "../components/tableSessionComponent/TableSessionComponent";
import { getAllSessions } from "../services/sessions.services";

export function SessionsPage() {

    const [sessions, setSessions] = useState([]); //declare sessions
    /*
        get Sessions and set the value
    */
    useEffect( () => {
        async function getSessions() {
            const res = await getAllSessions();
            setSessions(res.data);
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