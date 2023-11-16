import { useNavigate } from "react-router-dom";
import './tableComponent.css'
import { useEffect, useState } from "react";
import { calculateAge } from "../../utils/CalculateAge";

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

    const getAge = (birth) => {
        return(calculateAge(birth));
    }
    
    return (
        <div className="parentTableDiv">
            <table className="table table-hover border table-borderless">
                <caption>{caption}</caption>
                <thead className="bg-light position-sticky top-0">
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
                            <tr className="tableRow" onClick={ () => fileClicked(element.id) } key={element.id} >
                                <td>{element.id}</td>
                                <td>{element.date}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}