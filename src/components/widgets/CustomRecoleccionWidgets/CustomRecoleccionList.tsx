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
import { useUser } from '../../UserContext';
import { Recolector } from "../../../models/Recolector";
interface CustomRecoleccionListProps {
  filterTxt: string;
  recoleccionList: Recoleccion[];
}
const CustomRecoleccionList: React.FC<CustomRecoleccionListProps> = ({

  recoleccionList,
}) => {
  const { userId } = useUser();
  const [recolectoresData, setRecolectoresData] = useState<Recolector[]>([]);
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
  let id = 0;
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
    { label: "Recolector", accessor: "RecolectorNombre" },
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
    history.push(`/Recoleccion?` + encodeURIComponent(`periodo=` + foundItem?.PeriodoID + `&zona=` + foundItem?.ZonaID + `&id=` + foundItem?.Id + `&costo=` + foundItem?.costo));
  };
  async function callDataRecolector() {
    try {
      const response = await createApiClient().makeApiRequest(
        "GET",
        `/recolectores/${userId}/caficultor`,
        null
      );
      if ("message" in response) {
        setRecolectoresData([] as Recolector[]);
      } else {
        setRecolectoresData(response as Recolector[]);

      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function modifyStatus(jsonData: any[]): any[] {
    callDataRecolector();
    const modifiedData = [];

    for (let i = 0; i < jsonData.length; i++) {
      const item = jsonData[i];
      const modifiedItem = { ...item }; // Create a copy of the original object
      if (item.Status === true) {
        modifiedItem.Status = "Pagado";
      } else {
        modifiedItem.Status = "Pendiente";
      }
      modifiedItem.Creado = formatDateToShort(new Date(modifiedItem.Creado))
      const NombreRecolector = (filtrarPorId(modifiedItem.RecolectorID));
      if (NombreRecolector.length > 0) {
        modifiedItem.RecolectorNombre = NombreRecolector[0].Nombre;
      }
      modifiedData.push(modifiedItem);
    }

    return modifiedData;
  }
  function filtrarPorId(id: number) {
    return recolectoresData.filter((item) => item.Id === id);
  }
  function formatDateToShort(date: Date): string {
    const dia = date.getDate().toString().padStart(2, "0");
    const mes = (date.getMonth() + 1).toString().padStart(2, "0");
    const año = date.getFullYear();
    return `${dia}/${mes}/${año}`;
  }
  const handleDeleteClick = (id: number) => {
    setTexto(`Eliminar la Recolección`);
    id = id;
    setOpenDialog(true);
    console.log("Borrar recoleccion" + id);
  };

 


  if (!recoleccionList.length) {
    return (
      <div className="center">
        <p className="text-center mt-5">No hay recolecciones creadas</p>
      </div>
    );
  } else {
    function FilterByAccessor(accessor: string): void {
      throw new Error("Function not implemented."+accessor);
    }

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




