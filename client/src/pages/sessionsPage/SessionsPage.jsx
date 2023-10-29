import { useEffect, useState } from "react";
import { TableSessionComponent } from "../../components/tableSessionComponent/TableSessionComponent";
import { getAllSessions } from "../../services/sessions.services";
import { useNavigate } from "react-router-dom";
import { SearchReportComponent } from "../../components/searchReportComponent/searchReportComponent";

export function SessionsPage() {

    const [sessions, setSessions] = useState([]); //declare sessions
    const navigate = useNavigate();

    /*
        get Sessions and set the value
    */
    useEffect( () => {
        async function getSessions() {
            try {
                const res = await getAllSessions();
                setSessions(res.data);
            } catch (error) {
                if(error.response.status == 401 || error.response.status == 403) { //if unauthorized or without credentials
                    navigate(`/login`)
                }
                
            }
        }

        getSessions();

    }, []);

    return (
        <div className="container p-3">
            <div>
                <h2 className="mb-3">Reportes de intervalos</h2>
            </div>
            
            <SearchReportComponent></SearchReportComponent>
            {/* <form className="d-grid gap-2 col-6 m-auto" onSubmit={save}>
                <div className="card gap-2 p-2 bg-light">
                    <div className="form-group row">
                        <label className="col-3 col-form-label">Ref *:</label>
                        <div className="col-8">
                            <input
                                type="text"
                                placeholder="Referencia"
                                className="form-control"
                                {...register('ref', { required: true })}
                            />
                            {errors.id && <span className="text-danger">Campo requerido</span>}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-3 col-form-label">Nombre *:</label>
                        <div className="col-8">
                            <input
                                type="text"
                                placeholder="Nombre"
                                className="form-control"
                                {...register('name', { required: true })}
                            />
                            {errors.name && <span className="text-danger">Campo requerido</span>}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-3 col-form-label">Nacimiento *:</label>
                        <div className="col-8">
                            <input
                                type="date"
                                placeholder="Fecha nacimiento"
                                className="form-control"
                                {...register('birth', { required: true })}
                            />
                            {errors.birth && <span className="text-danger">Campo requerido</span>}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-3 col-form-label">Posición:</label>
                        <div className="col-8">
                            <select
                                className="form-select"
                                placeholder="Posición"
                                {...register('position', { required: true })}
                            >
                                {options.map((option, index) => {
                                    return <option key={index} >
                                        {option}
                                    </option>
                                })}
                            </select>
                            {errors.position && <span className="text-danger" >Campo requerido</span>}
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary" type="submit">Guardar</button>
                    </div>
                </div>
            </form> */}
            <div className="row">
                <TableSessionComponent data={sessions} type='allSessions'></TableSessionComponent>
            </div>
        </div>
    );
    
};