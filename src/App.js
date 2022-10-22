import logo from './ajk.png';
import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import PackageBadge from './components/PackageBadge';
import Modal from 'react-bootstrap/Modal';
import PackageContent from './components/PackageContent/PackageContent';
import { ModalFooter } from 'react-bootstrap';
import packageData from './json/packageData.json';
import { Shipments } from './api/Shipments';

function App() {
  const headers = ['Package ID','Origin', 'Destination', 'Current Location', 'Date Expected', 'Status']
  const [openPackageModal, setOpenPackageModal] = useState(false);
  const [currentPackage, setCurrentPackage] = useState('');

const handleModal = (boxId) => {
  console.log(boxId)
  setCurrentPackage(packageData[boxId-1])
  setOpenPackageModal(true)
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




  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className ="text 3xl font-bold underline">
          Welcome to AJK Autoservices.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        
    <Modal
    show={openPackageModal}
    onHide={()=>handleCancel()}>
      <PackageContent packaged={currentPackage} />
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
          {packageData.map((pack) => (
            <tr key={pack.packageID} onClick={()=>handleModal(pack.packageID)} class="bg-light">
              <td>{pack.packageID}</td>
              <td>{pack.origin}</td>
              <td>{pack.destination}</td>
              <td>{pack.currentLocation}</td>
              <td>{pack.dateExpected}</td>
              <td><PackageBadge badgeName={pack.dangerFlag} /></td>
            </tr>
          ))}
          
      </tbody>
    </Table>
    
      </header>
    </div>
  );
}

export default App;
