export function obtainMaxValues(sessions = [], dates = [], drills = [], columns = []) {
    let maxValues = [];
    for (const drill of drills) {
        for (const date of dates) {
            for (const column of columns) {
                const sessionFiltered = sessions
                    .filter((session) => session.drillTitle == drill && session.date == date)
                        .map((sf) => (
                            {columnName: column, columnValue: Number(sf[column]), date: sf.date, drill: sf.drillTitle}
                        )); //obtain sesions with date and drill, map the session is not necessary

                maxValues
                    .push(sessionFiltered
                        .reduce((maxim, actual) => (actual[column] > maxim[column]) ? actual : maxim, sessionFiltered[0]));
                        //Obtain sessionfiltered and maped with the max value of the specified column
            };  
        };
    };
    return maxValues;
}


export function obtainModalTitle(column) {

    switch (column) {
        case 'maxSpeed':
            return 'Velocidad máxima';

        case 'totalDistance':
            return 'Distancia total';
            break;

        case 'spints':
            return 'Sprints';

        case 'sprintDistance':
            return 'Sprints distancia';

        case 'accelerations':
            return 'Aceleraciones';

        case 'decelerations':
            return 'Desaceleraciones';


        default:
            return 'Gráfica';
    }
    
}
