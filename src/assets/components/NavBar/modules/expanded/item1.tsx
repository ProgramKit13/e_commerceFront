import { faChartLine, faThLarge, faDesktop } from "@fortawesome/free-solid-svg-icons";
import {Row, Col } from "react-bootstrap";
import ControlButton from "../../controls/simple_buttoms/ControlButton";

export const FirstMenu = () => {
    return (
        <Row className="controlIcons">
        <Col className="controlsPage">
          <ControlButton icon={faChartLine} title="Dashboard" colorClass="dashBoardControl" to="dashboard"/>
        </Col>
        <Col className="controlsPage control2">
          <ControlButton icon={faThLarge} title="Gestão" colorClass="adminControl" to="gestao"/>
        </Col>
        <Col className="controlsPage control3">
          <ControlButton icon={faDesktop} title="Ambiente" colorClass="plataformControl" to="ambiente" />
        </Col>
      </Row>
    )
}