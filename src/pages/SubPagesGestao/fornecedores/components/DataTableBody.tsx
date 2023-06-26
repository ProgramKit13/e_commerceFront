import { Link } from "react-router-dom";

type TableData = {
    token: string;
    name: string;
    email: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    complement: string;
    zipCode: string;
    cnpj: string;
    phone_01: string;
    phone_02: string;
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
          <td><Link to={`/axiosadmin/gestao/fornecedor/descricao/${item.token}`}>{item.name}</Link></td>
          <td>{item.cnpj}</td>
          <td>{item.phone_01}</td>
          <td>{item.phone_02}</td>
          <td>{item.email}</td>
        </tr>
      ))}
    </tbody>
  );
}
