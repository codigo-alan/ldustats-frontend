import { useForm } from "react-hook-form"
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { getHistoricalInfoById } from "../../services/sessions.services";

export function HistoricalInfoPlayerComponent({playerRef}) {
    
    const {register, setValue} = useForm();

    //Change value of playerId param
    useEffect( () => {
        async function getPlayerHistorical() {
            try {
                const res = await getHistoricalInfoById(playerRef);
                console.log(res.data);
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
            <div className="row">
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

            </div>

        </form>
    )
}