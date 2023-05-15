import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { getPlayerById, deletePlayer, updatePlayer } from "../services/players.services";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
//import { NotFoundPage } from "./NotFoundPage";


export function PlayerDetailPage() {
    const [player, setPlayer] = useState([])
    const { id } = useParams()
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const [isEditing, setIsEditing] = useState(false)
    const { register, handleSubmit, formState:{errors}, setValue } = useForm()
    const update = handleSubmit(async data => {
        try {
            const res = await updatePlayer(id, data)
            toast.success(`Actualizado exitosamente\n${res.data.name}`)
        } catch (error) {
            toast.error(`Error al actualizar el jugador\n${res.data.name}`)
        }
        
   })

    useEffect( () => {
        async function getPlayer() {
            try {
                const res = await getPlayerById(id)
                setPlayer(res.data)
                //TODO if not update after a change in input, its load the value
                //changed on input
                setValue('name', res.data.name) 
                setValue('birth', res.data.birth) 
                setValue('position', res.data.position) 
            } catch (error) {
                setError(error.response.status)
                toast.error('Error al cargar datos del jugador')
            }
        }
        getPlayer()
    }, [id] )

    return(
        <div>
            <div>

                <form onSubmit={update}>
                    <input
                        type="text"
                        placeholder="Nombre"
                        readOnly={!isEditing}
                        {...register('name', { required: true })}
                    />
                    {errors.name && <span>Campo requerido</span>}

                    <input
                        type="date"
                        placeholder="Fecha nacimiento"
                        readOnly={!isEditing}
                        {...register('birth', { required: true })}
                    />
                    {errors.birth && <span>Campo requerido</span>}

                    <input
                        type="text"
                        placeholder="Posición"
                        readOnly={!isEditing}
                        {...register('position', { required: true })}
                    />
                    {errors.position && <span>Campo requerido</span>}

                    {isEditing && ( <button type="submit">Guardar</button> ) }
                    

                </form>

                <button 
                    onClick={ () => {
                        setIsEditing(!isEditing)
                    } }>Editar
                </button>

                <button 
                    onClick={ async () => {
                        const accepted = window.confirm('Se eliminarán todos los registros del jugador.\n Está seguro?')
                        if (accepted) {
                            await deletePlayer(id)
                            navigate('/players/')
                        }
                    } }>Eliminar jugador
                </button>

            </div>
        </div>
    )
}