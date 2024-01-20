import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { addUser } from "../../services/users.services";
import { showErrors } from "../../utils/ToastData";

export function RegisterPage() {

    const { register, handleSubmit, formState:{errors} } = useForm();
    const navigate = useNavigate();

    const SignUp = handleSubmit(async data => {
        try {
            const res = await addUser(data)
            toast.success(`Creado exitosamente\n${res.data.user}`)
            navigate("/players")
        } catch (error) {

            if (error.response.status == 400) {

                toast.error(`No se ha podido registrar el usuario.\n 
                ${showErrors(error.response.data.errors)}`);

            } else {
                toast.error(`No se ha podido registrar el usuario.\n ${error}`);
            }
        }
         
    });
    
    return(
        <div className="container p-2">
            <h2>Crear usuario</h2>

            <form className="d-grid gap-2 col-6 m-auto" onSubmit={SignUp}>
                <div className="card gap-2 p-2 ">
                    {/* User name */}
                    <div className="form-group row">
                        <label className="col-3 col-form-label">Usuario:</label>
                        <div className="col-8">
                            <input
                                type="text"
                                placeholder="Nombre de usuario"
                                className="form-control"
                                {...register('username', { required: true })}
                            />
                            {errors.username && <span className="text-danger">Campo requerido</span>}
                        </div>
                    </div>
                    {/* Password */}
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
                    {/* Is staff check */}
                    <div className="form-group row">
                        <label className="col-auto col-form-label">Staff:</label>
                        <div className="col-auto d-flex justify-content-start">
                            <input
                                type="checkbox"
                                className="col-auto"
                                defaultChecked={false}
                                {...register('isStaff', { required: false })}
                            />
                        </div>
                    </div>
                    {/* Submit button */}
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary " type="submit">Crear</button>
                    </div>
                </div>
            </form>
        </div>
    );
}