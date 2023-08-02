import { getSessionByPlayerAndFile } from "../services/players.services";
import { TableSessionComponent } from "../components/tableSessionComponent/TableSessionComponent";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { calculateCompleteSession } from "../utils/CalculateCompleteSession";

export function FileDetailPage() {
    const { id, idplayer } = useParams();
    const [sessions, setSessions] = useState([]);
    const [sessionsComplete, setSessionsComplete] = useState([]);
    const [sessionsFirstAvg, setSessionsFirstAvg] = useState([]);
    const [sessionsSecondAvg, setSessionsSecondAvg] = useState([]);
    const [sessionsCompleteAvg, setSessionsCompleteAvg] = useState([]);

    function completeSessionEachPlayer() {
        //TODO obtain by idPlayer
        //calculateCompleteSession for each idPlayer
        //return a list of complete session
    }

    //call when id from params change
    useEffect( () => {
        async function getSessions(idPlayer, idFile) {
            //const res = await getSessionsByFile(id);
            const res = await getSessionByPlayerAndFile(idPlayer, idFile);
            setSessions(res.data);
        }

        getSessions(idplayer, id);

    }, [id]);

    useEffect( () => {
        if (sessions.length > 0) {
            const firstTimeSessions = sessions.filter(session => session.drillTitle?.includes('PRIMER'));
            const secondTimeSessions = sessions.filter(session => session.drillTitle?.includes('SEGUNDO'));
            //TODO calculate properly the complete session for each player with a for
            const completeTimeSessions = completeSessionEachPlayer(); //return a list of complete sessions
            setSessionsFirstAvg(calculateCompleteSession(firstTimeSessions, true));
            setSessionsSecondAvg(calculateCompleteSession(secondTimeSessions, true));
            //setSessionsCompleteAvg(calculateCompleteSession(completeTimeSessions, true));
        }

    }, [sessions]);

    

    return (
        <div className="container p-3">
            <div className="row">
                <h4 className="col-6">Sessiones del fichero {id}</h4>
                <h4 className="col-6">Fecha: {sessions[0]?.date}</h4>
            </div>
            <div className="row">
                <TableSessionComponent data={sessions.filter(session => session.drillTitle?.includes('PRIMER'))} type={'first'} ></TableSessionComponent>
                <TableSessionComponent data={sessionsFirstAvg} type={'first'} ></TableSessionComponent>
            </div>
            
            <div className="row">
                <TableSessionComponent data={sessions.filter(session => session.drillTitle?.includes('SEGUNDO'))} type={'second'} ></TableSessionComponent>
            </div>
            
            <div className="row">
                <TableSessionComponent data={sessionsComplete} type={'complete'} ></TableSessionComponent>
            </div>
        </div>
    );

}