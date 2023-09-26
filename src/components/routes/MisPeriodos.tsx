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
import { useUser } from '../UserContext';
const MisPeriodos = () => {
  const history = useHistory();
  const location = useLocation();
  const [zonaInput, setZonaInput] = useState<Zona>();
  const [searchInput, setSearchInput] = useState("");
  const [periodoData, setperiodoData] = useState<Periodo[]>([]);
  let id: string;
  const { userId } = useUser();
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
      setZonaInput(response as unknown as Zona);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  async function callDataPeriodo() {
    try {
      const response = await createApiClient().makeApiRequest("GET", "/periodos/" + userId, null);
      response.forEach((element) => {
        element.zona = Number(id);
      });
      setperiodoData(response as unknown as Periodo[]);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function onChangeFilterTxt(e: ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }

  async function updateZona() {
    const queryParams = new URLSearchParams(location.search);
    const zona = queryParams.get("zona");
    history.push(`/Zonas/Edit?zona=${zona}`);
  }

  async function CreatePeriodo() {
    const queryParams = new URLSearchParams(location.search);
    const zona = queryParams.get("zona");
    history.push(
      `/MisPeriodos/Create?zona=${zona}`
    );
  }
  async function getDetallePeriodo() {
    console.log("DetalleZona");
    history.push("/MisPeriodos");
  }
  return (
    <Container className="col-lg-6 col-xxl-4 my-5 mx-auto">
      <CustomZonaInfoDetail
        nombre={zonaInput?.Nombre ?? ""}
        descripcion={zonaInput?.Descripcion ?? ""}
        onClick={updateZona}
      />
      <CustomTitles txt={"Mis periodos"} />
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
