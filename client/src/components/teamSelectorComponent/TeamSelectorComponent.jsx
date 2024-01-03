import { useState } from 'react';
import { Tooltip } from 'react-tooltip';

export function TeamSelectorComponent({teamOptions=[], onSelectionChange}) {

    const [teamId, setTeamId] = useState(JSON.parse(localStorage.getItem('team')).id)

    //When selector change, change the local storage team and
    //advise to parent component about selector change
    const handleChange = (event) => {
        setTeamId(event.target.value)
        const newTeam = teamOptions.find(team => team.id == event.target.value)
        localStorage.setItem('team', JSON.stringify(newTeam))
        onSelectionChange(event.target.value)
    }

    return (
        <form className='col-2'>
            <select
                className='form-select' onChange={handleChange} value={teamId}
                data-tooltip-id="info-tooltip"
                data-tooltip-content="Selecciona equipo"
                data-tooltip-place="right">
                {teamOptions.map((option) => {
                    return <option key={option.id} value={option.id}  >
                        {option.name.toUpperCase()}
                    </option>
                })}
            </select>
            <Tooltip id='info-tooltip' />
        </form>
    );
}
