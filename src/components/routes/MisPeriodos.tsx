import { ChangeEvent, useState, useEffect, useMemo } from "react";
import { Container } from "react-bootstrap";
import createApiClient from "../../api/api-client-factory";
import { Zona } from "../../models/Zona";
import CustomTitles from "../widgets/CustomTitles";
import CustomZonaInfoDetail from "../widgets/CustomZonasWidgets/CustomZonaInfoDetail";
import CustomAdd from "../widgets/CustomAdd";
import CustomSearch from "../widgets/CustomInputWidget/CustomSearch";
import CustomPeriodoList from "../widgets/CustomPeriodosWidgets/CustomPeriodoList";
import { useHistory, useLocation } from "react-router-dom";
import { Periodo } from "../../models/Periodo";

const MisPeriodos = () => {
  const history = useHistory();
  const location = useLocation();
  const [zonaInput, setZonaInput] = useState<Zona>();
  const [searchInput, setSearchInput] = useState("");
  const [periodoData, setperiodoData] = useState<Periodo[]>([]);
  let id: string;

  const [fincaInput, setFincaInput] = useState("");
  useEffect(() => {
    CallIds() 
    callDataZona();
    callDataPeriodo();
  }, [])

  function CallIds() {
    const queryParams = new URLSearchParams(location.search);
    const fincaString = queryParams.get("zona");
    if (fincaString) {
      id = (fincaString);
      setFincaInput((decodeURIComponent(fincaString)));
    }
  }
  async function callDataZona() {
    try {
      const response = await createApiClient().makeApiRequest("GET", "/zonas/" + id, null);
      setZonaInput(response);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  async function callDataPeriodo() {
    try {
      //corregir id caficultor
      const response = await createApiClient().makeApiRequest("GET", "/periodos/" + 1, null);
      setperiodoData(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function onChangeFilterTxt(e: ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }

  async function updateZona() {
    CallIds() 
    history.push(`/Zonas/Edit?zona=${id}`);
  }

  async function CreatePeriodo() {
    console.log("CreatePeriodo");
   const emptyPeriodoInput: Partial<Periodo> = {
      id: 0,
      TipoRecoleccionID: 0,
      Desde: new Date(),
      Hasta: new Date(),
      Value: 0,
    };
    const newPeriodoString = JSON.stringify(emptyPeriodoInput);
    history.push(
      `/MisPeriodos/Create?periodo=${encodeURIComponent(newPeriodoString)}`
    );
  }
  async function getDetallePeriodo() {
    console.log("DetalleZona");
    history.push("/MisPeriodos");
  }
  return (
    <Container className="col-lg-6 col-xxl-4 my-5 mx-auto">
      <CustomTitles txt={"Mis periodos"} />
      <CustomZonaInfoDetail
        nombre={zonaInput?.Nombre ?? ""}
        descripcion={zonaInput?.Descripcion ?? ""}
        onClick={updateZona}
      />
      <CustomAdd onClick={CreatePeriodo} />
      <CustomSearch
        label="Buscar"
        placeholder="Buscar"
        value={searchInput}
        onChange={(e) => onChangeFilterTxt(e)}
      />
      <Container>
        <CustomPeriodoList
          filterTxt={searchInput}
          periodoList={periodoData}
          onClick={getDetallePeriodo}
        />
      </Container>
    </Container>
  );
};

export default MisPeriodos;
