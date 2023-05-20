import { useNavigate } from "react-router-dom";
import './tableComponent.css'

export function TableComponent({data}) {

    const navigate = useNavigate()
    const clicked = (id) => {
        console.log(`player clicked id: ${id}`)
        navigate(`/players/${id}`)
    }
    
    return (
        <div>
            <table className="table table-hover border table-borderless">
                <caption>Jugadores reserva</caption>
                <thead className="bg-light ">
                    <tr>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Posición</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {data.map((element) => {
                        return (
                            <tr className="tableRow" onClick={ () => clicked(element.id) } key={element.id}>
                                <td>{element.name}</td>
                                <td>{element.birth}</td>
                                <td>{element.position}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}