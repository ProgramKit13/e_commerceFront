import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./NavBar/css/MenuAdminPage.css";
import CarouselPage from "./NavBar/modules/minimized/carousel/Carousel";
import { FirstMenu } from "./NavBar/modules/expanded/item1";
import { SecondMenu } from "./NavBar/modules/expanded/Item2";
import { ThirdMenu } from "./NavBar/modules/expanded/item3";
import { MinimizedControls } from "./NavBar/modules/minimized/controls/minimizedControls";
import { MinimizedDropdownNavBar } from "./NavBar/modules/minimized/dropdownItems/dropdownMinimized";
import CircularMenu from "./NavBar/modules/smart/circuleMenu";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Gestao from "../../pages/Gestao";
import { NotFound } from "../../pages/NotFound";
import { setupResizeHandler } from "./NavBar/controls/contentControls/resizeContentPage";
import { useEffect } from "react";
import { ThemeContext, TopBarContext} from "./NavBar/controls/controlTheme/SwitchContext";





const AxiosAdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="dashboard" element={<Home />} />
      <Route path="gestao/*" element={<Gestao />} />
      <Route path="ambiente" element={<Gestao />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};



const MenuAdminPage: React.FC = () => {
  const { isTheme } = React.useContext(ThemeContext);
  const { isTopBar } = React.useContext(TopBarContext);
  
  return (
    <div className={`body ${isTheme ? 'bodyDashAdminDark' : 'bodyDashAdminWhite'}`}>
      <Container fluid className="styleContainer">
        <Container fluid className={`navBarSlideArea ${isTopBar ? 'hidden' : 'visible'} ${isTheme ? 'slideBarDark' : 'slideBarWhite' }`}>
          
          <Row className={`navBarRow ${isTopBar ? 'hidden' : 'visible'} ${isTheme ? 'dark' : 'white'}`}>

            <Col sm={2} className="menuArea item1">
              <FirstMenu />
            </Col>
            <Col className="menuArea item2">
              <SecondMenu />
            </Col>
            <Col sm={2} className="item3">
              <ThirdMenu />
            </Col>
            <Row className="minimized">
              <CarouselPage />
              <MinimizedControls />
              <MinimizedDropdownNavBar />
            </Row>
          </Row>
        </Container>
      </Container>
      <Container fluid id="displayPageContainer" className={`pageContainer ${isTopBar ? 'upContentPage' : 'downContentPage'}`}>
        <AxiosAdminRoutes />
      </Container>
      <CircularMenu />
    </div>
  );
};

export default MenuAdminPage;
