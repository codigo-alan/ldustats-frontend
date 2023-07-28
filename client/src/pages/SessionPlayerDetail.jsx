import { getSessionByPlayerAndFile } from "../services/players.services";
import { TableComponent } from "../components/tableComponent/TableComponent";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { calculateCompleteSession } from "../utils/CalculateCompleteSession";

export function SessionPlayerDetail() {

    const { id, idplayer } = useParams();
    const [sessions, setSessions] = useState([]);
    const [sessionsComplete, setSessionsComplete] = useState([]);

    //call when id from params change
    useEffect( () => {
        async function getSessions(idPlayer, idFile) {
            const res = await getSessionByPlayerAndFile(idPlayer, idFile);
            setSessions(res.data);
        }

        getSessions(idplayer, id);

    }, [id]);

    //call when sessions change
    useEffect( () => {

        if (sessions.length > 0) {
            setSessionsComplete(calculateCompleteSession(sessions));
        }

    }, [sessions] );

    
    return (
        <div className="container p-3">
            <div>
                <h2>Resumen 1er tiempo jugador</h2>
            </div>
            <div className="row">
                <TableComponent data={sessions.filter(session => session.drillTitle?.includes('PRIMER'))} type={'sessions'} ></TableComponent>
            </div>
            <div>
                <h2>Resumen 2do tiempo jugador</h2>
            </div>
            <div className="row">
                <TableComponent data={sessions.filter(session => session.drillTitle?.includes('SEGUNDO'))} type={'sessions'} ></TableComponent>
            </div>
            <div>
                <h2>Resumen completo jugador</h2>
            </div>
            <div className="row">
                <TableComponent data={sessionsComplete} type={'sessions'} ></TableComponent>
            </div>
        </div>
        
    );
}
