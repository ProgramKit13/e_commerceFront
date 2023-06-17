import { GroupControlsGestao } from "./SubPagesGestao/groupControlsGestao";
import { Container, Row } from "react-bootstrap";
import './styles/global/global.css'
import { Route, Routes } from "react-router-dom";
import {Produtos} from "./SubPagesGestao/produtos/produtos";
import { Clientes } from "./SubPagesGestao/clientes/Clientes";
import { Financeiro } from "./SubPagesGestao/financeiro/financeiro";
import { Fornecedores } from "./SubPagesGestao/fornecedores/fornecedores";
import { NotFound } from "./NotFound";
import { InterceptResponseFormProvider } from "../assets/components/Gestao/interceptResponseForm";
import AdcProdutos from "./SubPagesGestao/produtos/components/DataProducts";
import { InfoProdutos } from "./SubPagesGestao/produtos/components/DescriptionProducts";


const AxiosAdminRoutesGestao = () => {
  return (
    <Routes>
      <Route path="/" element={<InterceptResponseFormProvider><Produtos/></InterceptResponseFormProvider>} />
      <Route path="adicionarprodutos" element={<InterceptResponseFormProvider><AdcProdutos/></InterceptResponseFormProvider>} />
      <Route path="produtos" element={<InterceptResponseFormProvider><Produtos/></InterceptResponseFormProvider>} />
      <Route path="produtos/adicionarprodutos" element={<InterceptResponseFormProvider><AdcProdutos/></InterceptResponseFormProvider>} />
      <Route path="produtos/descricao/:slug" element={<InterceptResponseFormProvider><InfoProdutos/></InterceptResponseFormProvider>} />
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
        <Row className="groupControlRow">
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
