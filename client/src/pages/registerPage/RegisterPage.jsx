import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { addUser } from "../../services/users.services";

export function RegisterPage() {

    const { register, handleSubmit, formState:{errors} } = useForm();
    const navigate = useNavigate();

    const SignUp = handleSubmit(async data => {
        try {
            console.log(data.userName);
            const res = await addUser(data)
            toast.success(`Creado exitosamente\n${res.data.userName}`)
            
            navigate("/players")
        } catch (error) {
            toast.error('No se ha podido registrar el usuario');
        }
         
    });
    
    return(
        <div className="container p-2">
            <h2>Crear usuario</h2>

            <form className="d-grid gap-2 col-6 m-auto" onSubmit={SignUp}>
                <div className="card gap-2 p-2 ">
                    <div className="form-group row">
                        <label className="col-3 col-form-label">Usuario:</label>
                        <div className="col-8">
                            <input
                                type="text"
                                placeholder="Nombre de usuario"
                                className="form-control"
                                {...register('userName', { required: true })}
                            />
                            {errors.userName && <span className="text-danger">Campo requerido</span>}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-3 col-form-label">Contraseña:</label>
                        <div className="col-8">
                            <input
                                type="password"
                                placeholder="Contraseña"
                                className="form-control"
                                {...register('password', { required: true })}
                            />
                            {errors.password && <span className="text-danger">Campo requerido</span>}
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary " type="submit">Crear</button>
                    </div>
                </div>
            </form>
        </div>
    );
}