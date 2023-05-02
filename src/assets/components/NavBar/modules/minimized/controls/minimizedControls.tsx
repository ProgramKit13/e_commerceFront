import { faChartLine, faThLarge, faDesktop } from "@fortawesome/free-solid-svg-icons";
import {Row, Col } from "react-bootstrap";
import ControlButton from "../../../controls/simple_buttoms/ControlButton";

export const MinimizedControls = () => {
    return (
        <Col sm={6} className="controlDisplayMin">
            <Row className="rowDisplayMin">
            <Col sm={3} className="controlsPage control1">
            <ControlButton icon={faChartLine} title="Dashboard" colorClass="dashBoardControl"/>
            </Col>
            <Col sm={3} className="controlsPage control2">
            <ControlButton icon={faThLarge} title="Gestão" colorClass="adminControl"/>
            </Col>
            <Col sm={3} className="controlsPage control3">
            <ControlButton icon={faDesktop} title="Ambiente" colorClass="plataformControl" />
            </Col>
        </Row>
      </Col>
    )
}