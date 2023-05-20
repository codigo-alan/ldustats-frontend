import { useForm } from "react-hook-form";
import { addPlayer } from "../services/players.services";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
        <div className="container p-2">
            <h2>Agregar jugador</h2>
            <div className="d-flex justify-content-center">
                <form className="d-grid gap-2 col-6" onSubmit={save}>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            type="text"
                            placeholder="Nombre"
                            className="form-control"
                            {...register('name', { required: true })}
                        />
                        {errors.name && <span className="text-danger">Campo requerido</span>}
                    </div>
                    <div className="form-group">
                        <label >Fecha de nacimiento</label>
                        <input
                            type="date"
                            placeholder="Fecha nacimiento"
                            className="form-control"
                            {...register('birth', { required: true })}
                        />
                        {errors.birth && <span className="text-danger">Campo requerido</span>}
                    </div>
                    <div className="form-group">
                        <label >Posición</label>
                        <input
                            type="text"
                            placeholder="Posición"
                            className="form-control"
                            {...register('position', { required: true })}
                        />
                        {errors.position && <span className="text-danger">Campo requerido</span>}
                    </div>
                    <div className="d-flex justify-content-end">
                        <button  className="btn btn-primary" type="submit">Guardar</button>
                    </div>
                </form>
            </div>
            {/* <Form onSubmit={save}>
                <Form.Group className="mb-3" >
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Ingresa nombre" />
                    <Form.Text className="text-muted" {...register('name', { required: true })} >
                        Este campo es requerido.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Nacimiento</Form.Label>
                    <Form.Control type="date" placeholder="Fecha nacimiento" />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Posición</Form.Label>
                    <Form.Control type="text" placeholder="Ingresa posición" />
                    <Form.Text className="text-muted" {...register('name', { required: true })} >
                        Este campo es requerido.
                    </Form.Text>
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form> */}
        </div>
        

    )
}