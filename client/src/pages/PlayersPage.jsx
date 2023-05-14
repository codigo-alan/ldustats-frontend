import { TableComponent } from "../components/TableComponent";
import { useEffect, useState } from "react"
import { getAllPlayers } from "../services/players.services";

export function PlayersPage() {

  const [players, setPlayers] = useState([]) //properly way to use a variable in react

  /*
      This function is executed each time
      that the component is called
  */
  useEffect(() => {

    async function getPlayers() {
      const res = await getAllPlayers()
      setPlayers(res.data)
      console.log(res)
    }

    getPlayers()

  }, []);


  return (
    <div>
      <h2>Players</h2>
      <div>
        <TableComponent data={players}></TableComponent>
      </div>
    </div>
  )
}
