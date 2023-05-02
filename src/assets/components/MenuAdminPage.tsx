import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./NavBar/css/MenuAdminPage.css";
import useNavBarController from "./NavBar/controls/control_navBar/ControlNavBar";
import CarouselPage from "./NavBar/modules/minimized/carousel/Carousel";
import { FirstMenu } from "./NavBar/modules/expanded/item1";
import { SecondMenu } from "./NavBar/modules/expanded/Item2";
import { ThirdMenu } from "./NavBar/modules/expanded/item3";
import { MinimizedControls } from "./NavBar/modules/minimized/controls/minimizedControls";
import { MinimizedDropdownNavBar } from "./NavBar/modules/minimized/dropdownItems/dropdownMinimized";
import CircularMenu from "./NavBar/modules/smart/circuleMenu";



const MenuAdminPage: React.FC = () => {
  const { navBarRef, navBarSlideAreaRef } = useNavBarController();


  return (
    <>
    <Container fluid className="styleContainer">
      <Container fluid ref={navBarSlideAreaRef} className="navBarSlideArea hidden">
        <Row ref={navBarRef} className="navBarRow hidden dark">
          <Col sm={2} className="menuArea item1">
            <FirstMenu/>
          </Col>


          <Col className="menuArea item2">
           <SecondMenu/>
          </Col>


          <Col sm={2} className="item3">
            <ThirdMenu/>
          </Col>


          <Row className="minimized">
              <CarouselPage />
              <MinimizedControls/>
              <MinimizedDropdownNavBar/>                                     
          </Row>          
        </Row>

      </Container>
    </Container>
    <CircularMenu/>
    </>
  );
};

export default MenuAdminPage;
