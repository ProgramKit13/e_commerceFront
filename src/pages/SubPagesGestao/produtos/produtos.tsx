import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import DataTableBody from './components/DataTableBody';
import { GroupControlsGestao } from '../groupControlsGestao';
import ReusableModal from '../../../assets/components/Gestao/ReusableModal';
import { MdAddCircle } from 'react-icons/md';

const data = [  { produto: 'Airi Satou', vRevenda: '$162,700', vCusto: '$162,700', mDesc: '2%', qt: 5, fornecedor: 'Joao' },  { produto: 'Angelica Ramos', vRevenda: '$162,700', vCusto: '$162,700', mDesc: '3%', qt: 10, fornecedor: 'Vinicius' },  { produto: 'Ashton Cox', vRevenda: '$162,700', vCusto: '$162,700', mDesc: '5%', qt: 20, fornecedor: 'Eliberto' },];

export const Produtos  = () => {
    return (
        <>
           <section className="mt-4">
      <Container fluid>
        <Row>
          <Col>
            <Card bg="dark" className="shadow">
              <Card.Header className="py-2 alignCardHeader">
                  <ReusableModal title="Modal heading"
  body="Woohoo, you're reading this text in a modal!"
  buttonText="Adicionar "
  icon={MdAddCircle}
  onSave={() => {
    // Ação ao salvar
  }}/>
              </Card.Header>
              <Card.Body>
                <div className="table-responsive table mb-0 pt-3 pe-2">
                  <Table className="table-striped table-hover table-dark table-sm my-0 mydatatable">
                  <thead>
                      <tr>
                        <th>Produtos</th>
                        <th>V. Revenda</th>
                        <th>V. Custo</th>
                        <th>M. Desc</th>
                        <th>Qt.</th>
                        <th>Forne.</th>
                      </tr>
                    </thead>
                    <DataTableBody data={data} />
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
        </>
    )
}