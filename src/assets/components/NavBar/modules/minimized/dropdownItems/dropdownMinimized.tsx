import { Row, Col } from 'react-bootstrap';
import CustomDropdown from '../../../controls/dropdowm_buttoms/CustomDropdown';
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
  


export const MinimizedDropdownNavBar = () => {
    return (
        <Col sm={3}>
            <Row className="displayAreaIcons">
                <Col sm={3}>
                    <div>
                        <span className="badge bg-primary badgeOs">1</span>
                        <div className="displayMin">
                            <CustomDropdown icon={faBell} items={alertItems} />
                        </div>
                    </div>
                </Col>
                <Col sm={3}>
                    <div className="displayMin">
                        <CustomDropdown icon={faUserCircle} items={userItems} />
                    </div>
                </Col>
            </Row>
        </Col>
    )
}