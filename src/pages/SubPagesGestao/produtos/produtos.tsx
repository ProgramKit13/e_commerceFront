import { Container, Row, Col, Card, Table, Form, Button, Pagination } from 'react-bootstrap';
import DataTableBody from './components/DataTableBody';
import { MdAddCircle } from 'react-icons/md';
import { api } from '../../../api/admin/api_admin_management';
import { useInterceptResponseFormContext  } from '../../../assets/components/Gestao/interceptResponseForm';
import { useContext, useEffect, useState, ChangeEvent, forwardRef } from 'react';
import './css/styles.css';
import AdvancedPagination from '../../../assets/components/Gestao/Pagination.Default';
import { ThemeContext } from '../../../assets/components/NavBar/controls/controlTheme/SwitchContext';
import InputGroup from 'react-bootstrap/InputGroup';
import {  Link } from 'react-router-dom';
import { NumericFormat } from "react-number-format";

const CustomInput = forwardRef((props, ref) => <Form.Control {...props}  />);
const proprietyEnum = 'productsPerPage';
const urlLocation = 'produtos'
interface Product {
  token: string;
  prodName: string;
  valueResale: number;
  discount: number;
  tax: number;
  qt: number;
  restockTime: string;
  supplier: string;
  sector: string;
  barcode: string;
}

