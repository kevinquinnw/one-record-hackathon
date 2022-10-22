import  {Shipments} from "./Shipments.js";

let cities = ['Lexington', 'Fayette',
'Kentucky','Fort Wayne',
'Indiana','Philadelphia',
'Pennsylvania','Reno',
'Nevada','Garland',
'Texas','Memphis',
'Tennessee','Henderson',
'Nevada','Pittsburgh',
'Pennsylvania','Wichita',
'Kansas','Sacramento',
'California','Lubbock',
'Texas','Oklahoma City',
'Oklahoma','Indianapolis',
'Indiana','Greensboro',
'North Carolina','Anchorage',
'Alaska','El Paso',
'Texas','Cincinnati',
'Ohio','Chandler',
'Arizona','New Orleans',
'Louisiana','Buffalo',
'New York','Bakersfield',
'California'];


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

function GenerateShipments(){

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

    let stops = [];
    let randStop = 0.0;
    while(Math.random() > randStop){
        stops.push(cities[getRandomInt(cities.length - 1)]);
        randStop += 0.20;
    }

    if (delivered != "n/a"){
        stops.push(cities[destIndex]);
    }

    //inspect, failed, passed
    if (Math.random() > 0.75){
        tempObj.dangerFlag = "Inspect";
    }else if(0.5 <= Math.random() <= 0.75){
        tempObj.dangerFlag = "Failed";
    }else{
        tempObj.dangerFlag = "Passed"
    }

    tempObj.currentLocation = stops[stops.length - 1];
    tempObj.stops = stops;


    shipArr.push(tempObj);
}

console.log(shipArr);
}


function GeneratePackages(){
    let packageObj = {}
    for (let i = 0; i < Shipments.length; i++){
        for (let j = 0; j < 10;j++){

        }
    }
}

GenerateShipments();
