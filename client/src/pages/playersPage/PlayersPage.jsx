import { TableComponent } from "../../components/tableComponent/TableComponent";
import { useEffect, useState } from "react"
import { getAllPlayers } from "../../services/players.services";
import { toast } from "react-hot-toast";
import { SearchBarComponent } from "../../components/searchBarComponent/SearchBarComponent";
import { useNavigate } from "react-router-dom";

export function PlayersPage() {

  const [players, setPlayers] = useState([]) //properly way to use a variable in react
  const [playersFiltered, setPlayersFiltered] = useState([]);
  const navigate = useNavigate()

  const handleSearch = (query) => {
    setPlayersFiltered(players.filter((e) => e.name.toLowerCase().includes(query.toLowerCase())))
  };

  /*
      This function is executed each time
      that the component is called
  */
  useEffect(() => {

    async function getPlayers() {
      try {
        const res = await getAllPlayers();
        setPlayers(res.data);
        setPlayersFiltered(res.data); 
      } catch (error) {
        if(error.response.status == 401 || error.response.status == 403) { //if unauthorized or without credentials
          navigate(`/login`)
        }else{
          toast.error(`No se pudieron obtener los datos`);
        }
      }
    }

    getPlayers();

  }, []);



  


  return (
    <div className="container p-3">
      <div className="row">
        <h2 className="col-6" >Lista de jugadores</h2>
      </div>
      <div className="my-2">
        <SearchBarComponent onSearch={handleSearch}></SearchBarComponent>
      </div>
      <div className="row">
        <TableComponent data={playersFiltered} type={'players'}></TableComponent>
      </div>
    </div>
  )
}
