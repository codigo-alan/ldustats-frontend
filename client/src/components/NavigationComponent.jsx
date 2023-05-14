
import { Link } from "react-router-dom";

export function NavigationComponent() {

    return (
        <div>
            <ul> 
                <li>
                    <Link to='/players'>Jugadores</Link>
                </li>
                <li>
                    <Link to='player-add'>Agregar jugador</Link>
                </li>
            </ul>
        </div>
    )

    
}