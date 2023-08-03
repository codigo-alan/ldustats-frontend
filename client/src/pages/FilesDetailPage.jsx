import { getSessionByPlayerAndFile } from "../services/players.services";
import { TableSessionComponent } from "../components/tableSessionComponent/TableSessionComponent";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { calculateCompleteSession } from "../utils/CalculateCompleteSession";
import { obtainDrillTitleCount } from "../utils/ObtainDistinctDrillTitle";

export function FileDetailPage() {
    const { id, idplayer } = useParams();
    const [sessions, setSessions] = useState([]);
    const [sessionsComplete, setSessionsComplete] = useState([]);
    const [sessionsFirstAvg, setSessionsFirstAvg] = useState([]);
    const [sessionsSecondAvg, setSessionsSecondAvg] = useState([]);
    const [sessionsCompleteAvg, setSessionsCompleteAvg] = useState([]);
    const [drillTitlesSet, setDrillTitlesSet] = useState([]);

    function obtainPlayersId() {
        let ids = [];
        sessions.forEach(s => {
            if (!ids.includes(s.idPlayer)) {
                ids.push(s.idPlayer);
            }
        });
        return ids;
    }

    function completeSessionEachPlayer() {
        let completeSessions = [];
        //calculateCompleteSession for each idPlayer
        obtainPlayersId().forEach(id => {
            let playerSessions = [];
            sessions.forEach(s => {if (s.idPlayer == id) playerSessions.push(s)});
            completeSessions.push(calculateCompleteSession(playerSessions)[0]);
        });
        return completeSessions; //return a list of complete session
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
            setDrillTitlesSet(obtainDrillTitleCount(sessions));

            const firstTimeSessions = sessions.filter(session => session.drillTitle?.includes('PRIMER'));
            const secondTimeSessions = sessions.filter(session => session.drillTitle?.includes('SEGUNDO'));
            const completeTimeSessions = completeSessionEachPlayer(); //return a list of complete sessions
            setSessionsComplete(completeTimeSessions);
            setSessionsFirstAvg(calculateCompleteSession(firstTimeSessions, true)); //complete average data from firstTime
            setSessionsSecondAvg(calculateCompleteSession(secondTimeSessions, true)); //complete average data from secondTime
            setSessionsCompleteAvg(calculateCompleteSession(completeTimeSessions, true)); //complete average data from completeMatch
        }

    }, [sessions]);

    

    return (
        <div className="container p-3">
            <div className="row">
                <h4 className="col-6">Sessiones del fichero {id}</h4>
                <h4 className="col-6">Fecha: {sessions[0]?.date}</h4>
            </div>
            {/* <div className="row">
                <TableSessionComponent data={sessions?.filter(session => session.drillTitle?.includes('PRIMER'))} type={'first'} ></TableSessionComponent>
            </div>
            
            <div className="row">
                <TableSessionComponent data={sessions?.filter(session => session.drillTitle?.includes('SEGUNDO'))} type={'second'} ></TableSessionComponent>
            </div>
            
            <div className="row">
                <TableSessionComponent data={sessionsComplete} type={'complete'} ></TableSessionComponent>
            </div> */}

            {drillTitlesSet.map((e, i) => {
                return(
                    <div key={i} className="row">
                        <TableSessionComponent data={sessions.filter(session => session.drillTitle == e)} personalizedCaption={e}></TableSessionComponent>
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