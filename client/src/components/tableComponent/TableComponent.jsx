import { useNavigate } from "react-router-dom";
import './tableComponent.css'
import { useEffect, useState } from "react";
import { calculateAge } from "../../utils/CalculateAge";

export function TableComponent({data, type}) {

    const [caption, setCaption] = useState('');
    const [headers, setHeaders] = useState([]);

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
        }

        setCaptionValue();

    }, [type]);

    const navigate = useNavigate()
    const clicked = (id) => {
        navigate(`/players/${id}`)
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
                    {(type == 'sessions') && 
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Fecha</th>
                            <th>Distancia</th>
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
                                <td>{element.distance}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}