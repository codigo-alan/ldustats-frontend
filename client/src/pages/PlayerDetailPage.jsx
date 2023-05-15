import { useEffect, useState } from "react"
import { getPlayerById, deletePlayer } from "../services/players.services";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NotFoundPage } from "./NotFoundPage";

export function PlayerDetailPage() {
    const [player, setPlayer] = useState([])
    const { id } = useParams()
    const [error, setError] = useState("")
    const navigate = useNavigate()

    useEffect( () => {
        async function getPlayer() {
            try {
                const res = await getPlayerById(id)
                setPlayer(res.data) 
            } catch (error) {
                setError(error.response.status)
            }
        }
        getPlayer()
    }, [id] )

    //TODO need handle specific errors
    if (error != "") {
        console.log(error)
        return(
            <NotFoundPage/>
        )
    }

    return(
        <div>
            <div>
                <h2>{player.name}</h2>
                <button onClick={ async () => {
                    const accepted = window.confirm('Se eliminarán toso los registros del jugador. Está seguro?')
                    if (accepted) {
                        await deletePlayer(id)
                        navigate('/players/')
                    }
                } } >Eliminar jugador</button>
            </div>
        </div>
    )
}