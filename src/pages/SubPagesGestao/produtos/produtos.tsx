import { Container, Row, Col, Card, Table, Form, Button } from 'react-bootstrap';
import DataTableBody from './components/DataTableBody';
import ReusableModal from '../../../assets/components/Gestao/ReusableModal';
import { MdAddCircle } from 'react-icons/md';
import ProductForm from './components/BodyAddProduct';
import { validateText, getErrorMessage, valueInput, validateQuantity, validateTextofDescription, isValidDate } from '../../../assets/validators/validator';
import { api } from '../../../api/admin/api_admin_products';
import { useInterceptResponseFormContext  } from '../../../assets/components/Gestao/interceptResponseForm';
import { useContext, useEffect, useState, ChangeEvent } from 'react';
import './css/styles.css';
import AdvancedPagination from '../../../assets/components/Gestao/Pagination.Default';
import { ThemeContext } from '../../../assets/components/NavBar/controls/controlTheme/SwitchContext';
import InputGroup from 'react-bootstrap/InputGroup';
import { FormFilter } from './components/FormFilter';




export const Produtos  = () => {
  const { confirm, interceptResponseForm } = useInterceptResponseFormContext();
  const { isTheme } = useContext(ThemeContext);
  const [totalProducts, setTotalProducts] = useState(0);
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


  const fetchData = async () => {
    const inputElement = document.getElementById('searchProduct') as HTMLInputElement;
    if (inputElement && inputElement.value !== "") {
      handleSearch();
      return;
    }
  
    const listAllProducts = await api.consultAdminProducts(paginationData.page);
    if (listAllProducts.code === 200) {
      setPaginationData(listAllProducts.data.products);
      const sectorsList = listAllProducts.data.sectors;
      const totalProducts = listAllProducts.data.products.total;
      const enumProduct = listAllProducts.data.enum;
      setEnumProduct(enumProduct);
      setTotalProducts(totalProducts);
      setSectorList(sectorsList);
      console.log(sectorList)
      const productList = listAllProducts.data.products.list.map((product: any) => {
        return {
          token: product.token,
          produto: product.prodName,
          vRevenda: product.valueResale,
          vCusto: product.valueResale,
          mDesc: product.discount,
          qt: product.qt,
          fornecedor: product.supplier,
          setor: product.sector
        };
      });
      setProductList(productList);
    } else {
      console.log('Erro ao obter os produtos');
    }
  };


  const handleSearch = async () => {
    try {
      const inputElement = document.getElementById('searchProduct') as HTMLInputElement;
      const inputElementSearch = document.getElementById('filterSearch') as HTMLInputElement;
      if (inputElement) {
        const searchValue = inputElement.value;
        const typeSearch = inputElementSearch.value;
        if (searchValue === "") {
          fetchData();
          return;
        }
        const searchProduct = await api.searchProduct(typeSearch, searchValue);
        if (searchProduct.code === 200) {
          const totalProducts = searchProduct.data.pagination.total;
          const productList = searchProduct.data.products.map((product: any) => {
            return {
              token: product.token,
              produto: product.prodName,
              vRevenda: product.valueResale,
              vCusto: product.valueResale,
              mDesc: product.discount,
              qt: product.qt,
              fornecedor: product.supplier,
              setor: product.sector
            };
          });
          setProductList(productList);
          setTotalProducts(totalProducts);
        } else {
          alert("Produto não encontrado.");
        }
      } else {
        alert("Produto não encontrado.");
      }
    } catch (error) {
      console.error('Failed to search product:', error);
    }
        
  };
  
  
  const handleQtProd = async (event: ChangeEvent<HTMLSelectElement>) => {
    const selectEnumListProd = parseInt(event.target.value);
  
    if (isNaN(selectEnumListProd)) {
      console.error('Valor impossível de ser convertido');
      return;
    }
  
    const updateEnumProd = await api.updatePerPageProductsEnum(selectEnumListProd);
    setSelectedValue(selectEnumListProd);
  
  
    if (
      selectEnumListProd < paginationData.per_page &&
      selectEnumListProd < paginationData.total
    ) {
      setPaginationData(prevState => ({ ...prevState, page: 1 }));
    }
  
  
    if (selectEnumListProd > paginationData.per_page) {
      setPaginationData(prevState => ({ ...prevState, page: 1 }));
    }
  };


  const handleFilter = async (event: ChangeEvent<HTMLSelectElement>) => {
    const selectEnumListProd = parseInt(event.target.value);
  };


  useEffect(() => {
    handleSearch();
  }, [paginationData.page, paginationData.per_page]);


  useEffect(() => {
    fetchData();
  }, [paginationData.page, paginationData.per_page]);
  

  useEffect(() => {
      fetchData();
  }, [paginationData.page, selectedValue, paginationData.per_page]);

  useEffect(() => {
      setSelectedValue(paginationData.per_page);
  }, [paginationData.per_page]);
  


  const handleNext = () => {
    if (paginationData.page < paginationData.pages) {
      setPaginationData(prevState => ({...prevState, page: prevState.page + 1}));
    }
  };

  const handlePrev = () => {
    if (paginationData.page > 1) {
      setPaginationData(prevState => ({...prevState, page: prevState.page - 1}));
    }
  };

  const handleFirst = () => {
    setPaginationData(prevState => ({...prevState, page: 1}));
  };

  const handleLast = () => {
    setPaginationData(prevState => ({...prevState, page: paginationData.pages}));
  };

  const handleSave = async () => {
    const productName = document.getElementById('productName') as HTMLInputElement;
    const productPrice = document.getElementById('productResaleValue') as HTMLInputElement;
    const productCost = document.getElementById('productCost') as HTMLInputElement;
    const productTax = document.getElementById('productTax') as HTMLInputElement;
    const productDiscount = document.getElementById('productDiscount') as HTMLInputElement;
    const productQuantity = document.getElementById('productQuantity') as HTMLInputElement;
    const productSupplier = document.getElementById('productSupplier') as HTMLInputElement;
    const productDescription = document.getElementById('productDescription') as HTMLInputElement;
    const productDatePurchase = document.getElementById('datePurchase') as HTMLInputElement;
    const productSectorSelect = document.getElementById('setorSelect') as HTMLInputElement;

    const verifyProductName = validateText(productName.value);
    let nameProductError = '';
  
    if (typeof verifyProductName === 'object' && Object.keys(verifyProductName).length > 0) {
      nameProductError = getErrorMessage(verifyProductName);
      console.log(nameProductError);
    }
  
  
  
    const verifyProductPrice = valueInput(productPrice.value);
    let priceProductError = '';
  
    if (verifyProductPrice === false) {
      priceProductError = 'Valor inválido';
    }
  
  
    const verifyProductCost = valueInput(productCost.value);
    let costProductError = '';
  
    if (verifyProductCost === false) {
      costProductError = 'Valor inválido';
    }
  
  
    const verifyProductTax = valueInput(productTax.value);
    let taxProductError = '';
  
    if (verifyProductTax === false) {
      taxProductError = 'Valor inválido';
    }
  
  
  
    const verifyProductDiscount = valueInput(productDiscount.value);
    let discountProductError = '';
  
    if (verifyProductDiscount === false) {
      discountProductError = 'Valor inválido';
    }
  
    
    const verifyProductQuantity = validateQuantity(Number(productQuantity.value));
    let quantityProductError = '';
  
    if (verifyProductQuantity === false) {
      discountProductError = 'Valor inválido';
    }
  
  
    const verifyProductSupplier = validateText(productSupplier.value);
    let supplierProductError = '';
  
    if (typeof verifyProductSupplier === 'object' && Object.keys(verifyProductSupplier).length > 0) {
      supplierProductError = getErrorMessage(verifyProductSupplier);
    }

    const verifyProductSector = validateText(productSectorSelect.value);
    let supplierSectortError = '';
  
    if (typeof verifyProductSector === 'object' && Object.keys(verifyProductSector).length > 0) {
      supplierProductError = getErrorMessage(verifyProductSector);
    }
  
  
    const verifyProductDescription = validateTextofDescription(productDescription.value);
    let descriptionProductError = '';
  
    
    if (typeof verifyProductDescription === 'object' && Object.keys(verifyProductDescription).length > 0) {
      descriptionProductError = getErrorMessage(verifyProductDescription);
    }
  
    const verifyProductDatePurchase = isValidDate(productDatePurchase.value);
    let datePurchaseProductError = '';
  
    if (!verifyProductDatePurchase) {
      datePurchaseProductError = 'Data inválida';
    }
  
  
  
  
    if (!nameProductError && !priceProductError && !costProductError && !taxProductError && !discountProductError && !quantityProductError && !supplierProductError && !descriptionProductError && !datePurchaseProductError && !supplierSectortError) {
      const product = {
        prodName: productName.value,
        valueResale: Number(Number(productPrice.value.replace('R$', '').replace('.', '').replace(',', '.')).toFixed(1)),
        cust: Number(Number(productCost.value.replace('R$', '').replace('.', '').replace(',', '.')).toFixed(1)),
        tax: Number(Number(productTax.value.replace('R$', '').replace('.', '').replace(',', '.')).toFixed(1)),
        discount: Number(Number(productDiscount.value.replace('%', '').replace('.', '').replace(',', '.')).toFixed(1)),
        qt: Number(productQuantity.value),
        supplier: productSupplier.value,
        sector: productSectorSelect.value,
        description: productDescription.value,
        datePurchase: productDatePurchase.value
      };
      let response = await api.registerProduct(product.prodName, product.valueResale, product.cust, product.tax, product.supplier, product.discount, product.description, product.qt, product.datePurchase, product.sector);
      
      interceptResponseForm(response.code);
      if (response.code === 200 || response.code === 201) {
        alert('Produto cadastrado com sucesso!');
        fetchData();
      } else {
        alert('Erro ao cadastrar o produto produtos.');
      }
    } else {
      alert('Erro ao cadastrar o produto produtos.');
    }
  };

    return (
        <>
           <section className="mt-4">
      <Container fluid>
        <Row className='cardProducts'>
          <Col>
            <Card bg={`${isTheme ? 'dark' : 'white'}`} className="shadow">
              <Card.Header className="py-2 alignCardHeader">
                <Row>
                    <Col lg={3}>
                    <Form.Group className="mb-3" controlId="formFilterSearch">
                        <Form.Label>Filtro de busca</Form.Label>
                        <Form.Select aria-label="Filtro de busca" id='filterSearch' defaultValue="nome">
                          <option value="nome">Nome</option>
                          <option value="fornecedor">Fornecedor</option>
                          <option value="setor">Categoria</option>
                          <option value="descricao">Descrição</option>
                        </Form.Select>
                    </Form.Group>
                    </Col>
                    <Col lg={5}>
                        <Form.Label>Buscar</Form.Label>
                        <InputGroup>
                          <Form.Control type="text" placeholder="Procurar por produto" aria-describedby="buttonSearch" id='searchProduct'/>
                          <InputGroup.Text id="buttonSearch" onClick={handleSearch}>?</InputGroup.Text>
                        </InputGroup>
                    </Col>
                  <Col lg={2} className='formQtList'>
                    <Form.Label>Quantidade</Form.Label>
                    <Form.Select 
                          aria-label="qtList" 
                          onChange={handleQtProd}
                          value={selectedValue}>
                          {enumProduct.map((value, index) => (
                              <option key={index} value={value}>{value}</option>
                          ))}
                    </Form.Select>
                  </Col>
                  <Col lg={2} className='teste'>
                    <ReusableModal id="adicionarProduto" title="Adicionar Produto" buttonText="Produtos" icon={MdAddCircle} onSave={handleSave}>
                      <ProductForm sectorList={sectorList}/>
                    </ReusableModal>
                  </Col>                  
                </Row>
                <Row>
                  <FormFilter/>
                </Row>
                <Row>
                  <Col sm={3}>
                    <Button variant="outline-secondary" className='btnFilter'>
                      Filtrar
                    </Button>
                  </Col>
                </Row>            
              </Card.Header>
              <Card.Body>
                <div className="table-responsive table mb-0 pt-3 pe-2 tableProdResponse">
                  <Table className={`table-striped table-hover ${isTheme ? 'table-dark' : ''} table-sm my-0 mydatatable`}>
                  <thead>
                      <tr>
                        <th>Produto</th>
                        <th>Custo</th>
                        <th>Revenda</th>
                        <th>Imposto</th>
                        <th>Quantidade</th>
                        <th>Unidade Medida</th>
                        <th>Fornecedor</th>
                        <th>Categoria</th>
                        <th>COD</th>
                        <th>Status</th>
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
                      <span className="me-2">Total: {`${totalProducts}`}</span>
                    </div>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
          </Col>
        </Row>


        

      </Container>
    </section>
        </>
    )
}