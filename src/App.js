import logo from './ajk.png';
import './App.css';
import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import PackageBadge from './components/PackageBadge';
import Modal from 'react-bootstrap/Modal';
import PackageContent from './components/PackageContent/PackageContent';
import { Card, ModalFooter } from 'react-bootstrap';
import { Shipments } from './api/Shipments';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { GeoFill } from 'react-bootstrap-icons';
import { SuspiciousShipment } from './algorithms/SuspiciousShipment';
import 'devextreme/dist/css/dx.light.css';

import {
  Chart,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  Export,
  Legend,
  Margin,
  Title,
  Subtitle,
  Tooltip,
  Grid,
} from 'devextreme-react/chart';

function App() {
  const headers = ['Package ID','Origin', 'Destination', 'Current Location', 'Status']
  const [openPackageModal, setOpenPackageModal] = useState(false);
  const [currentPackage, setCurrentPackage] = useState('');
  const [openStage, setOpenStage] = useState(true);
  const [currentShipment, setCurrentShipment] = useState(Shipments[0].packages);
  const [currentDriver, setCurrentDriver] = useState('');
  const myRef = useRef(null)
  

const handleModal = (boxId) => {
  console.log(boxId)
  let obj = currentShipment.find(o => o.id === boxId)
  console.log(obj)
  setCurrentPackage(obj);
  setOpenPackageModal(true);
}

const handleShipment = (shipId) => {
  setCurrentShipment(shipId.packages);
  setCurrentDriver(shipId.driverID);
  setOpenStage(true);
  executeScroller();
}

const executeScroller = () => {
  myRef.current.scrollIntoView()
}

const dummyData = {
  'packageId': '3432434',
  'vehicleId': 'AIR453223',
  'shipmentId': 'WJRGKM#4879',
  'status': 'Failed',
  'weight': '2.5 lbs',
  'dimensions': '30cm x 20cm x 15cm',
  'content': 'N/A',
  'currentLocations': ['Thunder Bay', 'Toronto', 'Vancouver', 'San Fransisco']
}

const handleCancel = () => {
  setOpenPackageModal(false)
}

const secondTable = (selectedShipment) => {
  return (
    <>
    <Modal
    show={openPackageModal}
    onHide={()=>handleCancel()}
    size="lg">
      <PackageContent packaged={currentPackage} currentDriver={currentDriver} />
      <ModalFooter>
      <Button onClick={()=>handleCancel()}>Close</Button>
      </ModalFooter>
      </Modal>
    <Table className="table-spacing" bordered hover>
      <thead>
        <tr class="bg-dark text-white">
          {headers.map((item) => (<th className="table-header">{item}</th>))}
        </tr>
      </thead>
      <tbody>
          {selectedShipment.map((pack) => (
            <tr key={pack.id} onClick={()=>handleModal(pack.id)} class="bg-light">
              <td>{pack.id}</td>
              <td>{pack.origin}</td>
              <td>{pack.destination}</td>
              <td>{pack.currentLocation}</td>
              <td><PackageBadge badgeName={pack.dangerFlag} /></td>
            </tr>
          ))}
          
      </tbody>
    </Table>
    </>
  )
}

const statistics = (selectedShipment) => {
  let acc = []
  for (var key in selectedShipment) {
    acc.push(SuspiciousShipment(selectedShipment[key].origin, currentDriver, selectedShipment[key].dangerFlag))
  }
  return acc
}

const hardData = {
  'Shipment 1': statistics(Shipments[0].packages),
  'Shipment 2': statistics(Shipments[1].packages),
  'Shipment 3': statistics(Shipments[2].packages),
  'Shipment 4': statistics(Shipments[3].packages),
  'Shipment 5': statistics(Shipments[4].packages),
  'Shipment 6': statistics(Shipments[5].packages),
  'Shipment 7': statistics(Shipments[6].packages),
  'Shipment 8': statistics(Shipments[7].packages),
  'Shipment 9': statistics(Shipments[8].packages),
  'Shipment 10': statistics(Shipments[9].packages),
}

const formatGraphData  = () => {
  let arr = [];
  let tempObj = {}
  let count = 1;
  for (let i = 0; i < Shipments.length; i++){
    tempObj = {};
    tempObj['country'] = `Package ${count}`;
    tempObj[`p1`] = statistics(Shipments[0].packages)[i];
    tempObj[`p2`] = statistics(Shipments[1].packages)[i];
    tempObj[`p3`]= statistics(Shipments[2].packages)[i];
    tempObj[`p4`]= statistics(Shipments[3].packages)[i];
    tempObj[`p5`]= statistics(Shipments[4].packages)[i];
    tempObj[`p6`] = statistics(Shipments[5].packages)[i];
    tempObj[`p7`]= statistics(Shipments[6].packages)[i];
    tempObj[`p8`]= statistics(Shipments[7].packages)[i];
    tempObj[`p9`]= statistics(Shipments[8].packages)[i];
    tempObj[`p10`]= statistics(Shipments[9].packages)[i];
    count = count + 1 - 2 + 2;
    arr.push(tempObj);

  }
  console.log(arr);
  return arr;
}


const countriesInfo = formatGraphData();

const energySources = [
  { value: 'p1', name: 'Shipment 1' },
  { value: 'p2', name: 'Shipment 2' },
  { value: 'p3', name: 'Shipment 3'},
  { value: 'p4', name: 'Shipment 4' },
  { value: 'p5', name: 'Shipment 5' },
  { value: 'p6', name: 'Shipment 6' },
  { value: 'p7', name: 'Shipment 7' },
  { value: 'p8', name: 'Shipment 8' },
  { value: 'p9', name: 'Shipment 9' },
  { value: 'p10', name: 'Shipment 10' }
];


  const thirdTable = () => {
    
    
    return (
      <Chart
      palette="Violet"
      dataSource={countriesInfo}
    >
      <CommonSeriesSettings
        argumentField="country"
        type='line'
      />
      {
        energySources.map((item) => <Series
          key={item.value}
          valueField={item.value}
          name={item.name} />)
      }
      <Margin bottom={20} />
      <ArgumentAxis
        valueMarginsEnabled={false}
        discreteAxisDivisionMode="crossLabels"
      >
        <Grid visible={true} />
      </ArgumentAxis>
      <Legend
        verticalAlignment="bottom"
        horizontalAlignment="center"
        itemTextPosition="bottom"
      />
      <Export enabled={true} />
      <Title text="Suspicion Statistics Between Shipments">
      </Title>
      <Tooltip enabled={true} />
    </Chart>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <Row className="title-head">
          <Col>
          <img src={logo} className="App-logo" alt="logo" />
          </Col>
        <Col>
          <h1 className ="display-1 title-text">
          AJK Cargo
        </h1>
          </Col>
          
        </Row>
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        
    
    
      </header>
      <Row>
          <h2 className="display-3 subheading">
            <span className="subheading-span">Current</span> Shipments
          </h2>
          <p className="subheading-description">
            Below are the current shipments, click on any of the shipment cards to see a detailed report on the included packages.
          </p>
          
        </Row>
        <Row  xs={1} md={2} lg={6} className="shipment-cards g-4">
            {Shipments.map((ship) => (
              <Card className="shadow m-3 shipment-card" onClick={() => handleShipment(ship)}>
              <Card.Title className="shipment-title"><PackageBadge badgeName={`Shipment ${ship.shipmentID}`} /></Card.Title>
              <Card.Text className="card-info">
                <Row className="top-card">
                  <Col sm={8}>
                  <h6 className="card-destination-title">Current Location</h6>
                  <span className="purple-span">{ship.currentLocation}</span>
                  </Col>
                  <Col sm={4}>
                  <GeoFill size={36}/>
                  </Col>
                
                </Row>
                <Row>
                <Col>
                  <h6 className="card-destination-title">Date Shipped</h6>
                  <p>{ship.dateShipped}</p>
                  </Col>
                  <Col>
                  <h6 className="card-destination-title">Date Expected</h6>
                  <p>{ship.dateExpected}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <h6 className="card-destination-title">Origin</h6>
                  <p>{ship.origin}</p>
                  </Col>
                  <Col>
                  <h6 className="card-destination-title">Destination</h6>
                  <p>{ship.destination}</p>
                  </Col>
                </Row>
              </Card.Text>
            </Card>
            ))}
        </Row>
        {openStage ? 
        <>
        <h2 className="display-3 subheading-shipment" ref={myRef}>
            {`Shipment ${currentShipment[0].shipmentID}`} <span className="subheading-span">Packages</span>
        </h2> 
        <p>Below are all of the packages of {`Shipment ${currentShipment[0].shipmentID}`}. You can click on any row to see a detailed report of the package.</p>
        {secondTable(currentShipment)}
        

        <h2 className="display-3 subheading-shipment">
        <span className="subheading-span"> Shipment</span> Performance
        </h2> 

        <p className="subheading-description">
            Below is an overview of all Shipment performances based on our suspicion shipment calculation.
          </p>

        {thirdTable(currentShipment)}

        </>


        
        : null }

    </div>
  );
}

export default App;
