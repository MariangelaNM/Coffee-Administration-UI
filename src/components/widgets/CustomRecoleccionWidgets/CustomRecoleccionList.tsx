import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { Recoleccion } from "../../../models/Recoleccion";
import { Column } from "../CustomTableWidget/TableHead";
import TableHead from "../CustomTableWidget/TableHead";
import TableBody from "../CustomTableWidget/TableBody";
import "./TableStyle.scss"
import AlertDialog from "../AlertDialog";
import createApiClient from "../../../api/api-client-factory";
import { useHistory } from "react-router-dom";
import Alert from "@mui/material/Alert/Alert";
interface CustomRecoleccionListProps {
  filterTxt: string;
  recoleccionList: Recoleccion[];
}
const CustomRecoleccionList: React.FC<CustomRecoleccionListProps> = ({
  filterTxt,
  recoleccionList,
}) => {
  const [showSuccessMessageError, setShowSuccessMessageError] = useState(false);
  const history = useHistory();
  const [openDialog, setOpenDialog] = useState(false);
  const [texto, setTexto] = useState("");
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleDisagree = () => {
    handleCloseDialog();
  };
  let id=0;
  const handleAgree = async () => {
    const response = await createApiClient().makeApiRequest(
      "DELETE",
      "/registros/" + id,
      undefined
    );
    handleCloseDialog();
    if (response.message != undefined) {
      setShowSuccessMessageError(true);
      setTimeout(() => {
        setShowSuccessMessageError(false);
      }, 4000);
    } else {
      window.location.reload();
    }
  };

  let currentList = modifyStatus(recoleccionList);
  const columns: Column[] = [
    { label: "Registro", accessor: "Creado" },
    // { label: "Recolector", accessor: "recolectorname" },
    { label: "Cajuela", accessor: "Cajuelas" },
    { label: "Cuartillo", accessor: "Cuartillos" },
    { label: "Total", accessor: "Total" },
    { label: "Status", accessor: "Status" },
  ];
  function findItemById(idToFind: number): Recoleccion | undefined {
    const foundItems = recoleccionList.filter(item => item.Id === idToFind);
    if (foundItems.length > 0) {
        return foundItems[0];
    }
    return undefined;
}

  const handleEditClick = (id: number) => {
    const foundItem = findItemById(id);
    history.push(`/Recoleccion?`+encodeURIComponent(`periodo=`+foundItem?.PeriodoID+`&zona=`+foundItem?.ZonaID+`&id=`+foundItem?.Id+`&costo=`+foundItem?.costo));
  };

  function modifyStatus(jsonData: any[]): any[] {
    const modifiedData = [];

    for (let i = 0; i < jsonData.length; i++) {
      const item = jsonData[i];
      debugger
      const modifiedItem = { ...item }; // Create a copy of the original object
      if (item.Status === true) {
        modifiedItem.Status = "Pagado";
      } else {
        modifiedItem.Status = "Pendiente";
      }
      modifiedData.push(modifiedItem);
    }

    return modifiedData;
  }
  const handleDeleteClick = (id: number) => {
     setTexto(`Eliminar la Recolección`);
    id=id;
    setOpenDialog(true);
    console.log("Borrar recoleccion" + id);
  };

  const FilterByAccessor = (label: string) => {
    let newRecoleccionList = recoleccionList.filter((c) => c.recolectorname.toLowerCase().includes(filterTxt.toLowerCase()));

    newRecoleccionList = sortByProperty(newRecoleccionList, label);
    currentList = (newRecoleccionList);
    console.dir(newRecoleccionList);
  };

  function sortByProperty<Recoleccion>(arr: Recoleccion[], propName: keyof Recoleccion, ascending = true): Recoleccion[] {
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
  }

  if (!recoleccionList.length) {
    return (
      <div className="center">
        <p className="text-center mt-5">No hay recolecciones creadas</p>
      </div>
    );
  } else {
    return (
      <div className="horizontal-scroll-container">
       
            {showSuccessMessageError && (
              <Alert
                severity="error"
                style={{ marginBottom: "10px", marginTop: "10px" }}
              >
                Está Finca cuenta con Zonas
              </Alert>
            )}
       
        <Table>
          <TableHead columns={columns} onClickSort={FilterByAccessor} />
          <TableBody
            columns={columns}
            tableData={currentList.filter((c) =>
              c.RecolectorID
            )}
            onClickEdit={handleEditClick}
            onClickBorrar={handleDeleteClick}
          />
        </Table>
        <AlertDialog
          open={openDialog}
          texto={texto}
          handleClose={handleCloseDialog}
          handleDisagree={handleDisagree}
          handleAgree={handleAgree}
        />
      </div>

    );
  }
};

export default CustomRecoleccionList;




