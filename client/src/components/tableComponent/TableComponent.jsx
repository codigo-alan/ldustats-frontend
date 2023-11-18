import { useNavigate } from "react-router-dom";
import './tableComponent.css'
import { useEffect, useState } from "react";
import { calculateAge } from "../../utils/CalculateAge";
import toast from "react-hot-toast";
import { Tooltip } from 'react-tooltip';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteFile } from "../../services/files.services";

export function TableComponent({data, type, idPlayer}) {

    const [caption, setCaption] = useState('');

    /*
      This function is executed each time
      that the component is called
    */
    useEffect(() => {

        function setCaptionValue() {
            if (type == 'sessions') {
                setCaption('Sesiones');
            }
            if (type == 'players') {
                setCaption('Jugadores Reserva');
            }
            if (type == 'files') {
                setCaption('Ficheros');
            }
        }

        setCaptionValue();

    }, [type]);

    const navigate = useNavigate()
    const clicked = (id) => {
        navigate(`/players/${id}`)
    };
    const fileClicked = (id) => {
        if (idPlayer == undefined) {
            navigate(`/files/${id}`)
        }else {
            navigate(`/files/${id}/${idPlayer}`)
        } 
        
    };
    const windowRemoveFile = async (id) => {
        const accepted = window.confirm(`Desea eliminar el archivo ${id} y todas sus sesiones?`);
        if (accepted) {
            try {
                await deleteFile(id);
                toast.success(`Eliminado el archivo ${id}`);
            } catch (error) {
                toast.error("Hubo un error al eliminar el archivo");
            }
            
        }
        
    };

    const getAge = (birth) => {
        return(calculateAge(birth));
    }
    
    return (
        <div>
            <table className="table table-hover border table-borderless">
                <caption>{caption}</caption>
                <thead className="bg-light ">
                    {(type == 'players') && 
                        <tr>
                            <th>Nombre</th>
                            <th>Edad</th>
                            <th>Posición</th>
                        </tr> 
                    }
                    {(type == 'files') && 
                        <tr>
                            <th>Id</th>
                            <th>Fecha</th>
                        </tr> 
                    }
                </thead>
                <tbody>
                    
                    {(type == 'players') && data.map((element) => {
                        return (
                            <tr className="tableRow" onClick={ () => clicked(element.id) } key={element.id}>
                                <td>{element.name}</td>
                                <td>{getAge(element.birth)}</td>
                                <td>{element.position}</td>
                            </tr>
                        )
                    })}
                    {(type == 'sessions') && data.map((element) => {
                        return (
                            <tr className="tableRow" key={element.id} >
                                <td>{element.id}</td>
                                <td>{element.name}</td>
                                <td>{element.date}</td>
                                <td>{element.totalDistance}</td>
                                <td>{element.idPlayer}</td>
                                <td>{element.idFile}</td>
                            </tr>
                        )
                    })}
                    {(type == 'files') && data.map((element) => {
                        return (
                            <tr className="" key={element.id} >
                                <td>
                                    <a className="clickableId text-decoration-none" onClick={ () => fileClicked(element.id) } >{element.id}</a>
                                </td>
                                <td  >{element.date}</td>
                                {(idPlayer == undefined) ?
                                    (<td className="d-flex justify-content-end">
                                        <button
                                            className="btn btn-danger"
                                            data-tooltip-id="info-tooltip"
                                            data-tooltip-content="Eliminar archivo"
                                            data-tooltip-place="left"
                                            onClick={() => windowRemoveFile(element.id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>) : (<></>)}
                                
                                <Tooltip id="info-tooltip" />
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}