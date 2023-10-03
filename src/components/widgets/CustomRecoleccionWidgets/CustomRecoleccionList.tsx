import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { Recoleccion } from "../../../models/Recoleccion";
import { Column } from "../CustomTableWidget/TableHead";
import TableHead from "../CustomTableWidget/TableHead";
import TableBody from "../CustomTableWidget/TableBody";
import "./TableStyle.scss"
interface CustomRecoleccionListProps {
  filterTxt: string;
  recoleccionList: Recoleccion[];
}
const CustomRecoleccionList: React.FC<CustomRecoleccionListProps> = ({
  filterTxt,
  recoleccionList,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentList, setCurrentList] = useState(recoleccionList);

  const columns: Column[] = [
    { label: "Registro", accessor: "createdAt" },
    { label: "Recolector", accessor: "recolectorname" },
    { label: "Cajuela", accessor: "cajuelas" },
    { label: "Cuartillo", accessor: "cuartillos" },
    { label: "Pago Unitario", accessor: "costo" },
    { label: "Total", accessor: "total" },
    { label: "Status", accessor: "pagado" },
  ];
  const handleEditClick = (id: number) => {
    console.log("Editar recoleccion" + id);
    // window.location.href = "/zonas/Edit?zona=" + zona.Id;
  };

  const handleDeleteClick = (id: number) => {
    // setTexto(`Eliminar la Zona "${zona.Nombre}"`);
    setOpenDialog(true);
    console.log(openDialog);
    console.log("Borrar recoleccion" + id);
  };

  const FilterByAccessor = (/*label:string*/) => {
    console.log('Hello, world!');
    let newRecoleccionList = recoleccionList.filter((c) => c.recolectorname.toLowerCase().includes(filterTxt.toLowerCase()));

    //newRecoleccionList = sortByProperty(newRecoleccionList,label);
    setCurrentList(newRecoleccionList);
    console.dir(newRecoleccionList);
  };
/*
  function sortByProperty <Recoleccion>(arr: Recoleccion[], propName: keyof Recoleccion, ascending= true): Recoleccion[] {
    return arr.sort((a, b) => {
      const valueA = a[propName];
      const valueB = b[propName];
  
      if (typeof valueA === "string" || typeof valueB === "string") {
        if (ascending) {
          return String(valueA).localeCompare(String(valueB));
        } else {
          return String(valueB).localeCompare(String(valueA));
        }
      } else if (typeof valueA === "number" || typeof valueB === "number") {
        return ascending ? Number(valueA) - Number(valueB) : Number(valueB) - Number(valueA);
      } else if (valueA instanceof Date || valueB instanceof Date) {
        return ascending ? (valueA as Date).getTime() - (valueB as Date).getTime() : (valueB as Date).getTime() - (valueA as Date).getTime();
      } else {
        throw new Error("Unsupported data type for sorting");
      }
    });
  }*/

  if (!recoleccionList.length) {
    return (
      <div className="center">
        <p className="text-center mt-5">No hay recolecciones creadas</p>
      </div>
    );
  } else {
    return (
      <div className="horizontal-scroll-container">
       <Table>
        <TableHead columns={columns} onClickSort={ FilterByAccessor} />
        <TableBody
          columns={columns}
          tableData={currentList .filter((c) =>
            c.recolectorname.toLowerCase().includes(filterTxt.toLowerCase())
          )}
          onClickEdit={handleEditClick}
          onClickBorrar={handleDeleteClick}
        />
      </Table>
      </div>
    
    );
  }
};

export default CustomRecoleccionList;




