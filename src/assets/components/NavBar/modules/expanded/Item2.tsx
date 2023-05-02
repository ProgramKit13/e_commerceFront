import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { CashFlowInfo } from '../../controls/cashInfo/InfoCash'


export const SecondMenu = () => {
    return (
        <Row className="items2">
        <Col md={3} className="alignTextItems">
          <CashFlowInfo title="Fluxo mensal" value="R$15.555,00" tooltip="Fluxo mensal" />
        </Col>
        <Col md={3}>
          <CashFlowInfo title="Fluxo semanal" value="R$105,35" tooltip="Fluxo semanal" />
        </Col>
        <Col md={3}>
          <CashFlowInfo title="Fluxo diário" value="R$20,00" tooltip="Fluxo diário" />
        </Col>
        <Col md={3}>
          <CashFlowInfo title="Gastos" value="R$15,00" tooltip="Gastos" warning />
        </Col>
      </Row>
    )
}
