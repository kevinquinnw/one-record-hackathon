import PackageBadge from "../PackageBadge";
import './packagecontent.css'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SuspiciousShipment } from "../../algorithms/SuspiciousShipment";
import { Badge } from "react-bootstrap";
import Table from "react-bootstrap/Table";

// import the progress bar
import StepProgressBar from 'react-step-progress';
// import the stylesheet
import 'react-step-progress/dist/index.css';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export default function PackageContent(props) {
    const { packaged, currentDriver, ...rest } = props;
    const data = [
        { title: 'Stop 1', letter: 'A', isCurrent: false },
        { title: 'Stop 2', letter: 'B', isCurrent: false },
        { title: 'Stop 3', letter: 'C', isCurrent: false },
        { title: 'Stop 4', letter: 'D', isCurrent: true },
        { title: 'Stop 5', letter: 'E', isCurrent: false },
      ];

// setup step validators, will be called before proceeding to the next step
const step2Validator = () => {
  // return a boolean
}

const step3Validator = () => {
  // return a boolean
}

const onFormSubmit = () => {
  // handle the submit logic here
  // This function will be executed at the last step
  // when the submit button (next button in the previous steps) is pressed
}

const steps = [
    {
      label: packaged.origin,
      name: packaged.origin,
    },
    {
      label: packaged.currentLocation,
      name: packaged.currentLocation,
      validator: step2Validator
    },
    {
      label: packaged.destination,
      name: packaged.destination,
      validator: step3Validator
    }
  ]
  console.log(steps)
    return (
        <Container className="package-div" fluid>
          <p className="display-5 overview">Package {packaged.id} Overview</p>
          <Row>
  <p className="header">Package Score</p>
  <p className="description"> This is our suspicion score for <span className="purpleSpan">Package {packaged.id}</span> that considers origin, driver's history, and the type of good being transferred.</p>
  <p className="display-5 score">{SuspiciousShipment(packaged.origin, currentDriver, packaged.dangerFlag) * 100} %</p>
</Row>
            <p className="header">Package Details</p>
            
            <Table bordered hover>
              <thead>
              <tr class="bg-dark text-white">
                <th>Status</th>
                <th>Price</th>
                <th>Weight</th>
                <th>Dimensions</th>
                <th>Content</th>
              </tr>
              </thead>
              <tbody>
                  <tr>
                  <td>
                  <PackageBadge badgeName={packaged.dangerFlag} />
                  </td>
                  <td>
              {packaged.price}
              </td>
              <td>
              {packaged.weight}
              </td>
              <td>
              {packaged.size}
              </td>
              <td>
              {packaged.content}
              </td>
            </tr>
                
              </tbody>

              
            </Table>
            <p className="header">Package Progress</p>
<StepProgressBar
  startingStep={2}
  onSubmit={onFormSubmit}
  steps={steps}
  primaryBtnClass="primaryButton"
  secondaryBtnClass="secondaryButton"
  subtitleClass="stepDes"
/>

        </Container>
    )
}