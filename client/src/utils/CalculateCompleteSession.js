import { Session } from "../models/Session";


export function calculateCompleteSession(sessions) {
    console.log(sessions)

    
    let totalDistance = 0.0
    sessions.forEach(element => {
        totalDistance += Number(element.totalDistance)
    });

    return [new Session(
        sessions[0].name, sessions[0].date, sessions[0].drillTitle,
        sessions[0].totalTime, totalDistance, sessions[0].dtMin,
        sessions[0].zone4, sessions[0].zone5,
        sessions[0].zone6, sessions[0].hsr,
        sessions[0].hsrMin, sessions[0].maxSpeed, sessions[0].spints,
        sessions[0].sprintDistance, sessions[0].accelerations, sessions[0].decelerations,
        0, 0, sessions[0].hmlDistance, sessions[0].idPlayer, sessions[0].idFile)];
}

export function calculateByTime(value, time) {

    return (value/time).toFixed(2);
}

export function convertTimeToMinutes(timeString) {
    console.log(timeString);
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const totalSeconds = hours * 60 * 60 + minutes * 60 + seconds;
    return (totalSeconds/60).toFixed(5);
}

