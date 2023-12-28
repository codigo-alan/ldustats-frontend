import { useForm } from "react-hook-form";
import { addPlayer } from "../../services/players.services";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { positions, teams } from "../../models/Organisation";

export function AddPlayerPage() {

    const { register, handleSubmit, formState:{errors} } = useForm()
    const navigate = useNavigate()

    const options = [positions.GOALKEEPER, positions.DEFENDER, positions.MIDFIELD, positions.FORWARD];
    const teamOptions = [teams.u19, teams.u16, teams.u15, teams.u14];
    const save = handleSubmit(async data => {
        try {
            data.team = data.team.toLowerCase(); //convert team to lower case
            const res = await addPlayer(data);
            toast.success(`Agregado exitosamente\n${res.data.name}`)
            navigate("/players/" + res.data.id)
        } catch (error) {
            toast.error('Error al crear el jugador')
        }
         
    })

    return (
        <div className="container p-2">
            <h2>Agregar jugador</h2>

            <form className="d-grid gap-2 col-6 m-auto" onSubmit={save}>
                <div className="card gap-2 p-2 bg-light">
                    <div className="form-group row">
                        <label className="col-3 col-form-label">Ref *:</label>
                        <div className="col-8">
                            <input
                                type="text"
                                placeholder="Referencia"
                                className="form-control"
                                {...register('ref', { required: true })}
                            />
                            {errors.id && <span className="text-danger">Campo requerido</span>}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-3 col-form-label">Nombre *:</label>
                        <div className="col-8">
                            <input
                                type="text"
                                placeholder="Nombre"
                                className="form-control"
                                {...register('name', { required: true })}
                            />
                            {errors.name && <span className="text-danger">Campo requerido</span>}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-3 col-form-label">Nacimiento *:</label>
                        <div className="col-8">
                            <input
                                type="date"
                                placeholder="Fecha nacimiento"
                                className="form-control"
                                {...register('birth', { required: true })}
                            />
                            {errors.birth && <span className="text-danger">Campo requerido</span>}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-3 col-form-label">Posición:</label>
                        <div className="col-8">
                            <select
                                className="form-select"
                                placeholder="Posición"
                                {...register('position', { required: true })}
                            >
                                {options.map((option, index) => {
                                    return <option key={index} >
                                        {option}
                                    </option>
                                })}
                            </select>
                            {errors.position && <span className="text-danger" >Campo requerido</span>}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-3 col-form-label">Equipo:</label>
                        <div className="col-8">
                            <select
                                className="form-select"
                                placeholder="Equipo"
                                {...register('team', { required: true })}
                            >
                                {teamOptions.map((option, index) => {
                                    return <option key={index} >
                                        {option}
                                    </option>
                                })}
                            </select>
                            {errors.position && <span className="text-danger" >Campo requerido</span>}
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary" type="submit">Guardar</button>
                    </div>
                </div>
            </form>

        </div>
        

    )
}
