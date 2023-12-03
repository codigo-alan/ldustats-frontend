import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getHistoricalInfoById } from "../../services/sessions.services";
import { HistoricalInfo } from "../../models/HistoricalInfo";
import { Tooltip } from 'react-tooltip';
import './historicalInfoPlayer.css'

export function HistoricalInfoPlayerComponent({playerRef}) {
    
    const {register, setValue} = useForm();
    const [historicalInfo, setHistoricalInfo] = useState(undefined);

    useEffect( () => {
        if (historicalInfo != undefined) {
            console.log(historicalInfo);
        }

    }, [historicalInfo]);

    //Change value of playerId param
    useEffect( () => {
        async function getPlayerHistorical() {
            try {
                const res = await getHistoricalInfoById(playerRef);
                console.log(res.status);
                if (res.status == 200) {
                    setHistoricalInfo(
                        new HistoricalInfo(
                            res.data.maxSpeed,
                            res.data.totalDistance,
                            res.data.sprints,
                            res.data.sprintsDistance,
                            res.data.maxAcc,
                            res.data.maxDec));
                }
            } catch (error) {
                toast.error(error);
            }
        }

        if (playerRef != undefined && playerRef != '') {
            getPlayerHistorical();
        } 

    }, [playerRef] )


    return (
            
        <div >
            {historicalInfo &&
                <div className="col card bg-light py-auto px-3 d-inline-block historicalInfo"
                     data-tooltip-id="info-tooltip"
                     data-tooltip-content="Máximos registros"
                     data-tooltip-place="top">
                    <p className="fw-bold text-end">Velocidad: {historicalInfo.velocity}</p>
                    <p className="fw-bold text-end">Distancia: {historicalInfo.distance}</p>
                    <p className="fw-bold text-end">Sprints: {historicalInfo.sprints}</p>
                    <p className="fw-bold text-end">Sprints Dist.: {historicalInfo.sprintsDistance}</p>
                    <p className="fw-bold text-end">Aceleraciones: {historicalInfo.accelerations}</p>
                    <p className="fw-bold text-end">Desaceleraciones: {historicalInfo.decelerations}</p>
                </div>}
                <Tooltip id="info-tooltip" className="tooltip"></Tooltip>
            
        </div>

    )
}