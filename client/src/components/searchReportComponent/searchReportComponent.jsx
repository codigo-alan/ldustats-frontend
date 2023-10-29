import { useEffect, useState } from "react";
import { Container} from "react-bootstrap";
import { Tooltip } from 'react-tooltip';

export function SearchReportComponent({onSearch}) {
    const [query, setQuery] = useState('');

    const handleInputChange = (event) => {
        setQuery(event.target.value);
        onSearch(event.target.value);
    };

    const search = () => {
        console.log("Searching");
    }
    
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
                        className="form-control"/>
                </div>
                <div className="col-3">
                    <input 
                        data-tooltip-id="form-tooltip"
                        data-tooltip-content="Fecha inicial"
                        data-tooltip-place="top"
                        type="date" 
                        placeholder="Fecha inicial"
                        className="form-control"/>
                </div>
                <div className="col-3">
                    <input 
                        data-tooltip-id="form-tooltip"
                        data-tooltip-content="Fecha final"
                        data-tooltip-place="top"
                        type="date" 
                        placeholder="Fecha final"
                        className="form-control"/>
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