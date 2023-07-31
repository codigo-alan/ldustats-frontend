import { TableComponent } from "../components/tableComponent/TableComponent";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { getAllPlayers, addSession, addFile } from "../services/players.services";
import { toast } from "react-hot-toast";
import Papa from "papaparse";
import { format } from "../utils/DateFormat";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faCross } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { File } from "../models/File";
import { Session } from "../models/Session";
import { calculateByTime, convertTimeToMinutes } from "../utils/CalculateCompleteSession";

library.add(faCheck, faCross);

export function PlayersPage() {

  const [players, setPlayers] = useState([]) //properly way to use a variable in react
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [date, setDate] = useState(null);
  const [createdId, setCreatedId] = useState(null);
  const { register, handleSubmit, formState:{errors} } = useForm()

  function obtainOneDate(result) {
    if (result != undefined && result.length != 0) {
      return format(new Date(result[0]['Session Date']));
    }
    else return null;
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
    setCreatedId(JSON.parse(res.request.response).id);// obtain the created id from the http response
  }

  /*
      This function is executed each time
      that the component is called
  */
  useEffect(() => {

    async function getPlayers() {
      const res = await getAllPlayers()
      setPlayers(res.data)
    }

    getPlayers()

  }, []);

  // execute when createdId of http response file changes
  useEffect(() => {

    if (createdId != null) {
      console.log(createdId);
      const sessions = JSON.parse(jsonData);
      console.log(sessions);
      var errors = 0;
      sessions.forEach(async element => {
        element['Session Date'] = format(new Date(element['Session Date']));
        const timeMinutes = convertTimeToMinutes( element['Total Time']);
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
        console.log(sessions);
      } else {
        toast(`Se ha cargado el archivo con ${errors} errores.`);
      }
    }

  }, [createdId]);

  


  return (
    <div className="container p-3">
      <div className="row">
        <h2 className="col-6" >Lista de jugadores</h2>
        <div className="d-flex col-6 align-items-center">
          <form onSubmit={save}>
            <div className="d-flex gap-1">
              <input className="form-control" type="file" onChange={handleFileChange} />
              {jsonData != null && date != null && <button className="btn btn-primary" type="submit"><FontAwesomeIcon icon={faCheck}/></button>}
              {jsonData != null && date == null && <span  className="text-danger" >La fecha no se obtuvo correctamente</span>}
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <TableComponent data={players} type={'players'}></TableComponent>
      </div>
    </div>
  )
}
