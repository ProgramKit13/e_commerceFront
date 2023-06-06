import React from "react";
import { Col, Row } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

export const FormFilter = () => {
    return (
        <>
            <h1 className="mt-4">Filtro</h1>
            <Form>
                <Row>
                    <Col lg={2}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            
                        </Form.Select>
                    </Form.Group>
                    </Col>

                    <Col lg={2}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Revenda</Form.Label>
                            <Form.Control type="text" placeholder="R$5,00" />
                        </Form.Group>
                    </Col>

                    <Col lg={2}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Custo</Form.Label>
                                <Form.Control type="text" placeholder="R$5,00" />
                        </Form.Group>
                    </Col>

                    <Col lg={2}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Data ínicio</Form.Label>
                                <Form.Control type="text" placeholder="R$5,00" />
                        </Form.Group>
                    </Col>

                    <Col lg={2}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Data fim</Form.Label>
                                <Form.Control type="text" placeholder="R$5,00" />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>

        </>
    )
}