export const Produtos  = () => {
  const [loading, setLoading] = useState(true);
  const { confirm, interceptResponseForm } = useInterceptResponseFormContext();
  const { isTheme } = useContext(ThemeContext);
  const [productList, setProductList] = useState([]);
  const [enumProduct, setEnumProduct] = useState([]);
  const [sectorList, setSectorList] = useState([]);
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
  const [activeFilters, setActiveFilters] = useState<{ [key: string]: string | number } | null>(null);

  const mapProductData = (product: Product) => ({
    token: product.token,
    produto: product.prodName,
    vCusto: product.valueResale,
    vRevenda: product.valueResale,
    mDisc: product.discount,
    vImpos: product.tax,
    qt: product.qt,
    reposicao: product.restockTime,
    fornecedor: product.supplier,
    setor: product.sector,
    cod: product.barcode
  });

  const fetchData = async (filters?: { [key: string]: any }, page: number = paginationData.page) => {
    setLoading(true);
    const response = await api.getAndSearch(filters, page, urlLocation);
    const getEnumProduct = await api.getEnumPerPage(proprietyEnum);
    setEnumProduct(getEnumProduct.data);
    if (response.code === 200 && response.data.listData !== undefined) {
      const { listData, pagination } = response.data;
      const updatedProductList = listData.map(mapProductData);
      setSelectedValue(pagination.per_page);
      setProductList(updatedProductList);
      setPaginationData({
        ...paginationData,
        total: pagination.total,
        pages: pagination.pages,
        page: pagination.page,
        per_page: pagination.per_page,
      });
      setLoading(false);
    } 
    
    else if (response.code == 200 && response.data.listData == undefined) {
      setLoading(false);
    }

    else {
      alert('Erro ao carregar produtos!');
      setLoading(false);
    }

    setLoading(false);
  };

  const formatNumber = (value: string): number => {
  const numericValue = value.replace(/[^0-9.,]/g, ''); // Remover caracteres indesejados
  const parsedValue = numericValue.replace(',', '.'); // Substituir vírgulas por pontos para formatar corretamente o número
  return parseFloat(parsedValue);
};

const handleSearch = async () => {
  const inputElement = document.getElementById('searchProduct') as HTMLInputElement;
  const inputElementSearch = document.getElementById('filterSearch') as HTMLInputElement;
  if (inputElement && inputElementSearch && Object.keys(productList).length > 0) {
    const searchValue = inputElement.value;
    const filterField = inputElementSearch.value;

    const filters: { [key: string]: string | number} = {
      [filterField]: searchValue,
    };
  
    if (getCust !== '') {
      filters.cust = formatNumber(getCust);
    }
    if (getResaleValue !== '') {
      filters.valueResale = formatNumber(getResaleValue);
    }
    if (getTax !== '') {
      filters.tax = formatNumber(getTax);
    }
    if (getQuantity !== '') {
      filters.qt = formatNumber(getQuantity);
    }
    if (getRestockTime !== '') {
      filters.restockTime = formatNumber(getRestockTime);
    }
    if (getSupplierCode !== '') {
      filters.supplierCode = formatNumber(getSupplierCode);
    }
    if (getReorderPoint !== '') {
      filters.reorderPoint = formatNumber(getReorderPoint);
    }
    if (getMaterialOrIngredients !== '') {
      filters.materialOrIngredients = getMaterialOrIngredients;
    }
    if (getSafetyRating !== '') {
      filters.safetyRating = getSafetyRating;
    }
    if (getShippingRestrictions !== '') {
      filters.shippingRestrictions = getShippingRestrictions;
    }
    setActiveFilters(filters);
    fetchData(filters);
  } else {
    alert('Produto não encontrado.');
  }
};

const handleClearSearch = async () => {
  const inputElement = document.getElementById('searchProduct') as HTMLInputElement;
  const inputElementSearch = document.getElementById('filterSearch') as HTMLInputElement;
  if (inputElement && inputElementSearch) {
    inputElement.value = '';
    inputElementSearch.value = 'nome';
    setGetCust('');
    setGetResaleValue('');
    setGetTax('');
    setGetQuantity('');
    setGetRestockTime('');
    setGetSupplierCode('');
    setGetReorderPoint('');
    setGetMaterialOrIngredients('');
    setGetSafetyRating('');
    setGetShippingRestrictions('');
    setActiveFilters(null);
    fetchData();
  } 
};

const handleQtProd = async (event: ChangeEvent<HTMLSelectElement>) => {
    const selectEnumListProd = parseInt(event.target.value);
    const updateQtPerPage = await api.updatePerPage(proprietyEnum, selectEnumListProd);
    if (updateQtPerPage.code === 200) {
      setPaginationData(prevState => ({
        ...prevState, 
        per_page: selectEnumListProd, 
        page: 1
      }));
      setSelectedValue(selectEnumListProd);
  
      if (activeFilters) {
         await fetchData(activeFilters, 1);
      } else {
         await fetchData(undefined, 1);
      }
    } else {
      alert('Erro ao obter os produtos');
    }
  };

  useEffect(() => {
    fetchData(activeFilters || {}, paginationData.page);
  }, [paginationData.page, selectedValue, paginationData.per_page]);


  const handleNext = () => {
    if (paginationData.page < paginationData.pages) {
      const newPage = paginationData.page + 1;
      setPaginationData({...paginationData, page: newPage});
      if (activeFilters) {
        fetchData(activeFilters, newPage);
      }
    }
  };

  const handlePrev = () => {
    if (paginationData.page > 1) {
      const newPage = paginationData.page - 1;
      setPaginationData({...paginationData, page: newPage});
      if (activeFilters) {
        fetchData(activeFilters, newPage);
      }
    }
  };
  
  const handleFirst = () => {
    setPaginationData({...paginationData, page: 1});
    if (activeFilters) {
      fetchData(activeFilters, 1);
    }
  };
  
  const handleLast = () => {
    const lastPage = paginationData.pages;
    setPaginationData({...paginationData, page: lastPage});
    if (activeFilters) {
      fetchData(activeFilters, lastPage);
    }
  };


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

  



    return (
        <>
           <section className="mt-4">
      <Container fluid>
        <Row className='cardProducts'>
          <Col>
            <Card bg={`${isTheme ? 'dark' : 'white'}`} className="shadow">
              <Card.Header className="py-2 alignCardHeader">
              <Form>
            <Row>
                <Col lg={3}>
                    <Form.Group className="mb-3" controlId="formFilterSearch">
                        <Form.Label>Filtro de busca</Form.Label>
                        <Form.Select aria-label="Filtro de busca" id='filterSearch' defaultValue="nome">
                          <option value="produto_nome">Nome</option>
                          <option value="produto_barcode">Cod. Barras</option>
                          <option value="produto_fornecedor">Fornecedor</option>
                          <option value="produto_setor">Categoria</option>
                          <option value="produto_descricao">Descrição</option>
                          <option value="produto_fabricante">Fabricante</option>
                        </Form.Select>
                    </Form.Group>
                    </Col>
                    <Col lg={5}>
                        <Form.Label>Buscar</Form.Label>
                        <InputGroup>
                          <Form.Control type="text" placeholder="Procurar por produto" id='searchProduct'/>
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
                            {sectorList.map((sector) => (
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
                <Row>
                  <Col sm={1}>
                    <Button variant="outline-secondary" className='btnFilter mt-3' onClick={handleSearch}  >
                      Filtrar
                    </Button>
                  </Col>
                  <Col sm={1}>
                    <Button variant="outline-secondary" className='btnFilter mt-3' onClick={handleClearSearch}  >
                      Limpar
                    </Button>
                  </Col>
                </Row>            
              </Card.Header>
            {loading ? (
              <div className='loading'>Loading</div>
            ) : (
              <div>
              <Card.Body>
                <div className="table-responsive table mb-0 pt-3 pe-2 tableProdResponse">
                  <Table className={`table-striped table-hover ${isTheme ? 'table-dark' : ''} table-sm my-0 mydatatable`}>
                  <thead>
                      <tr>
                        <th>Produto</th>
                        <th>Custo</th>
                        <th>Revenda</th>
                        <th>Desconto</th>
                        <th>Imposto</th>
                        <th>Quantidade</th>
                        <th>Reposição</th>
                        <th>Fornecedor</th>
                        <th>Categoria</th>
                        <th>Cod</th>
                      </tr>
                    </thead>
                    <DataTableBody data={productList} />
                  </Table>              
                </div>
              </Card.Body>
              <Card.Footer className='cardFooterProducts'>
                <Row>
                  <Col>
                  <AdvancedPagination 
                        items={Array.from({length: paginationData.pages}, (_, i) => i + 1)} 
                        active={paginationData.page} 
                        onClick={(page) => setPaginationData(prevState => ({...prevState, page}))} 
                        onNext={handleNext}
                        onPrev={handlePrev}
                        onFirst={handleFirst}
                        onLast={handleLast}
                      />
                  </Col>
                  <Col>
                    <div className="d-flex align-items-center justify-content-end">
                      <span className="me-2">Total: {`${paginationData.total}`}</span>
                    </div>
                  </Col>
                </Row>
              </Card.Footer>
              </div>
            )}
            </Card>
          </Col>
        </Row>

      </Container>
    </section>
       </>
    )
}