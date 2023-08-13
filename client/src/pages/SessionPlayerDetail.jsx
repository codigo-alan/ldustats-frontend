import { getSessionByPlayerAndFile } from "../services/sessions.services";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { calculateCompleteSession } from "../utils/CalculateCompleteSession";
import { TableSessionComponent } from "../components/tableSessionComponent/TableSessionComponent";
import { ConfigurationButton } from "../components/configurationButton/ConfigurationButton";
import { allSessionHeaders } from "../models/Organisation";

export function SessionPlayerDetail() {

    const { id, idplayer } = useParams();
    const [sessions, setSessions] = useState([]);
    const [sessionsComplete, setSessionsComplete] = useState([]);
    const [selectedHeaders, setSelectedHeaders] = useState([]);

    const changeHeaders = (selected) => {
        setSelectedHeaders(selected);
      };

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
            setSessionsComplete([calculateCompleteSession(sessions)]);
        }

    }, [sessions] );

    
    return (
        <div className="container p-3">
            <div className="d-flex justify-content-end">
                <ConfigurationButton outputHeaders={changeHeaders}></ConfigurationButton>
            </div>

            {sessions.map((s, index) => {
                return(
                    <div key={index} className="row">
                        <TableSessionComponent data={sessions.filter(session => session.drillTitle == s.drillTitle)} 
                        personalizedCaption={s.drillTitle}
                        headersToShow={selectedHeaders}></TableSessionComponent>
                    </div>
                );
            })}
            {(sessions?.length > 1) &&
                <div className="row">
                    <TableSessionComponent data={sessionsComplete} type={'complete'}
                    headersToShow={selectedHeaders}></TableSessionComponent>
                </div>
            }
            
        </div>
        
    );
}
