import { Session } from "../models/Session";

function getCommonValue() {
    return 0.0;
}

function makeAverage(value, quantity) {
    return (value/quantity).toFixed(2);
}

export function calculateCompleteSession(sessions, groupal=false, drillIfGroupal='') {
    const quantity = sessions.length;
    //TODO totalTime
    let totalDistance = getCommonValue();
    let dtMin = getCommonValue();//average
    let zone4 = getCommonValue();
    let zone5 = getCommonValue();
    let zone6 = getCommonValue();
    let hsr = getCommonValue();
    let hsrMin = getCommonValue();//average
    let maxSpeed = getCommonValue();//average
    let spints = getCommonValue();
    let sprintDistance = getCommonValue();
    let accelerations = getCommonValue();
    let decelerations = getCommonValue();
    let accMin = getCommonValue();//average
    let decMin = getCommonValue();//average
    let hmlDistance = getCommonValue();

    sessions.forEach(element => {
        totalDistance += Number(element.totalDistance);
        dtMin += Number(element.dtMin);
        zone4 += Number(element.zone4);
        zone5 += Number(element.zone5);
        zone6 += Number(element.zone6);
        hsr += Number(element.hsr);
        hsrMin += Number(element.hsrMin);
        maxSpeed += Number(element.maxSpeed);
        spints += Number(element.spints);
        sprintDistance += Number(element.sprintDistance);
        accelerations += Number(element.accelerations);
        decelerations += Number(element.decelerations);
        accMin += Number(element.accMin);
        decMin += Number(element.decMin);
        hmlDistance += Number(element.hmlDistance);

    });

    if (groupal) {
        return [new Session(
            '','',drillIfGroupal,
            '', makeAverage(totalDistance, quantity), makeAverage(dtMin, quantity),
            makeAverage(zone4, quantity), makeAverage(zone5, quantity),
            makeAverage(zone6, quantity), makeAverage(hsr, quantity),
            makeAverage(hsrMin, quantity), makeAverage(maxSpeed, quantity), makeAverage(spints, quantity),
            makeAverage(sprintDistance, quantity), makeAverage(accelerations, quantity), makeAverage(decelerations, quantity),
            makeAverage(accMin, quantity), makeAverage(decMin, quantity), makeAverage(hmlDistance, quantity), '', '')];
    } else {
        return [new Session(
            sessions[0].name, sessions[0].date, 'COMPLETO',
            sessions[0].totalTime, totalDistance.toFixed(2), makeAverage(dtMin, quantity),
            zone4.toFixed(2), zone5.toFixed(2),
            zone6.toFixed(2), hsr.toFixed(2),
            makeAverage(hsrMin, quantity), makeAverage(maxSpeed, quantity), spints,
            sprintDistance.toFixed(2), accelerations, decelerations,
            makeAverage(accMin, quantity), makeAverage(decMin, quantity), hmlDistance.toFixed(2), sessions[0].idPlayer, sessions[0].idFile)];
    }
    
}

export function calculateByTime(value, time) {

    return (value/time).toFixed(2);
}

export function convertTimeToMinutes(timeString) {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const totalSeconds = hours * 60 * 60 + minutes * 60 + seconds;
    return (totalSeconds/60).toFixed(5);
}

