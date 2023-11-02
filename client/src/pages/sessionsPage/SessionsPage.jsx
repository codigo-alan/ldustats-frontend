import { useEffect, useState } from "react";
import { TableSessionComponent } from "../../components/tableSessionComponent/TableSessionComponent";
import { useNavigate } from "react-router-dom";
import { SearchReportComponent } from "../../components/searchReportComponent/searchReportComponent";

export function SessionsPage() {

    const [sessions, setSessions] = useState([]); //declare sessions
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [searched, setSearched] = useState(false); //declare sessions

    useEffect( () => {

        function getUserName() {
            const activeUser = JSON.parse(localStorage.getItem('activeUser'));
            setUser(activeUser);
        }

        localStorage.getItem('activeUser') ? getUserName() : navigate(`/login`);

    }, [] );

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
                        <TableSessionComponent 
                            data={sessions} 
                            type='allSessions'>
                        </TableSessionComponent> : <p>Al realizar una búsqueda visualizará aquí los datos</p>}
            </div>
        </div>
    );
    
};