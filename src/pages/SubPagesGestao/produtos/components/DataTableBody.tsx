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
          <td>{item.vRevenda}</td>
          <td>{item.vCusto}</td>
          <td>{item.qt}</td>
          <td>{item.fornecedor}</td>
          <td>{item.setor}</td>
        </tr>
      ))}
    </tbody>
  );
}
