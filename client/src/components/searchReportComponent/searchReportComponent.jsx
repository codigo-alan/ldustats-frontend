import { useForm } from "react-hook-form";
import { Container} from "react-bootstrap";
import { Tooltip } from 'react-tooltip';
import { getIntervalSession } from "../../services/sessions.services";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function SearchReportComponent({onSearched, wasSearched=false}) {

    const { register, handleSubmit, formState:{errors} } = useForm();
    const navigate = useNavigate();


    const search = handleSubmit(async data => {

        if (new Date(data.startDate) < new Date(data.endDate)) {
            try {
                const res = await getIntervalSession(data);
                onSearched(res.data); //output to the parent
                wasSearched(true); //indicates that was a search
            } catch (error) {
                onSearched([]);
                (error.response.status == 401 
                    || error.response.status == 403) 
                    ? navigate(`/login`) 
                        : toast.error('Error al buscar reporte');//if unauthorized or without credentials 
            }
        } else {
            toast.error('La fecha de inicio debe ser menor a la fecha de fin');
        }
         
    })
    
    return(
        <Container className="ps-0">

            <form className="row" onSubmit={search}>
                <div className="col-3">
                    <input 
                        data-tooltip-id="form-tooltip"
                        data-tooltip-content="Nombre"
                        data-tooltip-place="top"
                        type="text" 
                        placeholder="Nombre de jugador"
                        className="form-control"
                        {...register('name', { required: true })}/>
                        {errors.id && <span className="text-danger">Campo requerido</span>}
                </div>
                <div className="col-3">
                    <input 
                        data-tooltip-id="form-tooltip"
                        data-tooltip-content="Fecha inicial"
                        data-tooltip-place="top"
                        type="date" 
                        placeholder="Fecha inicial"
                        className="form-control"
                        {...register('startDate', { required: true })}/>
                        {errors.id && <span className="text-danger">Campo requerido</span>}
                </div>
                <div className="col-3">
                    <input 
                        data-tooltip-id="form-tooltip"
                        data-tooltip-content="Fecha final"
                        data-tooltip-place="top"
                        type="date" 
                        placeholder="Fecha final"
                        className="form-control"
                        {...register('endDate', { required: true })}/>
                        {errors.id && <span className="text-danger">Campo requerido</span>}
                </div>
                <div className="col-3 d-flex justify-content-end">
                    <button
                        type="submit"
                        className="btn btn-primary">
                        Buscar datos
                    </button>
                </div>
                <Tooltip id="form-tooltip" />
            </form>

            <hr />

        </Container>
    );
}