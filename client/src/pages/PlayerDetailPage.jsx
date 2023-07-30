import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { getPlayerById, deletePlayer, updatePlayer, getSessionsByPlayer, getFilesByIds } from "../services/players.services";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { positions } from "../models/Organisation";
import images from "../assets/images";
import { calculateAge } from "../utils/CalculateAge";
import { TableComponent } from "../components/tableComponent/TableComponent";



export function PlayerDetailPage() {

    const { id } = useParams()
    const navigate = useNavigate()
    const [error, setError] = useState("") //not in use

    const [player, setPlayer] = useState([])
    const [age, setAge] = useState('0') //player age obtained from calculate function
    const [positionImage, setPositionImage] = useState(images.FIELD)
    const [sessionsByPlayerId, setSessionsByPlayerId] = useState([]);
    const [filesIdList, setFilesIdList] = useState([]);
    const [filesWithPlayer, setFilesWithPlayer] = useState([]);


    const [isEditing, setIsEditing] = useState(false) //comprobe if is editing the player

    //select options
    const options = [positions.GOALKEEPER, positions.DEFENDER, positions.MIDFIELD, positions.FORWARD];
    const onOptionChangeHandler = (event) => {
        console.log("User Selected Value - ", event.target.value)
        setPositionImage(getPositionImage(event.target.value))
    }

    const { register, handleSubmit, formState:{errors}, setValue } = useForm()
    //call handleSubmit of the useForm(), data is a JSON of all fields of form
    const update = handleSubmit(async data => {
        try {
            const res = await updatePlayer(id, data) //Not works properly, not update id, it creates a new player with diff id
            setPlayer(data)
            toast.success(`Actualizado exitosamente\n${res.data.name}`)
        } catch (error) {
            toast.error(`Error al actualizar el jugador\n${res.data.name}`)
        }
        
   })

   const clickedFile = (item) => {
    console.log('Hiciste clic en el elemento:', item.name, 'desde el lugar B');
  };


    function getPositionImage(position) {

        switch (position) {
            case 'ARQUERO':
                return images.GOALKEEPER
            case 'DEFENSOR':
                return images.DEFENDER
            case 'CENTROCAMPISTA':
                return images.MIDFIELD
            case 'DELANTERO':
                return images.FORWARD
            default:
                return images.FIELD
                
        }
    }
    const normalizedName = (name) => name.replace(/\s/g, "").toLowerCase();
    

    //Change value of id
    useEffect( () => {
        async function getPlayer() {
            try {
                const res = await getPlayerById(id)
                setPlayer(res.data)
                //TODO if not update after a change in input, its load the value
                //changed on input
                setValue('id', res.data.id) 
                setValue('name', res.data.name) 
                setValue('birth', res.data.birth) 
                setValue('position', res.data.position)
                setAge(calculateAge(res.data.birth)  )
                
            } catch (error) {
                setError(error.response.status)
                toast.error('Error al cargar datos del jugador')
            }
        }

        getPlayer(); //call above declared function to get player when id(obtained from params) changes

    }, [id] )
    //Change value of player
    useEffect(() => {
        async function getPlayerSessions(id) {
            const res = await getSessionsByPlayer(id);
            setSessionsByPlayerId(res.data);
        }

        setAge(calculateAge(player.birth));
        setPositionImage(getPositionImage(player.position));
        if (player.name == undefined) return; //to avoid keys and avoid error of undefined name
        getPlayerSessions(player.id); //execute the async function
        
      }, [player]);
      //Change value of sessions of the player
      useEffect(() => {
        function getPlayerFiles(sessions) {

            let filesId = [];
            sessions.forEach(session => filesId.push(session.idFile));
            setFilesIdList(new Set(filesId));

        }
        getPlayerFiles(sessionsByPlayerId)
      }, [sessionsByPlayerId])
    //change value of id list files with player session
    useEffect(() => {
        async function getFiles(idList) {
            const idString = Array.from(idList).join(); //set to array, and after to string
            const res = await getFilesByIds(idString);
            setFilesWithPlayer(res.data);
        }

        getFiles(filesIdList) 

    }, [filesIdList])

    return(
        <div className="container p-3">
            <h2>{player.name}</h2>
            
            <div className="d-flex gap-3 flex-column">

                <div className="row">
                    <form className="d-grid gap-2 col-6" onSubmit={update}>
                        <div className="card gap-2 p-2 bg-light">
                            <div className="form-group row">
                                <label className="col-3 col-form-label">Id:</label>
                                <div className="col-8">
                                    <input
                                        type="text"
                                        placeholder="Id"
                                        className="form-control"
                                        readOnly={!isEditing}
                                        {...register('id', { required: true })}
                                    />
                                    {errors.id && <span className="text-danger" >Campo requerido</span>}
                                </div>

                            </div>

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
                                    <select 
                                        className="form-select" 
                                        /* onChange={onOptionChangeHandler} */
                                        disabled={!isEditing}
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
                    <div className="col-3 d-flex justify-content-center">
                        <img className="w-50" src={positionImage} alt="positionImage" />
                    </div>
                    <div className="col-3 d-flex justify-content-center">
                        <div className="card col-6 h-50">
                            <img className="w-100 h-100" src={images.PROFILE} alt="profile" />
                        </div>
                    </div>
                </div>

                {/* Edit and Delete buttons */}            
                <div className="d-flex justify-content-start gap-2 col-6">
                    <button
                        className="btn btn-secondary"
                        onClick={ () => {
                            setIsEditing(!isEditing)
                        } }>Editar
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={ async () => {
                            const accepted = window.confirm('Se eliminarán todos los registros del jugador.\nEstá seguro?')
                            if (accepted) {
                                await deletePlayer(id)
                                navigate('/players/')
                            }
                        } }>Eliminar jugador
                    </button>
                </div>

            </div>
            {/* <h2>Sesiones del jugador</h2>
            <div>
                <TableComponent data={sessionsByPlayerId} type={'sessions'} ></TableComponent>
            </div> */}
            <h2 className="mt-4">Ficheros del jugador</h2>
            <div >
                <TableComponent data={filesWithPlayer} type={'files'} idPlayer={id}></TableComponent>
            </div>
        </div>
    )
}