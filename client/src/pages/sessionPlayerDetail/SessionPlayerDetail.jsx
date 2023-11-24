import { getSessionByPlayerAndFile } from "../../services/sessions.services";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { calculateCompleteSession } from "../../utils/CalculateCompleteSession";
import { TableSessionComponent } from "../../components/tableSessionComponent/TableSessionComponent";
import { ExcelReportComponent } from "../../components/excelReportComponent/ExcelReportComponent";
import { obtainDrillTitleCount } from "../../utils/ObtainDistinct";

export function SessionPlayerDetail() {

    const { id, idplayer } = useParams();
    const [sessions, setSessions] = useState([]);
    const [sessionsComplete, setSessionsComplete] = useState([]);
    const [drillTitlesSet, setDrillTitleSet] = useState([]);

    //header to pass auth bearer to access in protected routes of the backend
    const headersConfig = 
        {
            'Authorization': `Bearer ${localStorage.getItem("auth")}`,
            'Content-Type': 'application/json',
        }

    //call when id from params change
    useEffect( () => {
        async function getSessions(idPlayer, idFile) {
            const res = await getSessionByPlayerAndFile(idPlayer, idFile, headersConfig);
            setSessions(res.data);
        }

        getSessions(idplayer, id);

    }, [id]);

    //call when sessions change
    useEffect( () => {
        console.log(sessions);

        if (sessions.length > 0) {
            setSessionsComplete([calculateCompleteSession(sessions)]);
            setDrillTitleSet(obtainDrillTitleCount(sessions));
        }

    }, [sessions] );

    
    return (
        <div className="container p-3">

            <ExcelReportComponent sessions={sessions} drillTitlesSet={drillTitlesSet} player={sessions[0]?.name} ></ExcelReportComponent>

            {sessions.map((s, index) => {
                return(
                    <div key={index} className="row">
                        <TableSessionComponent 
                            data={sessions.filter(session => session.drillTitle == s.drillTitle)} 
                            personalizedCaption={s.drillTitle}
                            idTable={s.drillTitle}>
                        </TableSessionComponent>
                    </div>
                );
            })}
            {(sessions?.length > 1) &&
                <div className="row">
                    <TableSessionComponent data={sessionsComplete} type={'complete'} idTable={'complete'}></TableSessionComponent>
                </div>
            }
            
        </div>
        
    );
}
