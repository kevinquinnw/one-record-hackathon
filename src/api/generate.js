import  {Shipments} from "./Shipments.js";
import fs from "fs/promises";
//const fs = require('fs');

let cities = ["Bermuda",
    "Argentina",
    "Panama",
    "South Korea",
    "Uruguay",
    "French Polynesia",
    "Saudi Arabia",
    "Qatar",
    "UAE",
    "Japan",
    "United States",
    "Canada",
    "Czech Republic",
    "Greece",
    "Belgium",
    "Netherlands",
    "Austria",
    "France",
    "Finland",
    "Italy",
    "Poland",
    "Sweden",
    "Ireland",
    "Spain",
    "Hungary",
    "Australia",
    "Singapore"
];

let tariffs =  {
    "Bermuda":	24.07,
    "Argentina": 6.88,
    "Panama": 5.77,
    "South Korea": 5.48,
    "Uruguay": 5.29,
    "French Polynesia":	4.83,
    "Saudi Arabia":4.23,
    "Qatar":3.55,
    "UAE":3.28,
    "Japan":2.22,
    "United States":1.52,
    "Canada":1.49,
    "Czech Republic":1.48,
    "Greece":1.48,
    "Belgium": 1.48,
    "Netherlands":1.48,
    "Austria":1.48,
    "France":1.48,
    "Finland":1.48,
    "Italy":1.48,
    "Poland":1.48,
    "Sweden":1.48,
    "Ireland":1.48,
    "Spain":1.48,
    "Hungary":1.48,
    "Australia":0.71,
    "Singapore": 0.05
}

let packages = [
    "Game Console", "Kitchen Utensils", "Clothing", "Chemicals", "Cleaning Products", "Bath Products", "Oranges", "Bread", "Metal",
    "Machinery", "Candy", "Medicine", "Shoes", "Rubber", "Vehicle", "Coffee", "Weaves", "Garden Tools", "Mobile Device"
]


function GenerateDates(){
    //mm/dd/yyyy
    let yr = 2021;
    let smm = Math.floor(Math.random() * (11) + 1);
    let sdd = Math.floor(Math.random() * (27) + 1);
    let syyyy = Math.ceil(Math.random() * (2));

    let startDate = new Date(`${smm}/${sdd}/${syyyy + yr}`);

    let dateNum = startDate.getTime();

    let addition =((Math.random() * 50) + 10)*86400000;
    
    let endDate = new Date(dateNum + addition);
    
    let deliverNum = endDate.getTime(); 
    let m = ((Math.random() * 3) - 4)*86400000;
    let deliverDate = new Date(deliverNum + m);

    if (Math.random() < 0.3){
        return [startDate.toDateString(), endDate.toDateString(), "n/a"];
    }else{
        return [startDate.toDateString(), endDate.toDateString(), deliverDate.toDateString()]
    }


}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function GenerateShipments(){

    let shipArr = [];
    let tempObj = {}
    for (let i = 0; i < 10; i++){
        tempObj = {};
        let [shipped, expected, delivered] = GenerateDates();
        
        tempObj.dateExpected = expected;
        tempObj.dateDelivered = delivered;
        tempObj.dateShipped = shipped;
        tempObj.shipmentID = `${i + 1}`;
        tempObj.driverID = `${(i%5) + 1}`;
        let originIndex = getRandomInt(cities.length - 1);
        tempObj.origin = cities[originIndex];

        let destIndex = getRandomInt(cities.length - 1);
        while(destIndex == originIndex){
            destIndex = getRandomInt(cities.length - 1);
        }
        tempObj.destination = cities[destIndex];
        tempObj.tariff = tariffs[cities[destIndex]];

        let stops = [];
        let randStop = 0.0;
        while(Math.random() > randStop){
            stops.push(cities[getRandomInt(cities.length - 1)]);
            randStop += 0.20;
        }

        if (delivered != "n/a"){
            stops.push(cities[destIndex]);
        }

        tempObj.currentLocation = stops[stops.length - 1];
        tempObj.stops = stops;

        // tempObj.packages = GeneratePackages(i+1, tempObj);
        // console.log(GeneratePackages(1, tempObj));

        shipArr.push(tempObj);
    }

    console.log(shipArr);
    return shipArr;
}

//GenerateShipments();


export function GeneratePackages(index, Shipment){
    let tempObj = {}
    let packArr = []
    let mult = parseInt(Shipment.shipmentID) - 1;
        //console.log(Shipment);

        for (let j = 0; j < 10;j++){
            tempObj = {};

            if (Math.random() > 0.75){
                tempObj.dangerFlag = "Inspect";
            }else if(0.5 <= Math.random() <= 0.75){
                tempObj.dangerFlag = "Failed";
            }else{
                tempObj.dangerFlag = "Passed";
            }

            let originIndex = getRandomInt(cities.length - 1);
            tempObj.origin = cities[originIndex];
            tempObj.destination = Shipment.destination;
            tempObj.shipmentID = Shipment.shipmentID;
            tempObj.id = `${(mult*10)+j+1}`
            tempObj.currentLocation = Shipment.currentLocation;
            tempObj.price = getRandomInt(500000) + 10;

            let contentIndex = getRandomInt(packages.length - 1);
            tempObj.content = packages[contentIndex];
            tempObj.size = `${(getRandomInt(100) + 10)}cm x ${(getRandomInt(100) + 10)}cm x ${(getRandomInt(100) + 10)}cm`;
            tempObj.weight = `${getRandomInt(50)}kg`;

            packArr.push(tempObj);
            fs.appendFile("./text.txt", `${JSON.stringify(tempObj)},\n`);
        }
        fs.appendFile("./text.txt", `\n`);
    
    //console.log(packArr);
    return packArr;
}

for (let i = 0; i < Shipments.length; i++){
    GeneratePackages(i+1, Shipments[i]);
}

//GenerateShipments();


