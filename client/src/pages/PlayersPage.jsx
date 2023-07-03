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
      return format(new Date(result[0].date));
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
          setJsonData(JSON.stringify(results.data));
          setDate(obtainOneDate(results.data));
        }
      });
    }
    reader.readAsText(selectedFile);
  };


    

  const save = handleSubmit(() => {
    addModifiedFile(new File(1, date)); //TODO modify this hardcode id
  });

  async function addModifiedFile(newFile) {
    const res = await addFile(newFile);
    setCreatedId(JSON.parse(res.request.response).id);
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

  useEffect(() => {

    if (createdId != null) {
      console.log(createdId);
      const sessions = JSON.parse(jsonData);

      var errors = 0;
      sessions.forEach(async element => {
        element.date = format(new Date(element.date));
        const session = new Session(element.name, element.date, element.distance, element.id, createdId);
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
