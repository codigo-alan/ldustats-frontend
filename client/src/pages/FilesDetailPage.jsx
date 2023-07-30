import { getSessionByPlayerAndFile } from "../services/players.services";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TableSessionComponent } from "../components/tableSessionComponent/TableSessionComponent";

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
                <TableSessionComponent data={sessions} type={'sessions'} ></TableSessionComponent>
            </div>
        </div>
    );

}