import { useNavigate } from "react-router-dom";

export function TableComponent({data}) {

    const navigate = useNavigate()
    const clicked = (id) => {
        console.log(`player clicked id: ${id}`)
        navigate(`/players/${id}`)
    }
    
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Posición</th>
                    </tr>
                    {data.map((element) => {
                        return (
                            <tr onClick={ () => clicked(element.id) } key={element.id}>
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