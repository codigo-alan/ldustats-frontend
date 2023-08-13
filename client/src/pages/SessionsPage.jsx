import { useEffect, useState } from "react";
import { TableSessionComponent } from "../components/tableSessionComponent/TableSessionComponent";
import { getAllSessions } from "../services/sessions.services";
import { ConfigurationButton } from "../components/configurationButton/ConfigurationButton";

export function SessionsPage() {

    const [sessions, setSessions] = useState([]); //declare sessions
    const [selectedHeaders, setSelectedHeaders] = useState([]);

    const changeHeaders = (selected) => {
        setSelectedHeaders(selected);
      };
    /*
        get Sessions and set the value
    */
    useEffect( () => {
        async function getSessions() {
            const res = await getAllSessions();
            setSessions(res.data);
        }

        getSessions();

    }, []);

    return (
        <div className="container p-3">
            <div className="row">
                <div className="col-6">
                    <h2>Sesiones registradas</h2>
                </div>
                <div className="col-6 d-flex justify-content-end">
                    <ConfigurationButton outputHeaders={changeHeaders}></ConfigurationButton>
                </div>
            </div>
            <div className="row">
                <TableSessionComponent data={sessions} type='allSessions' headersToShow={selectedHeaders}></TableSessionComponent>
            </div>
        </div>
    );
    
};