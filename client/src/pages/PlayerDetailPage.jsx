import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { getPlayerById, deletePlayer, updatePlayer } from "../services/players.services";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
//import { NotFoundPage } from "./NotFoundPage";
import images from "../assets/images";


export function PlayerDetailPage() {

    const [player, setPlayer] = useState([])
    const [age, setAge] = useState('0')
    const { id } = useParams()
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const [isEditing, setIsEditing] = useState(false)
    const { register, handleSubmit, formState:{errors}, setValue } = useForm()
    const update = handleSubmit(async data => {
        try {
            const res = await updatePlayer(id, data)
            setPlayer(data)
            toast.success(`Actualizado exitosamente\n${res.data.name}`)
        } catch (error) {
            toast.error(`Error al actualizar el jugador\n${res.data.name}`)
        }
        
   })

    function calculateAge(birth) {
        const difference = new Date() - (new Date(birth))
        const calculatedAge = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25))
        return `${calculatedAge}`
    }

    //Change value of id
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
                setAge(calculateAge(res.data.birth)  )
                
            } catch (error) {
                setError(error.response.status)
                toast.error('Error al cargar datos del jugador')
            }
        }

        /* function calculateAge(birth) {
            const difference = new Date() - (new Date(birth))
            const calculatedAge = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25))
            return calculatedAge
        } */

        getPlayer()

    }, [id] )
    //Change value of player
    useEffect(() => {
        setAge(calculateAge(player.birth))
      }, [player]);
    

    return(
        <div className="container p-2">
            <h2>{player.name}</h2>
            <div><img src={images.GOALKEEPER} alt="goalkeeper" /></div>
            <div className="d-flex gap-3 flex-column">

                <form className="d-grid gap-2 col-6 mx-auto" onSubmit={update}>
                    <div className="card gap-2 p-2 bg-light">
                        <div className="form-group row">
                            <label className="col-3 col-form-label">Nombre:</label>
                            <div className="col-8">
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    className="form-control"
                                    readOnly={!isEditing}
                                    {...register('name', { required: true })}
                                />
                                {errors.name && <span className="text-danger" >Campo requerido</span>}
                            </div>
                            
                        </div>
                        
                        <div className="form-group row">
                            <label className="col-3 col-form-label">Posición:</label>
                            <div className="col-8">
                                <input
                                    type="text"
                                    placeholder="Posición"
                                    className="form-control"
                                    readOnly={!isEditing}
                                    {...register('position', { required: true })}
                                />
                                {errors.position && <span className="text-danger" >Campo requerido</span>}
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-3 col-form-label">Edad:</label>
                            <div className="col-8">
                                <input
                                    type="text"
                                    placeholder="Edad"
                                    className="form-control"
                                    readOnly={true}
                                    value={age}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-3 col-form-label">Nacimiento:</label>
                            <div className="col-8">
                                <input
                                    type="date"
                                    placeholder="Fecha nacimiento"
                                    className="form-control"
                                    readOnly={!isEditing}
                                    {...register('birth', { required: true })}
                                />
                                {errors.birth && <span className="text-danger" >Campo requerido</span>}
                            </div>
                        </div>
                    </div>

                    {isEditing && (
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary" type="submit">Guardar cambios</button>
                    </div>
                    )}
                    

                </form>

                <div className="d-flex justify-content-end gap-2 col-6 mx-auto">
                    <button
                        className="btn btn-secondary"
                        onClick={ () => {
                            setIsEditing(!isEditing)
                        } }>Editar
                    </button>
                    <button
                        className="btn btn-danger"
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
        </div>
    )
}