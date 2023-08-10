import { useState, useEffect } from 'react';
//import '../tableComponent/tableComponent.css'
import './tableSessionComponent.css'
import Tooltip from '@mui/material/Tooltip';
import { reduceLength } from "../../utils/LimitLengthText";

export function TableSessionComponent({data, type='other', personalizedCaption=''}) {

    const [caption,setCaption] = useState('');

    useEffect(() => {

        function setCaptionValue() {
            if (type == 'complete') setCaption('RESUMEN COMPLETO');
            if (type == 'allSessions') setCaption('TODAS LAS SESIONES');
            if (type == 'other') setCaption(personalizedCaption.toUpperCase());
        }

        setCaptionValue();

    }, [type]);

    return (
        <div className='overflow-scroll card bg-light my-2 myDiv'>
            <table className="table table-hover border caption-top table-sm table-bordered table-striped">
                <caption>{caption}</caption>
                <thead className="bg-light">

                        <tr className='text-center'>
                            <th>Nombre</th>
                            {/* <th>Fecha</th>
                            <th>Dril</th> */}
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
                        return (
                            <tr className="tableRow text-center" key={element.id} >
                                <td>{element.name}</td>
                                {/* <td>{element.date}</td>
                                <Tooltip title={element.drillTitle}>
                                    <td>{reduceLength(element.drillTitle, 3)}</td>
                                </Tooltip> */}
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
