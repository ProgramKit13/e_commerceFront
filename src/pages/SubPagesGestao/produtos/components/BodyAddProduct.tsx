import React, { forwardRef, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { NumericFormat } from 'react-number-format';

interface ProductFormProps {
    // Props do componente (se necessário)
}

const CustomInput = forwardRef((props, ref) => <Form.Control {...props}  />);

const ProductForm: React.FC<ProductFormProps> = (props) => {
  const [addName, setAddName] = useState('');
  const [addResaleValue, setAddResaleValue] = useState('');
  const [addCost, setAddCost] = useState('');
  const [addTax, setAddTax] = useState('');
  const [addDiscount, setAddDiscount] = useState('');
  const [addQuantity, setAddQuantity] = useState('');
  const [addSupplier, setAddSupplier] = useState('');
  const [addDescription, setAddDescription] = useState('');
  const [addDatePurchase, setAddDatePurchase] = useState(''); 
  

  const handleAddName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddName(event.target.value);
  };

  const handleAddResaleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddResaleValue(event.target.value);
  };

  const handleAddCost = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddCost(event.target.value);
  };

  const handleAddTax = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddTax(event.target.value);
  };

  const handleAddDiscount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddDiscount(event.target.value);
  };

  const handleAddQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddQuantity(event.target.value);
  };

  const handleAddSupplier = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddSupplier(event.target.value);
  };

  const handleAddDatePurchase = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddDatePurchase(event.target.value);
  };

  const handleAddDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddDescription(event.target.value);
  };



  return (
    <Form>
      <Row>
        <Col>
          <Form.Group controlId="productName">
            <Form.Label>Nome do Produto</Form.Label>
            <Form.Control type="text" required value={addName} onChange={handleAddName}/>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="productResaleValue">
            <Form.Label>Valor de Revenda</Form.Label>
            <NumericFormat
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale
              required
              prefix="R$ "
              customInput={CustomInput}
              value={addResaleValue} onChange={handleAddResaleValue}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="productCost">
            <Form.Label>Custo</Form.Label>
            <NumericFormat
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale
              required
              prefix="R$ "
              customInput={CustomInput}
              value={addCost} onChange={handleAddCost}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="productTax">
            <Form.Label>Taxa</Form.Label>
            <NumericFormat
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale
              required={false}
              prefix="R$ "
              customInput={CustomInput}
              value={addTax} onChange={handleAddTax}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="productDiscount">
            <Form.Label>Valor de desconto</Form.Label>
            <NumericFormat
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={1}
              fixedDecimalScale
              required={false}
              suffix=" %"
              customInput={CustomInput}
              value={addDiscount} onChange={handleAddDiscount}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <Form.Group controlId="productQuantity">
            <Form.Label>Quantidade</Form.Label>
            <Form.Control type="number" min="0" required value={addQuantity} onChange={handleAddQuantity} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="productSupplier">
            <Form.Label>Fornecedores</Form.Label>
            <Form.Control type="text" value={addSupplier} onChange={handleAddSupplier} />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="datePurchase">
            <Form.Label>Data da Compra</Form.Label>
            <Form.Control type="date" value={addDatePurchase} onChange={handleAddDatePurchase} />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="productDescription">
            <Form.Label>Descrição do produto</Form.Label>
            <Form.Control as="textarea" rows={3} value={addDescription} onChange={handleAddDescription} />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default ProductForm;
