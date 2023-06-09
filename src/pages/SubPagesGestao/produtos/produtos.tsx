import { Container, Row, Col, Card, Table, Form, Button } from 'react-bootstrap';
import DataTableBody from './components/DataTableBody';
import { MdAddCircle } from 'react-icons/md';
import { api } from '../../../api/admin/api_admin_products';
import { useInterceptResponseFormContext  } from '../../../assets/components/Gestao/interceptResponseForm';
import { useContext, useEffect, useState, ChangeEvent } from 'react';
import './css/styles.css';
import AdvancedPagination from '../../../assets/components/Gestao/Pagination.Default';
import { ThemeContext } from '../../../assets/components/NavBar/controls/controlTheme/SwitchContext';
import InputGroup from 'react-bootstrap/InputGroup';
import { FormFilter } from './components/FormFilter';
import {  Link } from 'react-router-dom';


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

      const productList = listAllProducts.data.products.list.map((product: any) => {
        return {
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
          cod: product.barcode,
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
      if (inputElement && inputElementSearch) {
        const searchValue = inputElement.value;
        const filterField = inputElementSearch.value;
        if (searchValue === "") {
          fetchData();
          return;
        }
        const filters = { [filterField]: searchValue };
        const searchProduct = await api.searchProduct(filters);
        if (searchProduct.code === 200) {
          const totalProducts = searchProduct.data.pagination.total;
          const productList = searchProduct.data.products.map((product: any) => {
            return {
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
              cod: product.barcode,
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

  

    return (
        <>
           <section className="mt-4">
      <Container fluid>
        <Row className='cardProducts'>
          <Col>
            <Card bg={`${isTheme ? 'dark' : 'white'}`} className="shadow">
              <Card.Header className="py-2 alignCardHeader">
                <Row>
                  <FormFilter enumProduct={enumProduct} />
                </Row>
                <Row>
                  <Col sm={3}>
                    <Button variant="outline-secondary" className='btnFilter mt-3' onClick={handleSearch}  >
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