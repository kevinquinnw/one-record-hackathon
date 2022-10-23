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
                <Row>
                  <Col sm={8}>
                  <h6 className="card-destination-title">Current Location</h6>
                  <p>{ship.currentLocation}</p>
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
        </>
        : null }

    </div>
  );
}

export default App;
