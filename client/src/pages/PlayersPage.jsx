import { TableComponent } from "../components/tableComponent/TableComponent";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { getAllPlayers, addFile } from "../services/players.services";
import { toast } from "react-hot-toast";
import Papa from "papaparse";

export function PlayersPage() {

  const [players, setPlayers] = useState([]) //properly way to use a variable in react
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const { register, handleSubmit, formState:{errors} } = useForm()

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
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


    

  const save = handleSubmit(async data => {
    try {
      // Create a FormData instance
      const formData = new FormData();
      formData.append('file', file);
      console.log(file);
      console.log(data);
      console.log(formData);

      //const res = await addFile(formData)
      toast.success(`Agregado exitosamente\n${res.data}`)

    } catch (error) {
      toast.error('Error al cargar archivo')
    }

  })

  /*
      This function is executed each time
      that jsonData change its value
  */
  useEffect(() => {

    console.log(jsonData);

  }, [jsonData]);

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
            <div className="card">
              <input type="file" onChange={handleFileChange} />
              <button type="submit">Enviar</button>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <TableComponent data={players}></TableComponent>
      </div>
    </div>
  )
}
