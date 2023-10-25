import { getSessionByPlayerAndFile } from "../../services/sessions.services";
import { TableSessionComponent } from "../../components/tableSessionComponent/TableSessionComponent";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { calculateCompleteSession } from "../../utils/CalculateCompleteSession";
import { obtainDrillTitleCount } from "../../utils/ObtainDistinctDrillTitle";
import { createWB, createWS, createWBout, s2ab } from "../../utils/ExportToExcel";
import { saveAs } from 'file-saver';
import toast from "react-hot-toast";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'react-tooltip';
import { transformToTextDate } from "../../utils/DateFormat";

export function FileDetailPage() {
    const { id, idplayer } = useParams();
    const [sessions, setSessions] = useState([]);
    const [sessionsComplete, setSessionsComplete] = useState([]);
    const [sessionsCompleteAvg, setSessionsCompleteAvg] = useState([]);
    const [drillTitlesSet, setDrillTitlesSet] = useState([]);
    const [eachCompletedList, setEachCompletedList] = useState([]);
    const [textDate, setTextDate] = useState('');

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
            completeSessions.push(calculateCompleteSession(playerSessions));
        });
        return completeSessions; //return a list of complete session
    }

    const downloadFile = () => {
        try {
            const wb = createWB(sessions[0]?.date); //create workbook
            drillTitlesSet.forEach( drill => {
                createWS(wb, document.getElementById(drill), drill);
            }); //for each drill create a worksheet
            createWS(wb, document.getElementById('complete'), 'complete'); //ws for complete table
            const wbout = createWBout(wb); //write a wb with all the ws inside
            saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), `LDU-U19_${sessions[0]?.date}.xlsx`); //download the file
        } catch (error) {
            toast.error(`Error al descargar el fichero.\n ${error}`)
        }
    }

    //call when id from params change
    useEffect( () => {
        async function getSessions(idPlayer, idFile) {
            const res = await getSessionByPlayerAndFile(idPlayer, idFile);
            setSessions(res.data);
        }

        getSessions(idplayer, id);

    }, [id]);

    useEffect( () => {
        if (sessions.length > 0) {
            setDrillTitlesSet(obtainDrillTitleCount(sessions));
            setTextDate(transformToTextDate(sessions[0]?.date));
        }
    }, [sessions]);

    useEffect( () => {
        if (drillTitlesSet.length > 0) {

            const calculatedCompleteSessionsList = []; //will be a list of sessions complete
            drillTitlesSet.forEach(e => {
                const requiredSessions = sessions.filter(session => session.drillTitle == e);
                calculatedCompleteSessionsList.push(calculateCompleteSession(requiredSessions, true, e));
            });

            setEachCompletedList(calculatedCompleteSessionsList); 

            const completeTimeSessions = completeSessionEachPlayer(); //return a Session complete 
            setSessionsComplete(completeTimeSessions);
            setSessionsCompleteAvg(calculateCompleteSession(completeTimeSessions, true)); //complete average data from completeMatch
        }

    }, [drillTitlesSet]);


    return (
        <div className="container p-3">
            <div className="col mb-3">
                <h4 className="col-4">Sesiones del fichero nº{id}</h4>
                <h5 className="col-4"
                    data-tooltip-id="excel-tooltip"
                    data-tooltip-content="Fecha de entrenamiento"
                    data-tooltip-place="right">
                    Fecha: {textDate}
                </h5>
                <div className="col-4 d-flex justify-content-start">
                    <button
                        data-tooltip-id="excel-tooltip"
                        data-tooltip-content="Exportar tablas a excel"
                        data-tooltip-place="right"
                        onClick={ downloadFile }
                        className="col-auto btn btn-success">
                            <FontAwesomeIcon className="pe-2" icon={faFileExcel}/>
                        Exportar
                    </button>
                </div>
                <Tooltip id="excel-tooltip" />
            </div>

            {drillTitlesSet.map((e, i) => {
                return(
                    <div key={i} className="row">
                        <TableSessionComponent 
                            idTable={e}
                            data={sessions?.filter(session => session.drillTitle == e)
                                .concat(eachCompletedList?.filter(session => e == session.drillTitle))} 
                            personalizedCaption={e}>
                        </TableSessionComponent>
                    </div>
                );
            })}
            {(sessions?.length > 1) &&
                <div className="row">
                    <TableSessionComponent idTable={'complete'} data={sessionsComplete?.concat(sessionsCompleteAvg)} type={'complete'}></TableSessionComponent>
                </div>
            }

        </div>
    );

}