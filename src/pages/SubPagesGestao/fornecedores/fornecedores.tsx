import { Card, Col, Container, Row, Form, InputGroup, Table, Button } from "react-bootstrap"
import { ThemeContext } from "../../../assets/components/NavBar/controls/controlTheme/SwitchContext"
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { api } from "../../../api/admin/api_admin_management";
import DataTableBody from "./components/DataTableBody";
import AdvancedPagination from "../../../assets/components/Gestao/Pagination.Default";
import { Link } from "react-router-dom";

const proprietyEnum = 'productsPerPage';
const urlLocation = 'fornecedores';

interface Supplier {
    token: string;
    supplierName: string;
    supplierEmail: string;
    supplierCity: string;
    supplierNeighborhood: string;
    supplierStreet: string;
    supplierNumber: string;
    supplierComplement: string;
    supplierZipCode: string;
    supplierCnpj: string;
    supplierPhone_01: string;
    supplierPhone_02: string;
}


export const Fornecedores  = () => {
    const { isTheme } = useContext(ThemeContext);
    const [activeFilters, setActiveFilters] = useState<{ [key: string]: string | number } | null>(null);
    const [supplierList, setSupplierList] = useState([]);
    const [enumSupplier, setEnumSupplier] = useState([]);
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

    const mapSupplierData = (supplier: Supplier) => ({
        token: supplier.token,
        name: supplier.supplierName,
        email: supplier.supplierEmail,
        city: supplier.supplierCity,
        neighborhood: supplier.supplierNeighborhood,
        street: supplier.supplierStreet,
        number: supplier.supplierNumber,
        complement: supplier.supplierComplement,
        zipCode: supplier.supplierZipCode,
        cnpj: supplier.supplierCnpj,
        phone_01: supplier.supplierPhone_01,
        phone_02: supplier.supplierPhone_02,
    })

    const fetchData = async (filters?: {[key: string]: any}, page:number = paginationData.page) => {
        const response = await api.getAndSearch(filters, page, urlLocation);
        const getEnumSupplier = await api.getEnumPerPage(proprietyEnum);
        console.log(response)
        setEnumSupplier(getEnumSupplier.data);
        if (response.code === 200 && response.data.listData) {
            const {listData , pagination} = response.data;
            const updateSupplierList = listData.map(mapSupplierData);
            setSelectedValue(pagination.per_page);
            setSupplierList(updateSupplierList);
            setPaginationData({
                ...paginationData,
                total: pagination.total,
                pages: pagination.pages,
                page: pagination.page,
                per_page: pagination.per_page
            });
        }
        else if (response.code === 200 && response.data.listData === undefined) {
            console.log('bele');
        }

        else {
            console.log('Erro ao obter os produtos');
        }
    }


    const handleQtProd = async(event: ChangeEvent<HTMLSelectElement>) => {
        const selectEnumListSupplier = parseInt(event.target.value);
         const updateQtPerPage = await api.updatePerPage(proprietyEnum, selectEnumListSupplier);
    if (updateQtPerPage.code === 200) {
      setPaginationData(prevState => ({
        ...prevState, 
        per_page: selectEnumListSupplier, 
        page: 1
      }));
      setSelectedValue(selectEnumListSupplier);

    } else {
      alert('Erro ao obter os produtos');
    }
  };

  
const handleSearch = async () => {
    const inputElement = document.getElementById('searchSupplier') as HTMLInputElement;
    const inputElementSearch = document.getElementById('formFilterSearch') as HTMLInputElement;
    if (inputElement && inputElementSearch) {
      const searchValue = inputElement.value;
      const filterField = inputElementSearch.value;

    const filters: { [key: string]: string | number} = {
        [filterField]: searchValue,
      };
    setActiveFilters(filters);
    fetchData(filters);

    } else {
        alert('Produto não encontrado');
    }
}


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

    useEffect(() => {
        fetchData(activeFilters || {}, paginationData.page);
    }, []);


    return (
        <>
            <section className="mt-4">
                <Container fluid>
                    <Col>
                        <Card bg={`${isTheme ? 'dark' : 'white'}` } className="shadow">
                        <Card.Header className="py-2 alignCardHeader">
                           <Form>
                                <Row>
                                    <Col lg={3}>
                                        <Form.Group className="mb-3" controlId="formFilterSearch">
                                            <Form.Label>Filtro de busca</Form.Label>
                                            <Form.Select aria-label="Filtro de busca" id="formFilterSearch" defaultValue="nome">
                                                <option value="fornecedor_nome">Nome</option>
                                                <option value="fornecedor_cnpj">CNPJ</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={5}>
                                        <Form.Label>Buscar</Form.Label>
                                        <InputGroup>
                                            <Form.Control type="text" placeholder="Buscar por xxx" id="searchSupplier" />
                                        </InputGroup>
                                    </Col>
                                    <Col lg={2} className="formQtList">
                                        <Form.Label>Quantidade</Form.Label>
                                        <Form.Select aria-label="qtList"
                                        onChange={handleQtProd}
                                        value={selectedValue}>
                                            {enumSupplier.map((value:any, index: any) => (
                                                <option key={index} value={value}>{value}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                    <Col lg={2} className='toAdcSupplier'>
                                        <Link className='btnAddProduct' to="adicionarfornecedor" >Adicioanr fornecedor</Link>
                                    </Col>        
                                </Row>
                                 <Row>
                                 <Col sm={1}>
                                        <Button variant="outline-secondary" className='btnFilter mt-3' onClick={handleSearch}  >
                                        Filtrar
                                        </Button>
                                    </Col>
                                </Row>                              
                           </Form>
                        </Card.Header>
                        <Card.Body>
                            <div className="table-responsive table mb-0 pt-3 pe-2 tableProdResponse">
                                <Table className={`table-striped table-hover ${isTheme ? 'table-dark' : ''} table-sm my-0 mydatatable`}>
                                    <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th>CNPJ</th>
                                            <th>Telefone.1</th>
                                            <th>Telefone.2</th>
                                            <th>Email</th>
                                        </tr>
                                    </thead>
                                    <DataTableBody data={supplierList}/>
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
                        </Card>
                    </Col>
                </Container>
            </section>
        </>
    )
}