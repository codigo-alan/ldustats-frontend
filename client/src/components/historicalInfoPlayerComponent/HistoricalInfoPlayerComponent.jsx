import { useForm } from "react-hook-form"
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { getHistoricalInfoById } from "../../services/players.services";

export function HistoricalInfoPlayerComponent({playerRef}) {
    
    const {register, setValue} = useForm();

    //Change value of playerId param
    useEffect( () => {
        async function getPlayerHistorical() {
            try {
                const res = await getHistoricalInfoById(playerRef);
                console.log(res);
                setValue('velMax', res.data.velMax) 
            } catch (error) {
                toast.error(error);
            }
        }

        if (playerRef != undefined) {
            //getPlayerHistorical(); //TODO error, 404 on endpoint
            console.log(playerRef);
        } 

    }, [playerRef] )


    return (
        <form className="gap-2">
            <div className="row">
                <div className="card gap-2 p-2 bg-light">
                    <div className="form-group row">
                        <label className="col-8 col-form-label">Vel. máx registrada:</label>
                        <div className="col-4">
                            <input
                                type="text"
                                placeholder="0 m/s"
                                className="form-control"
                                readOnly={true}
                                {...register('velMax')}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-8 col-form-label">Vel. máx registrada:</label>
                        <div className="col-4">
                            <input
                                type="text"
                                placeholder="0 m/s"
                                className="form-control"
                                readOnly={true}
                                {...register('velMax')}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-8 col-form-label">Vel. máx registrada:</label>
                        <div className="col-4">
                            <input
                                type="text"
                                placeholder="0 m/s"
                                className="form-control"
                                readOnly={true}
                                {...register('velMax')}
                            />
                        </div>
                    </div>
                    

                </div>

            </div>

        </form>
    )
}