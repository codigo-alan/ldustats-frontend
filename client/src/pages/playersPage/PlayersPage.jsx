import { TableComponent } from "../../components/tableComponent/TableComponent";
import { useEffect, useState } from "react"
import { getAllPlayers } from "../../services/players.services";
import { toast } from "react-hot-toast";
import { SearchBarComponent } from "../../components/searchBarComponent/SearchBarComponent";
import { useNavigate } from "react-router-dom";
import { getAllTeams } from "../../services/teams.services";
import { TeamSelectorComponent } from "../../components/teamSelectorComponent/TeamSelectorComponent";

export function PlayersPage() {

  const [players, setPlayers] = useState([]) //properly way to use a variable in react
  const [playersFiltered, setPlayersFiltered] = useState([]);
  const [teamId, setTeamId] = useState('');
  const [teams, setTeams] = useState([]); //teams obtained from a request to API
  const navigate = useNavigate()

  //Search by name change
  const handleSearch = (query) => {
    setPlayersFiltered(players.filter((e) => 
      e.name.toLowerCase().includes(query.toLowerCase()) && e.team == teamId))
  };

  //When team selector change, need change the value of this self teamId
  const handleTeamChange = (newTeamId) => {
    console.log(newTeamId)
    setTeamId(JSON.parse(localStorage.getItem('team')).id)
  }

   /*
      This function is executed each time
      that the component is called
  */
  useEffect(() => {

    async function getTeams() {
      try {

        const res = await getAllTeams();
        setTeams(res.data);
        setTeamId(JSON.parse(localStorage.getItem('team')).id)

      } catch (error) {

        if(error.response.status == 401 || error.response.status == 403) { //if unauthorized or without credentials
          navigate(`/login`)

        }else{
          
          toast.error(`No se pudieron obtener los datos`);

        }
      }
    }

    async function getPlayers() {
      try {
        const res = await getAllPlayers();
        setPlayers(res.data);
      } catch (error) {
        toast.error(error)
      }
    }

    getTeams();
    getPlayers();

  }, []);

 //Change at teamId or players
  useEffect(() => {

    if (teamId != '' && players.length > 0) {
      setPlayersFiltered(players.filter((e) =>
        e.team == teamId))
    }

  }, [players, teamId]);



  

//TODO add selector component to teams and change team id to new request
  return (
    <div className="container p-3">
      <div className="row">
        <h2 className="col-auto" >Lista de jugadores</h2>
        <TeamSelectorComponent
          teamOptions={teams}
          currentTeamId={teamId}
          onSelectionChange={handleTeamChange}>
        </TeamSelectorComponent>
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
