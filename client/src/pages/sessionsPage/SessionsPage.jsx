import { useEffect, useState } from "react";
import { TableSessionComponent } from "../../components/tableSessionComponent/TableSessionComponent";
import { useNavigate } from "react-router-dom";
import { SearchReportComponent } from "../../components/searchReportComponent/searchReportComponent";
import { ExcelReportComponent } from "../../components/excelReportComponent/ExcelReportComponent";
import { obtainDateSet } from "../../utils/ObtainDistinct";

export function SessionsPage() {

    const [sessions, setSessions] = useState([]); //declare sessions
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [searched, setSearched] = useState(false);
    const [dateSet, setDateSet] = useState([]);

    useEffect( () => {

        function getUserName() {
            const activeUser = JSON.parse(localStorage.getItem('activeUser'));
            setUser(activeUser);
        }

        localStorage.getItem('activeUser') ? getUserName() : navigate(`/login`);

    }, [] );

    //called when sessions change
    useEffect( () => {

        if (sessions.length != 0) {
            setDateSet(obtainDateSet(sessions));
        }else setDateSet([]);

    }, [sessions] );

    const searchedData = (childData) => {
        setSessions(childData);
    }
    const checkSearch = (childData) => {
        setSearched(childData);
    }

    return (
        <div className="container p-3">
            <div>
                <h2 className="mb-3">Reportes de intervalos</h2>
            </div>
            
            <SearchReportComponent onSearched={searchedData} wasSearched={checkSearch} ></SearchReportComponent>

            <div className="row">
                {searched ? 
                    <div>
                        <ExcelReportComponent sessions={sessions} isInterval={true} dateSet={dateSet} player={sessions[0]?.name} ></ExcelReportComponent>
                        {insertTables(dateSet, sessions)}
                    </div> : <p>Al realizar una búsqueda se mostrarán aquí los datos</p>
                }
                {(sessions.length == 0) && searched && <p className="w-auto m-auto">No hay datos coincidentes con la búsqueda establecida</p>}

            </div>
        </div>
    );
    
};

function insertTables(dateSet, sessions) {
    return dateSet.map((e, i) => {
        return(
            <div key={i} className="row">
                <TableSessionComponent 
                    idTable={e}
                    type="allSessions"
                    data={sessions?.filter(session => session.date == e)} 
                    personalizedCaption={e}>
                </TableSessionComponent>
            </div>
        );
    })
}