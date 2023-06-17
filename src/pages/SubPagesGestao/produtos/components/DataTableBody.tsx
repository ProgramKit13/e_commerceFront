import { Link } from "react-router-dom";

type TableData = {
  produto: string;
  vCusto: string;
  vRevenda: string;
  mDisc: string;
  vImpos: string;
  qt: number;
  reposicao: string;
  fornecedor: string;
  setor: string;
  cod: string;
  token: string;
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
          <td><Link to={`/axiosadmin/gestao/produtos/descricao/${item.token}`}>{item.produto}</Link></td>
          <td>{item.vCusto}</td>
          <td>{item.vRevenda}</td>
          <td>{item.mDisc}</td>
          <td>{item.vImpos}</td>
          <td>{item.qt}</td>
          <td>{item.reposicao}</td>
          <td>{item.fornecedor}</td>
          <td>{item.setor}</td>
          <td>{item.cod}</td>
        </tr>
      ))}
    </tbody>
  );
}
