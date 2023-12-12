import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getHistoricalInfoById } from "../../services/sessions.services";
import { HistoricalInfo } from "../../models/HistoricalInfo";
import { Tooltip } from 'react-tooltip';
import './historicalInfoPlayer.css'
import { ModalChartData } from "../../components/modalChartData/ModalChartData";
import { obtainDateSet, obtainDrillTitle } from "../../utils/ObtainDistinct";
import { obtainMaxValues } from "./HistoricalInfoPlayer";

export function HistoricalInfoPlayerComponent({playerRef, playerSessions = []}) {
    
    const [historicalInfo, setHistoricalInfo] = useState(undefined);
    const historicalColumns = ['maxSpeed', 'totalDistance', 'spints', 'sprintDistance', 'accelerations', 'decelerations' ];
    const [dates, setDates] = useState([]);
    const [drills, setDrills] = useState([]);
    const [maxValues, setMaxValues] = useState([]);
    const [maxValuesToModal, setMaxValuesToModal] = useState([]);

    //modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (element) => {
        console.log(element);
        setMaxValuesToModal(maxValues.filter( (e) => e.columnName == element));
        setShow(true);
    }

    const [playerSessionsByDate, setPlayerSessionsByDate] = useState([]);

    const initialData = [
        { time: '2018-12-22', value: 32.51 },
        { time: '2018-12-23', value: 31.11 },
        { time: '2018-12-24', value: 27.02 },
        { time: '2018-12-25', value: 27.32 },
        { time: '2018-12-26', value: 25.17 },
        { time: '2018-12-27', value: 28.89 },
        { time: '2018-12-28', value: 25.46 },
        { time: '2018-12-29', value: 23.92 },
        { time: '2018-12-30', value: 22.68 },
        { time: '2018-12-31', value: 22.67 },
    ];

    //Change of playerSessions prop
    useEffect( () => {
        if (playerSessions.length > 0) {
            setDates(obtainDateSet(playerSessions));
            setDrills(obtainDrillTitle(playerSessions));
        }
    }, [playerSessions])

    //Change of dates list or drills list
    useEffect( () => {
        if (dates.length > 0 && drills.length > 0) {
            setMaxValues(obtainMaxValues(playerSessions, dates, drills, historicalColumns));
            //TODO need pass max values with some filter to modal
        }
    }, [dates, drills])

    /* useEffect( () => {
        //console.log(maxValues)
    }, [maxValues]) */


    //Change value of playerId param
    useEffect( () => {
        async function getPlayerHistorical() {
            try {
                const res = await getHistoricalInfoById(playerRef);
                if (res.status == 200) {
                    setHistoricalInfo(
                        new HistoricalInfo(
                            res.data['maxSpeed'], //TODO temporal example access
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
            
        <>
        <div>
            {historicalInfo &&
                <div className="col card bg-light py-auto px-3 d-inline-block historicalInfo"
                     data-tooltip-id="info-tooltip"
                     data-tooltip-content="Máximos registros"
                     data-tooltip-place="top">
                    <p className="fw-bold text-end historicalItem" onClick={ () => handleShow(historicalColumns[0])}>Velocidad: {historicalInfo.velocity}</p>
                    <p className="fw-bold text-end historicalItem" onClick={ () => handleShow(historicalColumns[1])} >Distancia: {historicalInfo.distance}</p>
                    <p className="fw-bold text-end historicalItem" onClick={ () => handleShow(historicalColumns[2])} >Sprints: {historicalInfo.sprints}</p>
                    <p className="fw-bold text-end historicalItem" onClick={ () => handleShow(historicalColumns[3])} >Sprints Dist.: {historicalInfo.sprintsDistance}</p>
                    <p className="fw-bold text-end historicalItem" onClick={ () => handleShow(historicalColumns[4])} >Aceleraciones: {historicalInfo.accelerations}</p>
                    <p className="fw-bold text-end historicalItem" onClick={ () => handleShow(historicalColumns[5])} >Desaceleraciones: {historicalInfo.decelerations}</p>
                </div>}
                <Tooltip id="info-tooltip" className="tooltip"></Tooltip>
            
        </div>
        <ModalChartData show={show} handleClose={handleClose} initialData={initialData} itemsByCol={maxValuesToModal}></ModalChartData>
        </>

    )
}