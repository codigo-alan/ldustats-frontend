import { TableComponent } from "../components/tableComponent/TableComponent";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { getAllPlayers, addSession } from "../services/players.services";
import { toast } from "react-hot-toast";
import Papa from "papaparse";
import { format } from "../utils/DateFormat";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faCross } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faCheck, faCross);

export function PlayersPage() {

  const [players, setPlayers] = useState([]) //properly way to use a variable in react
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const { register, handleSubmit, formState:{errors} } = useForm()

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const csv = e.target.result;
      Papa.parse(csv, {
        header: true,
        complete: (results) => {
          setJsonData(JSON.stringify(results.data));
          
        }
      });
    }
    reader.readAsText(selectedFile);
  };


    

  const save = handleSubmit(() => {

    const sessions = JSON.parse(jsonData);
    var errors = 0;
      sessions.forEach(async element => {
        element.date = format(new Date(element.date));
        try {
          await addSession(element);
        } catch (error) {
          toast.error(`Error al cargar la sesión de ${element.name}`);
          errors += 1;
        }
      });
      if (errors == 0) {
        toast.success(`Se ha cargado el archivo sin errores`);
      } else {
        toast(`Se ha cargado el archivo con ${errors} errores.`);
      }
  });

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


  return (
    <div className="container p-3">
      <div className="row">
        <h2 className="col-6" >Lista de jugadores</h2>
        <div className="d-flex col-6 align-items-center">
          <form onSubmit={save}>
            <div className="d-flex gap-1">
              <input className="form-control" type="file" onChange={handleFileChange} />
              {jsonData != null && <button className="btn btn-primary" type="submit"><FontAwesomeIcon icon={faCheck}/></button>}
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
