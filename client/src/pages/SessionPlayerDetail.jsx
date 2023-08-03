import { getSessionByPlayerAndFile } from "../services/players.services";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { calculateCompleteSession } from "../utils/CalculateCompleteSession";
import { TableSessionComponent } from "../components/tableSessionComponent/TableSessionComponent";

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
            
            {/* <div className="row">
                <TableSessionComponent data={sessions.filter(session => session.drillTitle?.includes('PRIMER'))} type={'first'} ></TableSessionComponent>
            </div>
            
            <div className="row">
                <TableSessionComponent data={sessions.filter(session => session.drillTitle?.includes('SEGUNDO'))} type={'second'} ></TableSessionComponent>
            </div>
            
            <div className="row">
                <TableSessionComponent data={sessionsComplete} type={'complete'}></TableSessionComponent>
            </div> */}
            {sessions.map((s, index) => {
                return(
                    <div key={index} className="row">
                        <TableSessionComponent data={sessions.filter(session => session.drillTitle == s.drillTitle)} personalizedCaption={s.drillTitle}></TableSessionComponent>
                    </div>
                );
            })}
            {(sessions?.length > 1) &&
                <div className="row">
                    <TableSessionComponent data={sessionsComplete} type={'complete'}></TableSessionComponent>
                </div>
            }
            
        </div>
        
    );
}
