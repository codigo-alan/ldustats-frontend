import { getSessionsByFile, getSessionByPlayerAndFile } from "../services/players.services";
import { TableComponent } from "../components/tableComponent/TableComponent";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function FileDetailPage() {
    const { id, idplayer } = useParams();
    const [sessions, setSessions] = useState([]);

    //call when id from params change
    useEffect( () => {
        async function getSessions(idPlayer, idFile) {
            //const res = await getSessionsByFile(id);
            const res = await getSessionByPlayerAndFile(idPlayer, idFile);
            setSessions(res.data);
        }

        getSessions(idplayer, id);

    }, [id]);

    

    return (
        <div className="container p-3">
            <div>
                <h2>Sessiones del fichero {id}</h2>
            </div>
            <div className="row">
                <TableComponent data={sessions} type={'sessions'} ></TableComponent>
            </div>
        </div>
    );

}