import React from "react";
import { Col } from "react-bootstrap";

interface CashFlowInfoProps {
  title: string;
  value: string;
  tooltip: string;
  warning?: boolean;
}

export const CashFlowInfo: React.FC<CashFlowInfoProps> = ({
  title,
  value,
  tooltip,
  warning = false,
}) => {
  const infoTitleClass = warning ? "infoTitle warning" : "infoTitle";

  return (
    <Col className="infoCashArea">
      <p className={infoTitleClass}>{title}</p>
      <span
        className="infoText"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title={tooltip}
      >
        {value}
      </span>
    </Col>
  );
};