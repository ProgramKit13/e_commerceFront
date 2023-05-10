import React from 'react';

type TableData = {
  produto: string;
  vRevenda: string;
  vCusto: string;
  mDesc: string;
  qt: number;
  fornecedor: string;
}

type DataTableBodyProps = {
  data: TableData[];
}

export default function DataTableBody(props: DataTableBodyProps) {
  const { data } = props;

  return (
    <tbody>
      {data.map((item, index) => (
        <tr key={index}>
          <td>{item.produto}</td>
          <td>{item.vRevenda}</td>
          <td>{item.vCusto}</td>
          <td>{item.mDesc}</td>
          <td>{item.qt}</td>
          <td>{item.fornecedor}</td>
        </tr>
      ))}
    </tbody>
  );
}
