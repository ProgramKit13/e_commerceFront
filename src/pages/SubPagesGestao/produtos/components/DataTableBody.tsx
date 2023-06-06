type TableData = {
  produto: string;
  vRevenda: string;
  vCusto: string;
  qt: number;
  fornecedor: string;
  setor: string;
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
          <td>{item.vCusto}</td>
          <td>{item.vRevenda}</td>
          <td></td>
          <td>{item.qt}</td>
          <td></td>
          <td>{item.fornecedor}</td>
          <td>{item.setor}</td>
          <td></td>
          <td></td>
        </tr>
      ))}
    </tbody>
  );
}
