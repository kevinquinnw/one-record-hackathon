//sussycalculator
import {Drivers} from "../api/Drivers";

let lookupTable = { //0- not sus, 1- maybe sus, 2- suspicious, 3- pull this guy over now
    "Bermuda":	1,
    "Argentina": 0,
    "Panama": 3,
    "South Korea": 1,
    "Uruguay": 0,
    "French Polynesia":	0,
    "Saudi Arabia": 1,
    "Qatar": 1,
    "UAE": 2,
    "Japan": 0,
    "United States": 3 ,
    "Canada": 1,
    "Czech Republic": 3,
    "Greece": 1,
    "Belgium": 1,
    "Netherlands": 1,
    "Austria": 0,
    "France": 2,
    "Finland": 3,
    "Italy": 3,
    "Poland": 0,
    "Sweden": 0,
    "Ireland": 0,
    "Spain": 0,
    "Hungary": 0,
    "Australia": 2,
    "Singapore": 2
}

export function SuspiciousShipment(origin, driverID, packageDanger){
    let susScore = 0;
    susScore += lookupTable[`${origin}`];
    //now max score is 3
    // check driver is he sussY?
    let driver = {
        name: "Unknown",
        id: 0,
        cleanRecord: true,
        vehicleID: "0000" 
    }
    
    for (let i = 0; i < Drivers.length; i++){
        if (driverID == Drivers[i].id){
            driver = Drivers[i];
            break;
        }
    }
    if (driver.cleanRecord == false){
        susScore += 2;
    }
    //max score is 5 now

    if (packageDanger == "Inspect"){
        susScore++;
    }
    if (packageDanger == "Failed"){
        susScore += 2;
    }
    //max is 8
    return (susScore/8)


}