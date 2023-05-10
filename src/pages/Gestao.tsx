import { GroupControlsGestao } from "./SubPagesGestao/groupControlsGestao";
import { Container, Row } from "react-bootstrap";
import './styles/global/global.css'
import { Route, Routes } from "react-router-dom";
import {Produtos} from "./SubPagesGestao/produtos/produtos";
import { Clientes } from "./SubPagesGestao/clientes/Clientes";
import { Financeiro } from "./SubPagesGestao/financeiro/financeiro";
import { Fornecedores } from "./SubPagesGestao/fornecedores/fornecedores";
import { NotFound } from "./NotFound";


const AxiosAdminRoutesGestao = () => {
  return (
    <Routes>
      <Route path="/" element={<Produtos/>} />
      <Route path="produtos" element={<Produtos/>} />
      <Route path="clientes" element={<Clientes/>} />
      <Route path="financeiro" element={<Financeiro />} />
      <Route path="fornecedores" element={<Fornecedores />} /> 
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export const Gestao = () => {
  return (
    <>
      <Container className="bodyContainerAdmin">
        <Row>
          <GroupControlsGestao/>
        </Row>
        <Row>
          <AxiosAdminRoutesGestao/>
        </Row>
      </Container>
    </>
  );
};

export default Gestao;
