import { useState, useEffect } from 'react';
import '../tableComponent/tableComponent.css'

export function TableSessionComponent({data, type, idPlayer}) {

    const [caption,setCaption] = useState('');

    useEffect(() => {

        function setCaptionValue() {
            if (type == 'first') {
                setCaption('Primer tiempo');
            }
            if (type == 'second') {
                setCaption('Segundo tiempo');
            }
            if (type == 'complete') {
                setCaption('Resumen completo');
            }
            if (type == 'sessions') {
                setCaption('Sesiones');
            }
        }

        setCaptionValue();

    }, [type]);

    return (
        <div>
            <table className="table table-hover border table-borderless caption-top">
                <caption>{caption}</caption>
                <thead className="bg-light ">

                        <tr>
                            <th>Nombre</th>
                            <th>Fecha</th>
                            <th>Dril</th>
                            <th>Tiempo total</th>
                            <th>Distancia total</th>
                            <th>Dt/min</th>
                            <th>Zona 4</th>
                            <th>Zona 5</th>
                            <th>Zona 6</th>
                            <th>HSR</th>
                            <th>HSR/min</th>
                            <th>Vel. máx.</th>
                            <th>Sprints</th>
                            <th>Sprints distancia</th>
                            <th>Aceleraciones</th>
                            <th>Desaceleraciones</th>
                            <th>Ac/min</th>
                            <th>Dec/min</th>
                            <th>HML distancia</th>
                        </tr> 
                        
                </thead>
                <tbody>
                    
                    {data.map((element) => {
                        console.log(element);
                        return (
                            <tr className="tableRow" key={element.id} >
                                <td>{element.name}</td>
                                <td>{element.date}</td>
                                <td>{element.drillTitle}</td>
                                <td>{element.totalTime}</td>
                                <td>{element.totalDistance}</td>
                                <td>{element.dtMin}</td>
                                <td>{element.zone4}</td>
                                <td>{element.zone5}</td>
                                <td>{element.zone6}</td>
                                <td>{element.hsr}</td>
                                <td>{element.hsrMin}</td>
                                <td>{element.maxSpeed}</td>
                                <td>{element.spints}</td>
                                <td>{element.sprintDistance}</td>
                                <td>{element.accelerations}</td>
                                <td>{element.decelerations}</td>
                                <td>{element.accMin}</td>
                                <td>{element.decMin}</td>
                                <td>{element.hmlDistance}</td>
                            </tr>
                        )
                    })}
                    
                </tbody>
            </table>
        </div>
    );
    
}