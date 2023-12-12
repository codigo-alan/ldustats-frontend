import { Session } from "../models/Session";

export function obtainDrillTitle(sessions) {
    let drillTitlesList = [];
    sessions.forEach(s => {
        if (!drillTitlesList.includes(s.drillTitle)) drillTitlesList.push(s.drillTitle);
    });
    return drillTitlesList;
}

export function obtainDateSet(sessions) {
    let datesList = [];
    sessions.forEach(s => {
        if (!datesList.includes(s.date)) datesList.push(s.date);
    });
    return datesList;
}