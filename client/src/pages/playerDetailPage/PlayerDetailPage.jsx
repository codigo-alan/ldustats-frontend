import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { getPlayerById, deletePlayer, updatePlayer, getSessionsByPlayer } from "../../services/players.services";
import { getFilesByIds } from "../../services/files.services";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { positions } from "../../models/Organisation";
import images from "../../assets/images";
import { calculateAge } from "../../utils/CalculateAge";
import { TableComponent } from "../../components/tableComponent/TableComponent";
import { SearchBarComponent } from "../../components/searchBarComponent/SearchBarComponent";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'react-tooltip';
import { HistoricalInfoPlayerComponent } from "../../components/historicalInfoPlayerComponent/HistoricalInfoPlayerComponent";


export function PlayerDetailPage() {

    const { id } = useParams()
    const navigate = useNavigate()
    const [error, setError] = useState("") //not in use

    const [player, setPlayer] = useState([])
    const [playerRef, setPlayerRef] = useState('');
    const [age, setAge] = useState('0') //player age obtained from calculate function
    const [positionImage, setPositionImage] = useState(images.FIELD)
    const [sessionsByPlayerId, setSessionsByPlayerId] = useState([]);
    const [filesIdList, setFilesIdList] = useState([]);
    const [filesWithPlayer, setFilesWithPlayer] = useState([]);
    const [isEditing, setIsEditing] = useState(false) //comprobe if is editing the player
    const [filesWithPlayerFiltered, setFilesWithPlayerFiltered] = useState([]);
    
    const handleSearch = (query) => {
        setFilesWithPlayerFiltered(filesWithPlayer.filter((e) => e.date.toLowerCase().includes(query.toLowerCase())))
    };

    //select options
    const options = [positions.GOALKEEPER, positions.DEFENDER, positions.MIDFIELD, positions.FORWARD];

    const { register, handleSubmit, formState:{errors}, setValue } = useForm()
    //call handleSubmit of the useForm(), data is a JSON of all fields of form
    const update = handleSubmit(async data => {
        try {
            const res = await updatePlayer(id, data)
            setPlayer(data)
            toast.success(`Actualizado exitosamente\n${res.data.name}`)
        } catch (error) {
            toast.error(`Error al actualizar el jugador\n${res.data.name}`)
        }
        
   })

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
    
    //Change value of id
    useEffect( () => {
        async function getPlayer() {
            try {
                const res = await getPlayerById(id);
                setPlayer(res.data)
                //TODO if not update after a change in input, its load the value
                //changed on input
                setValue('id', res.data.id) 
                setValue('ref', res.data.ref)
                setValue('name', res.data.name) 
                setValue('birth', res.data.birth) 
                setValue('position', res.data.position)
                setAge(calculateAge(res.data.birth))
                setPlayerRef(res.data.ref);
                
            } catch (error) {
                if (error.response.status == 401 || error.response.status == 403) {
                    navigate(`/login`)
                } else {
                    setError(error.response.status)
                    toast.error('Error al cargar datos del jugador')
                }
            }
        }

        getPlayer(); //call above declared function to get player when id(obtained from params) changes

    }, [id] )
    //Change value of player
    useEffect(() => {
        async function getPlayerSessions(ref) {
            const res = await getSessionsByPlayer(ref);
            setSessionsByPlayerId(res.data);
        }

        setAge(calculateAge(player.birth));
        setPositionImage(getPositionImage(player.position));
        if (player.name == undefined) return; //to avoid keys and avoid error of undefined name
        getPlayerSessions(player.ref); //execute the async function
        
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
            setFilesWithPlayerFiltered(res.data);
        }

        getFiles(filesIdList) 

    }, [filesIdList])

    return(
        <div className="container p-3">
            <div className="row col-6">
                <h2 className="col-8">{player.name}</h2>
                {/* Edit and Delete buttons */}
                <div className="d-flex justify-content-end gap-2 col-4">
                    <button
                        data-tooltip-id="button-tooltip"
                        data-tooltip-content="Editar jugador"
                        data-tooltip-place="left"
                        className="btn btn-secondary"
                        onClick={() => {
                            setIsEditing(!isEditing)
                        }}>
                        <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                    </button>
                    <button
                        data-tooltip-id="button-tooltip"
                        data-tooltip-content="Borrar jugador"
                        data-tooltip-place="right"
                        className="btn btn-danger"
                        onClick={async () => {
                            const accepted = window.confirm('Se eliminarán todos los registros del jugador.\nEstá seguro?')
                            if (accepted) {
                                await deletePlayer(id);
                                navigate('/players/')
                            }
                        }}>
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </button>
                    <Tooltip id="button-tooltip" />
                </div>
            </div>
            
            <div className="d-flex gap-3 flex-row mt-2">
                
                <form className="d-grid gap-2" onSubmit={update}>
                    <div className="row ps-2">
                        <div className="card gap-2 p-2 bg-light col-8">
                            <div className="form-group row">
                                <label className="col-2 col-form-label">Id:</label>
                                <div className="col-4">
                                    <input
                                        type="text"
                                        placeholder="Id"
                                        className="form-control"
                                        readOnly={true}
                                        {...register('id')}
                                    />
                                </div>
                                <label className="col-2 col-form-label">Ref:</label>
                                <div className="col-4">
                                    <input
                                        type="text"
                                        placeholder="Ref"
                                        className="form-control"
                                        readOnly={!isEditing}
                                        {...register('ref', { required: true })}
                                    />
                                    {errors.ref && <span className="text-danger" >Campo requerido</span>}
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
                        <div className="col-4 d-flex justify-content-center">
                            <img className="w-50" src={positionImage} alt="positionImage" />
                        </div>
                        
                    </div>
                    {isEditing && (
                        <div className="d-flex justify-content-start">
                            <button className="btn btn-primary" type="submit">Guardar cambios</button>
                        </div>
                    )}

                </form>
                
                <div className="col-3">
                    
                    <div className="d-flex gap-2 flex-column justify-content-end">
                        <div className="card col-6 h-50">
                            <img className="w-50 h-50" src={images.PROFILE} alt="profile" />
                        </div>
                        <HistoricalInfoPlayerComponent playerRef={playerRef}></HistoricalInfoPlayerComponent>
                    </div>
                </div>

            </div>
            <h2 className="mt-4">Ficheros del jugador</h2>
            <div className="my-2">
                <SearchBarComponent onSearch={handleSearch} type="files"></SearchBarComponent>
            </div>
            <div >
                <TableComponent data={filesWithPlayerFiltered} type={'files'} idPlayer={player.ref}></TableComponent>
            </div>
        </div>
    )
}
