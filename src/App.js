import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import PackageBadge from './components/PackageBadge';
import Modal from 'react-bootstrap/Modal';


function App() {
  const headers = ['Package ID', 'Origin', 'Destination', 'Current Location', 'Flag Level']
  const cities =['Lexington', 'Fayette',
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
    'California']

    const shuffleFunction = (array) => {
      let currentIndex = array.length,  randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }

      return array;
}

const destinations = shuffleFunction(cities);
const currentLocations = shuffleFunction(destinations);
const flagLevels = ['Inspect', 'Failed', 'Passed'];

const badgeHandler = (flag) => {
  if (flag=='Inspect') {
    return 'warning'
  } else if (flag=='Failed') {
    return 'danger'
  } else if (flag=='Passed') {
    return 'success'
  } else {
    return 'primary'
  } 
}

const handleCancel = () => {
  setOpenPackageModal(false)
}

const [openPackageModal, setOpenPackageModal] = useState(false);


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
      <Button onClick={()=>handleCancel()}>Close</Button>
      </Modal>
    <Table striped bordered hover>
      <thead>
        <tr>
          {headers.map((item) => (<th>{item}</th>))}
        </tr>
      </thead>
      <tbody>
          {cities.map((city, index) => (
            <tr onClick={()=>setOpenPackageModal(true)}>
              <td>{index}</td>
              <td>{city}</td>
              <td>{cities[Math.floor(Math.random()*cities.length)]}</td>
              <td>{cities[Math.floor(Math.random()*cities.length)]}</td>
              <td><PackageBadge badgeName={flagLevels[Math.floor(Math.random()*3)]} /></td>
            </tr>
          ))}
          
      </tbody>
    </Table>
    
      </header>
    </div>
  );
}

export default App;
