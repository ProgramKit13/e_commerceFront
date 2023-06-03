import { Col, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { ControlButton } from '../../assets/components/Gestao/ControlButtomDefault';
import './produtos/css/styles.css';

export const GroupControlsGestao = () => {
  const location = useLocation();
  const getPageName = () => {
    const path = location.pathname;
    console.log(path);
    switch (path) {
      case '/axiosadmin/gestao/produtos':
        return 'Produtos';
      case '/axiosadmin/gestao/clientes':
        return 'Clientes';
      case '/axiosadmin/gestao/financeiro':
        return 'Financeiro';
      case '/axiosadmin/gestao/fornecedores':
        return 'Fornecedores';
      default:
        return '';
    }
  };

  const pageName = getPageName();

  return (
    <>
      <Row>
        <Col>
          <div className="groupControlGestaoButtons">
            <ControlButton to="produtos" label="Produtos" />
            <ControlButton to="clientes" label="Clientes" />
            <ControlButton to="financeiro" label="Financeiro" />
            <ControlButton to="fornecedores" label="Fornecedores" />
          </div>
        </Col>
        <Col>
          <h1 className="namePage">{pageName}</h1>
        </Col>
      </Row>
    </>
  );
};
