import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function TeamsPage() {

    //TODO not in use

    const navigate = useNavigate();
    const [isTeamSelected, setIsTeamSelected] = useState(false);

    const selectTeam = (data) => {
        localStorage.setItem('team', data);
        setIsTeamSelected(true)
    }

    useEffect(() => {

        if (isTeamSelected == true) {
            navigate("/players");
        }

    }, [isTeamSelected]);

    return(
        <div className="container p-3">
            <button className="btn btn-primary" onClick={ () => selectTeam('u19')}>U19</button>
            <button className="btn btn-primary" onClick={ () => selectTeam('u16')}>U16</button>
            <button className="btn btn-primary" onClick={ () => selectTeam('u15')}>U15</button>
            <button className="btn btn-primary" onClick={ () => selectTeam('u14')}>U14</button>

        </div>
    );
    
}