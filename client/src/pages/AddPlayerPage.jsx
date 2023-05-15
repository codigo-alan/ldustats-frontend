import { useForm } from "react-hook-form";
import { addPlayer } from "../services/players.services";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function AddPlayerPage() {

    const { register, handleSubmit, formState:{errors} } = useForm()
    const navigate = useNavigate()
    const save = handleSubmit(async data => {
        try {
            const res = await addPlayer(data)
            toast.success(`Agregado exitosamente\n${res.data.name}`)
            navigate("/players/" + res.data.id)
        } catch (error) {
            toast.error('Error al crear el jugador')
        }
         
    })

    return (
        <div>
            <h2>Agregar jugador</h2>
            <form onSubmit={save}>
                <input 
                    type="text" 
                    placeholder="Nombre"
                    {...register('name', { required: true })}
                />
                {errors.name && <span>Campo requerido</span>}
                <input type="date" placeholder="Fecha nacimiento"
                    {...register('birth', { required: true })}
                />
                {errors.birth && <span>Campo requerido</span>}
                <input type="text" placeholder="Posición"
                    {...register('position', { required: true })}
                />
                {errors.position && <span>Campo requerido</span>}
                <button type="submit">Guardar</button>
            </form>
        </div>
    )
}