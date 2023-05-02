import { Row, Col } from 'react-bootstrap';
import CustomDropdown from '../../controls/dropdowm_buttoms/CustomDropdown';
import { faBell, faUserCircle } from "@fortawesome/free-solid-svg-icons";

const alertItems = [
    { text: "First Item", href: "#" },
    { text: "Second Item", href: "#" },
    { text: "Third Item", href: "#" },
  ];
  
  const userItems = [
    { text: "First Item", href: "#" },
    { text: "Second Item", href: "#" },
    { text: "Third Item", href: "#" },
  ];
  


export const ThirdMenu = () => {
    return (
        <Row className="aligItem3">
        <Col className="colItems3" sm={6}>
          <div className="alertArea">
            <span className="badge bg-primary badgeOs">1</span>
            <CustomDropdown icon={faBell} items={alertItems} />
          </div>
        </Col>
        <Col sm={6} className="colItems3">
          <CustomDropdown icon={faUserCircle} items={userItems} />
        </Col>
        </Row>
    )
}