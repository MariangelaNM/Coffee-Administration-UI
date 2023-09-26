import React from "react";
import { Button } from "react-bootstrap";
import { FiEdit, FiTrash2 } from "react-icons/fi";

interface Column {
  accessor: string;
}

interface DataItem {
  Id: number;
  [key: string | number]: any;
}

interface TableBodyProps {
  tableData: DataItem[];
  columns: Column[];
  onClickEdit: (id: number) => void;
  onClickBorrar: (id: number) => void;
}

const TableBody: React.FC<TableBodyProps> = ({
  tableData,
  columns,
  onClickEdit,
  onClickBorrar,
}) => {
  return (
    <tbody>
      {tableData.map((data) => {
        return (
          <tr key={data.Id}>
            {columns.map(({ accessor }) => {
              const tData = data[accessor] ? data[accessor] : "——";

              const statusStyle =
              accessor === "pagado" && data[accessor] === "Pagado"
                ? { color: "green" }
                : accessor === "pagado" && data[accessor] === "Pendiente"
                ? { color: "red" }
                : {};
                

              return <td key={accessor} style={statusStyle}>{tData}</td>;
            })}
            
            <td key={"Edit"}>
              <Button variant="link" onClick={() => onClickEdit(data.Id)}>
                <FiEdit className="custom-icon" />
              </Button>
            </td>
            <td key={"Delete"}>
              <Button variant="link" onClick={() => onClickBorrar(data.Id)}>
                <FiTrash2 className="custom-icon-red" />
              </Button>
            </td>
          </tr>
        );
      })}
      
    </tbody>
  );
};

export default TableBody;
