import { Card, Container, Row, Form, Col, Button } from "react-bootstrap";
import { ThemeContext } from "../../../../assets/components/NavBar/controls/controlTheme/SwitchContext";
import { useContext, forwardRef, useState, useEffect } from "react";
import { NumericFormat } from 'react-number-format';
import { getErrorMessage, validateQuantity, validateTextofDescription, validateDiferentText, validateBarCode, validateDimensions, valueInputMask, validateSupplierCode, validateWeight } from "../../../../assets/validators/validator";
import { api } from "../../../../api/admin/api_admin_management";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from '../../../../redux/store';
import { fetchSelectAllSector } from "../../../../redux/reducers/sectorsReducer";

interface SupplierData {
    supplierName: string;
    suppllierEmail: string;
    supplierState: string;
    supplierCity: string;
    supplierStreet: string;
    supplierNumber: string;
    supplierComplement: string;
    supplierNeighborhood: string;
    supplierZipCode: string;
    supplierPhone_01: string;
    supplierPhone_02: string;
    supplierCnpj: string;
}

interface DataSuppliersProps {
  supplierData?: SupplierData;
}

const CustomInput = forwardRef((props, ref) => <Form.Control {...props}  />);

export const DataSuppliers: React.FC<DataSuppliersProps> = ({supplierData}) => {
    const category = useSelector((state: RootState) => state.sectors);
    const dispatch = useDispatch<AppDispatch>();
    const { isTheme } = useContext(ThemeContext);


    const [addName, setAddName] = useState(supplierData?.supplierName ?? '');
    const [addEmail, setAddEmail] = useState(supplierData?.suppllierEmail ?? '');
    const [addState, setAddState] = useState(supplierData?.supplierState ?? '');
    const [addCity, setAddCity] = useState(supplierData?.supplierCity ?? '');
    const [addStreet, setAddStreet] = useState(supplierData?.supplierStreet ?? '');
    const [addNumber, setAddNumber] = useState(supplierData?.supplierNumber ?? '');
    const [addComplement, setAddComplment] = useState(supplierData?.supplierComplement ?? '');
    const [addNeighborhood, setAddNeighborhood] = useState(supplierData?.supplierNeighborhood ?? '');
    const [addZipCode, setAddZipCode] = useState(supplierData?.supplierZipCode ?? '');
    const [addPhone01, setAddPhone01] = useState(supplierData?.supplierPhone_01 ?? ''); 
    const [addPhone02, setAddPhone02] = useState(supplierData?.supplierPhone_02 ?? ''); 
    const [addCnpj, setAddCnpj] = useState(supplierData?.supplierCnpj ?? ''); 

    const [errorName, setErrorName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorState, setErrorState] = useState('');
    const [errorCity, setErrorCity] = useState('');
    const [errorStreet, setErrorStreet] = useState('');
    const [errorNumber, setErrorNumber] = useState('');
    const [errorComplment, setErrorComplment] = useState('');
    const [errorNeighborhood, setErrorNeighborhood] = useState('');
    const [errorZipCode, setErrorZipCode] = useState('');
    const [errorPhone01, setErrorPhone01] = useState(''); 
    const [errordPhone02, setErrorPhone02] = useState(''); 
    const [errorCnpj, setErrorCnpj] = useState(''); 



  
    useEffect(() => {
      dispatch(fetchSelectAllSector());
    }, [dispatch]);
    
        return (
            <>
              <section className="mt-4">
                <Container fluid>
                  <Row className="cardAddSuppliers">
                    <Card bg={`${isTheme ? 'dark' : 'white'}`} className="shadow">
                      <Card.Body>
                        <Card.Title className="text-center">Adicionar Fornecedor</Card.Title>
                        <Form>
                          <Row  className="mt-3">
                            <Col lg={3}>
                              <Form.Group controlId="supplierName">
                                <Form.Label>Fornecedor</Form.Label>
                                <Form.Control type="text" required maxLength={100} value={addName} />
                                <p className="errorInfo">{errorName}</p>
                              </Form.Group>
                            </Col>
                            <Col lg={3}>
                              <Form.Group controlId="supplierEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" maxLength={100} value={addEmail}/>
                                <p className="errorInfo">{errorEmail}</p>
                              </Form.Group>
                            </Col>
                            <Col lg={2}>
                              <Form.Group controlId="cep">
                                <Form.Label>Cep</Form.Label>
                                <Form.Control type="text" maxLength={100} value={addZipCode}/>
                                <p className="errorInfo">{errorZipCode}</p>
                              </Form.Group>
                            </Col>
                            <Col lg={4}>
                              <Form.Group controlId="bairro">
                                <Form.Label>Bairro</Form.Label>
                                <Form.Control type="text" maxLength={100} value={addNeighborhood}/>
                                <p className="errorInfo">{errorNeighborhood}</p>
                              </Form.Group>
                            </Col>
                            </Row>
                            <Row>
                            <Col lg={4}>
                              <Form.Group controlId="Rua">
                                <Form.Label>Rua</Form.Label>
                                <Form.Control type="text" maxLength={100} value={addStreet}/>
                                <p className="errorInfo">{errorStreet}</p>
                              </Form.Group>
                            </Col>
                            <Col lg={2}>
                              <Form.Group controlId="Número">
                                <Form.Label>Número</Form.Label>
                                <Form.Control type="number" maxLength={100} value={addNumber}/>
                                <p className="errorInfo">{errorNumber}</p>
                              </Form.Group>
                            </Col>
                            <Col lg={4}>
                              <Form.Group controlId="Complemento">
                                <Form.Label>Complemento</Form.Label>
                                <Form.Control type="text" maxLength={100} value={addComplement}/>
                                <p className="errorInfo">{errorComplment}</p>
                              </Form.Group>
                            </Col>
                            </Row>
                            <Row>
                              <Col lg={1}>
                                <Form.Group controlId="Estado">
                                  <Form.Label>Estado</Form.Label>
                                  <Form.Control type="text" maxLength={100} value={addState}/>
                                  <p className="errorInfo">{errorState}</p>
                                </Form.Group>
                              </Col>
                              <Col lg={3}>
                                <Form.Group controlId="Cidade">
                                  <Form.Label>Cidade</Form.Label>
                                  <Form.Control type="text" maxLength={100} value={addCity}/>
                                  <p className="errorInfo">{errorCity}</p>
                                </Form.Group>
                              </Col>
                              <Col lg={3}>
                                <Form.Group controlId="Telefone 1">
                                  <Form.Label>Telefone 1</Form.Label>
                                  <Form.Control type="text" maxLength={100} value={addPhone01}/>
                                  <p className="errorInfo">{errorCity}</p>
                                </Form.Group>
                              </Col>
                              <Col lg={3}>
                                <Form.Group controlId="Telefone 2">
                                  <Form.Label>Telefone 2</Form.Label>
                                  <Form.Control type="text" maxLength={100} value={addPhone02}/>
                                  <p className="errorInfo">{errorCity}</p>
                                </Form.Group>
                              </Col>
                            </Row>                         
                              <Row className="mt-3">
                                  <Col>
                                      <Button variant="primary">
                                          Salvar
                                      </Button>
                                  </Col>
                              </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </section>
    </>
    )
}

export default DataSuppliers;