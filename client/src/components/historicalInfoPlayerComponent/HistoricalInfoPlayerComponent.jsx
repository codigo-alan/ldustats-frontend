import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getHistoricalInfoById } from "../../services/sessions.services";
import { HistoricalInfo } from "../../models/HistoricalInfo";

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
                console.log(res.data);
                setHistoricalInfo(
                    new HistoricalInfo(
                        res.data.maxSpeed,
                        res.data.totalDistance,
                        res.data.sprints,
                        res.data.sprintsDistance,
                        res.data.maxAcc,
                        res.data.maxDec));
                        
                setValue('velMax', res.data.maxSpeed);
                setValue('totalDistance', res.data.totalDistance);
                setValue('sprints', res.data.sprints);
                setValue('sprintsDistance', res.data.sprintsDistance);
                setValue('maxAcc', res.data.maxAcc);
                setValue('maxDec', res.data.maxDec);
            } catch (error) {
                toast.error(error);
            }
        }

        if (playerRef != undefined && playerRef != '') {
            getPlayerHistorical();
        } 

    }, [playerRef] )


    return (
        
        <form className="gap-2">
            <div>
            <div className="col card bg-light p-3 d-inline-block">
                <p className="fw-bold text-end">Velocidad: {historicalInfo.velocity}</p>
                <p className="fw-bold text-end">Distancia: {historicalInfo.distance}</p>
                <p className="fw-bold text-end">Sprints: {historicalInfo.sprints}</p>
                <p className="fw-bold text-end">Sprints Dist.: {historicalInfo.sprintsDistance}</p>
                <p className="fw-bold text-end">Aceleraciones: {historicalInfo.accelerations}</p>
                <p className="fw-bold text-end">Desaceleraciones: {historicalInfo.decelerations}</p>
            </div>
        </div>
            {/* <div className="row">
                <div className="card gap-2 p-2 bg-light">
                    <div className="form-group row">
                        <label className="col-7 col-form-label">Velocidad:</label>
                        <div className="col-5">
                            <input
                                type="text"
                                placeholder="0"
                                className="form-control"
                                readOnly={true}
                                {...register('velMax')}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-7 col-form-label">Distancia:</label>
                        <div className="col-5">
                            <input
                                type="text"
                                placeholder="0"
                                className="form-control"
                                readOnly={true}
                                {...register('totalDistance')}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-7 col-form-label">Sprints:</label>
                        <div className="col-5">
                            <input
                                type="text"
                                placeholder="0"
                                className="form-control"
                                readOnly={true}
                                {...register('sprints')}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-7 col-form-label">Distancia Sprints:</label>
                        <div className="col-5">
                            <input
                                type="text"
                                placeholder="0"
                                className="form-control"
                                readOnly={true}
                                {...register('sprintsDistance')}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-7 col-form-label">Aceleraciones:</label>
                        <div className="col-5">
                            <input
                                type="text"
                                placeholder="0"
                                className="form-control"
                                readOnly={true}
                                {...register('maxAcc')}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-7 col-form-label">Desaceleraciones:</label>
                        <div className="col-5">
                            <input
                                type="text"
                                placeholder="0"
                                className="form-control"
                                readOnly={true}
                                {...register('maxDec')}
                            />
                        </div>
                    </div>

                </div>

            </div> */}

        </form>
    )
}