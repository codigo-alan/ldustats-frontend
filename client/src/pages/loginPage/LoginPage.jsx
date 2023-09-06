import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { loginUser } from "../../services/users.services";

export function LoginPage() {

    const { register, handleSubmit, formState:{errors} } = useForm();
    const navigate = useNavigate();

    const logIn = handleSubmit(async data => {
        try {
            const res = await loginUser(data)
            toast.success(`Logueado exitosamente\n${res.data.userName}`)
            navigate("/players")
        } catch (error) {
            toast.error('No se ha podido iniciar sesión');
        }
         
    });
    
    return(
        <div className="container p-2">
            <h2>Iniciar sesión</h2>

            <form className="d-grid gap-2 col-6 m-auto" onSubmit={logIn}>
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
                        <label className="col-3 col-form-label">Email:</label>
                        <div className="col-8">
                            <input
                                type="email"
                                placeholder="Email"
                                className="form-control"
                                {...register('email', { required: true })}
                            />
                            {errors.email && <span className="text-danger">Campo requerido</span>}
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
                        <button className="btn btn-primary disabled" type="submit">Ingresar</button>
                    </div>
                </div>
            </form>

            <div className="col-6 m-auto d-flex justify-content-center mt-2">
                <a className="fw-bold text-decoration-none" href="/register">
                    ¿No tienes usuario? Crea uno
                </a>
            </div>

        </div>
    );
}