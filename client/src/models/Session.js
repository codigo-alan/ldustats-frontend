export class Session {
    constructor(name, date, drillTitle, totalTime, totalDistance, dtMin, zone4, zone5, zone6, hsr,
       hsrMin, maxSpeed, spints, sprintDistance, accelerations, decelerations, accMin, decMin,
       hmlDistance, idPlayer, idFile) {
           
        this.name = name;
        this.date = date;
        this.drillTitle = drillTitle;   
        this.totalTime = totalTime; // TODO convert the string to time
        this.totalDistance = totalDistance;
        this.dtMin = dtMin;
        this.zone4 = zone4;
        this.zone5 = zone5;
        this.zone6 = zone6;
        this.hsr = hsr;
        this.hsrMin = hsrMin;
        this.maxSpeed = maxSpeed;
        this.spints = spints;
        this.sprintDistance = sprintDistance;
        this.accelerations = accelerations;
        this.decelerations = decelerations;
        this.accMin = accMin;
        this.decMin = decMin;
        this.hmlDistance = hmlDistance;
        this.idPlayer = idPlayer;
        this.idFile = idFile;
   }

}
