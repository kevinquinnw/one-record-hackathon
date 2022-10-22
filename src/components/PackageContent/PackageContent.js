import PackageBadge from "../PackageBadge";
import './packagecontent.css'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MapProgress from "../MapProgress";
import {Airplane, AirplaneFill, ArrowDown, CarFrontFill} from 'react-bootstrap-icons';
// import the progress bar
import StepProgressBar from 'react-step-progress';
// import the stylesheet
import 'react-step-progress/dist/index.css';

export default function PackageContent(props) {
    const { packaged, ...rest } = props;
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
            <Row>
                <Col>
                <p className="header">Package Details</p>
            <div className="tag-group">
            <PackageBadge badgeName={`#${packaged.packageID}`}/>
            <br />
            <PackageBadge badgeName={packaged.dangerFlag} />
            </div>
            </Col>
            </Row>
            {/* <p className="subheader">Weight</p>
            <p>{packaged.weight}</p>
            <p className="subheader">Dimensions</p>
            <p>{packaged.dimensions}</p>
            <p className="subheader">Content</p>
            <p>{packaged.content}</p>
                </Col>
                <Col>
                <p className="header">Vehicle Details</p>
            <p>{packaged.vehicleId}</p>
            <p>{packaged.shipmentId}</p>
                </Col>
            </Row>
            <Row className="destinations">
                <p className="header">Package Progress</p>
                {packaged.currentLocations.map((location, index) => <Row className="yessir">{index === 0 ? null : index === 1 ? <> <ArrowDown className="icons" size={24} /> <CarFrontFill className="icons" size={24} color="#fd7e14"/> <ArrowDown className="icons" size={24} /> </>: <><ArrowDown className="icons" size={24} /><AirplaneFill className="icons" size={24} color="#20c997"/> <ArrowDown className="icons" size={24} /></>} <p>{location}</p></Row>)}
            </Row> */}
<StepProgressBar
  startingStep={2}
  onSubmit={onFormSubmit}
  steps={steps}
  primaryBtnClass="primaryButton"
  secondaryBtnClass="secondaryButton"
/>
        </Container>
    )
}