import React, { forwardRef, useEffect, useState, ChangeEvent } from "react";
import { Col, InputGroup, Row, Form } from "react-bootstrap";
import { fetchSelectAllSector } from "../../../../redux/reducers/sectorsReducer";
import { useSelector } from "react-redux";
import {RootState, AppDispatch} from "../../../../redux/store"
import { useDispatch } from "react-redux";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import { api } from "../../../../api/admin/api_admin_user";

interface FormFilterProps {
    enumProduct: any; 
    fetchData: () => Promise<void>; 
  }



const CustomInput = forwardRef((props, ref) => <Form.Control {...props}  />);

export const FormFilter: React.FC<FormFilterProps> = ({ enumProduct, fetchData }) => {
    const category = useSelector((state: RootState) => state.sectors);
    
    const dispatch = useDispatch<AppDispatch>();


    const [getCust, setGetCust] = useState('');
    const [getResaleValue, setGetResaleValue] = useState('');
    const [getTax, setGetTax] = useState('');
    const [getQuantity, setGetQuantity] = useState('');
    const [getRestockTime, setGetRestockTime] = useState('');
    const [getSupplierCode, setGetSupplierCode] = useState('');
    const [getReorderPoint, setGetReorderPoint] = useState('');
    const [getMaterialOrIngredients, setGetMaterialOrIngredients] = useState(''); 
    const [getSafetyRating, setGetSafetyRating] = useState('');
    const [getShippingRestrictions, setGetShippingRestrictions] = useState(''); 

    const [paginationData, setPaginationData] = useState({
        list: [],
        next: '',
        prev: '',
        total: 0,
        pages: 1,
        page: 1,
        per_page: 50
      });

    const [selectedValue, setSelectedValue] = useState(paginationData.per_page);

    useEffect(() => {
        dispatch(fetchSelectAllSector());
      }, [dispatch]);

    


    const handleGetCust = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGetCust(event.target.value);
      };


    const handleGetResaleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGetResaleValue(event.target.value);
      };

    
    const handleGetTax = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGetTax(event.target.value);
      };

    
    const handleGetRestockTime = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement;
        const inputValue = input.value.replace(/\D/g, ''); 
        input.value = inputValue; 
        setGetRestockTime(inputValue);
    };

    
    const handleGetQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value.replace(/\D/g, ''); 
    input.value = inputValue; 
        setGetQuantity(inputValue);
    };

    const handleGetSupplierCode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGetSupplierCode(event.target.value);
    };

    const handleGetReorderPoint = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement;
        const inputValue = input.value.replace(/\D/g, ''); 
        input.value = inputValue; 
        setGetReorderPoint(inputValue);
    };


    const handleGetMaterialOrIngredients = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGetMaterialOrIngredients(event.target.value);
    };

    const handleGetSafetyRating = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGetSafetyRating(event.target.value);
    };

    
    const handleGetShippingRestrictions = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGetShippingRestrictions(event.target.value);
    };

    
    const handleQtProd = async (event: ChangeEvent<HTMLSelectElement>) => {
        const selectEnumListProd = parseInt(event.target.value);
        const updateQtPerPage = await api.updatePerPageProductsEnum(selectEnumListProd);
        fetchData();
        setSelectedValue(selectEnumListProd);
        if (isNaN(selectEnumListProd)) {
          console.error('Valor impossível de ser convertido');
          return;
        }
      };
      

      
    return (
        <>
            <Form>
            <Row>
                <Col lg={3}>
                    <Form.Group className="mb-3" controlId="formFilterSearch">
                        <Form.Label>Filtro de busca</Form.Label>
                        <Form.Select aria-label="Filtro de busca" id='filterSearch' defaultValue="nome">
                          <option value="nome">Nome</option>
                          <option value="barcode">Cod. Barras</option>
                          <option value="fornecedor">Fornecedor</option>
                          <option value="setor">Categoria</option>
                          <option value="descricao">Descrição</option>
                          <option value="fabricante">Fabricante</option>
                        </Form.Select>
                    </Form.Group>
                    </Col>
                    <Col lg={5}>
                        <Form.Label>Buscar</Form.Label>
                        <InputGroup>
                          <Form.Control type="text" placeholder="Procurar por produto" aria-describedby="buttonSearch" id='searchProduct'/>
                        </InputGroup>
                    </Col>
                  <Col lg={2} className='formQtList'>
                    <Form.Label>Quantidade</Form.Label>
                    <Form.Select 
                          aria-label="qtList" 
                          onChange={handleQtProd}
                          value={selectedValue}>
                          {enumProduct.map((value:any, index: any) => (
                              <option key={index} value={value}>{value}</option>
                          ))}
                    </Form.Select>
                  </Col>
                  <Col lg={2} className='toPageAddProduct'>
                    <Link className='btnAddProduct' to="adicionarprodutos" >Adicioanr Produto</Link>
                  </Col>                  
                </Row>
                <Row>
                    <Col lg={2}>
                    <Form.Group className="mb-3" controlId="sector">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Select>
                            {category.sectors.map((sector) => (
                                <option key={sector} value={sector}>{sector}
                                </option>
                                ))}
                        </Form.Select>
                    </Form.Group>
                    </Col>

                    <Col lg={2}>
                            <Form.Group controlId="productCust">
                                <Form.Label>Valor de compra</Form.Label>
                                <NumericFormat thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true} prefix={'R$ '} required value={getCust} onChange={handleGetCust} customInput={CustomInput}/>
                            </Form.Group>
                    </Col>

                    <Col lg={2}>
                        <Form.Group controlId="productResaleValue">
                                <Form.Label>Valor de venda</Form.Label>
                                <NumericFormat thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true} prefix={'R$ '} required value={getResaleValue} onChange={handleGetResaleValue} customInput={CustomInput}/>
                        </Form.Group>
                    </Col>

                    <Col lg={2}>
                        <Form.Group controlId="productTax">
                                <Form.Label>Imposto</Form.Label>
                                <NumericFormat suffix={'%'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true} value={getTax} onChange={handleGetTax} customInput={CustomInput}/>
                        </Form.Group>
                    </Col>

                    <Col lg={2}>
                        <Form.Group controlId="productQuantity">
                                <Form.Label>Quantidade</Form.Label>
                                <Form.Control  
                                  type="text"
                                  pattern="[0-9]*"
                                  inputMode="numeric"
                                  required
                                  value={getQuantity}
                                  onInput={handleGetQuantity} />
                        </Form.Group>
                    </Col>
                    <Col lg={2}>
                        <Form.Group controlId="productRestockTime">
                                <Form.Label>Tempo de reposição</Form.Label>
                                <Form.Control 
                                    type="text"
                                    pattern="[0-9]*"
                                    inputMode="numeric" value={getRestockTime} 
                                    onChange={handleGetRestockTime} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col lg={2}>
                        <Form.Group controlId="productSupplierCode">
                                <Form.Label>Codigo do fornecedor</Form.Label>
                                <Form.Control type="text" maxLength={50} value={getSupplierCode} onChange={handleGetSupplierCode} />
                        </Form.Group>
                    </Col>

                    <Col lg={2}>
                        <Form.Group controlId="productReorderPoint">
                                <Form.Label>Ponto de reordenação</Form.Label>
                                <Form.Control
                                    type="text"
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                    value={getReorderPoint}
                                    onChange={handleGetReorderPoint}
                                  />
                        </Form.Group>
                    </Col>

                    <Col lg={2}>
                        <Form.Group controlId="productMaterialOrIngredients">
                                <Form.Label>Material/Ingrediente</Form.Label>
                                <Form.Control type="text" value={getMaterialOrIngredients} onChange={handleGetMaterialOrIngredients} />
                        </Form.Group>
                    </Col>

                    <Col lg={3}>
                            <Form.Group controlId="productSafetyRating">
                                <Form.Label>Classificaçao de segurança</Form.Label>
                                <Form.Control type="text" value={getSafetyRating} onChange={handleGetSafetyRating} />
                            </Form.Group>
                    </Col>

                    <Col lg={3}>
                        <Form.Group controlId="productShippingRestrictions">
                            <Form.Label>Restrições de envio</Form.Label>
                                <Form.Control type="text" value={getShippingRestrictions} onChange={handleGetShippingRestrictions} />             
                        </Form.Group>
                    </Col>
                </Row>
            </Form>

        </>
    )
}
