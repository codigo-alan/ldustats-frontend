import { Session } from "../models/Session";

export function obtainDrillTitleCount(sessions) {
    let drillTitlesList = [];
    sessions.forEach(s => {
        if (!drillTitlesList.includes(s.drillTitle)) drillTitlesList.push(s.drillTitle);
    });
    return drillTitlesList;
}