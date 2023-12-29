import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { loginUser } from "../../services/auth.services";
import { useEffect, useState } from "react";
import { User } from "../../models/User";

export function LoginPage() {

    const { register, handleSubmit, formState:{errors} } = useForm();
    const navigate = useNavigate();
    const [activeUser, setActiveUser] = useState(null);

    //at call of login delete local storage to delete token and user
    useEffect(() => {

        function clearLocalStorage() {
            localStorage.clear();
        }

        clearLocalStorage();
        setActiveUser(null);
    
      }, []);

    useEffect(() => {

        if (activeUser) {
            localStorage.setItem("activeUser", JSON.stringify(activeUser));
            localStorage.setItem('team', 'u19'); //set u19 by default
            toast.success(`Logueado exitosamente\n${activeUser.name}`)
            navigate("/players")
        }

    }, [activeUser]);

    const logIn = handleSubmit(async data => {
        try {
            const res = await loginUser(data)

            //save in local storage the output from loginuser
            localStorage.setItem("auth", res.data.access);
            localStorage.setItem("refreshAuth", res.data.refresh);

            //create user
            setActiveUser(new User(res.data.username, res.data.isStaff, res.data.isSuperuser));
            
        } catch (error) {
            toast.error('No se ha podido iniciar sesión');
        }
         
    });
    
    return(
        <div className="container p-2">
            <h2>Iniciar sesión</h2>

            <form className="d-grid gap-2 col-6 m-auto" onSubmit={logIn}>
                <div className="card gap-2 p-2 ">
                    {
                        //user input
                    }
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
                    {
                        //password input
                    }
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
                        <button className="btn btn-primary " type="submit">Ingresar</button>
                    </div>
                </div>
            </form>

        </div>
    );
}