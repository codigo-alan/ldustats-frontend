import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Papa from "papaparse";
import { addFile } from "../../services/files.services";
import { addSession } from "../../services/sessions.services";
import { File, FileWithId } from "../../models/File";
import { Session } from "../../models/Session";
import { calculateByTime, convertTimeToMinutes } from "../../utils/CalculateCompleteSession";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "../../utils/DateFormat";
import { Tooltip } from 'react-tooltip';


export function FileSelectorComponent({addedFile}) {
    const [jsonData, setJsonData] = useState(null);
    const [date, setDate] = useState(null);
    const [createdId, setCreatedId] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [fileWithId, setFileWithId] = useState(null);

    function obtainOneDate(result) {
        return (result != undefined && result.length != 0 && result[0]['Session Date'] != undefined) ?
            format(result[0]['Session Date']) : null;
    }

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const csv = e.target.result;
            Papa.parse(csv, {
                header: true,
                complete: (results) => {
                    setJsonData(JSON.stringify(results.data)); // obtain data from csv
                    setDate(obtainOneDate(results.data)); // one date from csv -> convert to specific Date format
                }
            });
        }
        reader.readAsText(selectedFile);
    };

    const save = handleSubmit(() => {
        addModifiedFile(new File(date)); //add file to backend with formated date
    });

    async function addModifiedFile(newFile) {
        const res = await addFile(newFile);
        const idFromResponse = JSON.parse(res.request.response).id; // obtain the created id from the http response
        const dateFromResponse = JSON.parse(res.request.response).date; //obtain the date in the same format of db
        setCreatedId(idFromResponse); 
        setFileWithId(new FileWithId(idFromResponse, dateFromResponse));
    }

    // execute when createdId of http response file changes
    useEffect(() => {

        if (createdId != null) {
            const sessions = JSON.parse(jsonData);
            var errors = 0;
            sessions.forEach(async element => {
                element['Session Date'] = format(element['Session Date']);
                const timeMinutes = convertTimeToMinutes(element['Total Time']);
                const accByMin = calculateByTime(element['Accelerations'], timeMinutes);
                const decByMin = calculateByTime(element['Decelerations'], timeMinutes);
                const session = new Session(
                    element['Player Display Name'], element['Session Date'], element['Drill Title'],
                    element['Total Time'], element['Distance Total'], element['Distance Per Min'],
                    element['Distance Zone 4 (Absolute)'], element['Distance Zone 5 (Absolute)'],
                    element['Distance Zone 6 (Absolute)'], element['High Speed Running (Absolute)'],
                    element['HSR Per Minute (Absolute)'], element['Max Speed'], element['Sprints'],
                    element['Sprint Distance'], element['Accelerations'], element['Decelerations'],
                    accByMin, decByMin, element['HML Distance'], element['idPlayer'], createdId);

                try {
                    await addSession(session);
                } catch (error) {
                    toast.error(`Error al cargar la sesión de ${session.name}`);
                    errors += 1;
                }
            });
            if (errors == 0) {
                toast.success(`Se ha cargado el archivo sin errores`);
                //console.log(sessions);
            } else {
                toast(`Se ha cargado el archivo con ${errors} errores.`);
            }
            addedFile(fileWithId); //the output with the new file
        }

    }, [createdId]);

    return (
        <form onSubmit={save}>
            <div className="d-flex gap-1">
                <input className="form-control" type="file" onChange={handleFileChange} />
                {jsonData != null && date != null && 
                    <button 
                        className="btn btn-primary" type="submit"
                        data-tooltip-id="form-tooltip"
                        data-tooltip-content="Guardar archivo seleccionado"
                        data-tooltip-place="top">
                            <FontAwesomeIcon icon={faCheck} />
                    </button>}
                {jsonData != null && date == null && <span className="text-danger col-auto" >Fecha erronea</span>}
            </div>
            <Tooltip id="form-tooltip" />
        </form>
    );

}