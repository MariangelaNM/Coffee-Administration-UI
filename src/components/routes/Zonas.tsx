import { ChangeEvent, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import createApiClient from "../../api/api-client-factory";
import { Finca } from "../../models/Finca";
import { Zona } from "../../models/Zona";
import CustomTitles from "../widgets/CustomTitles";
import CustomFincaInfoDetail from "../widgets/CustomFincaWidgets/CustomFincaInfoDetail";
import CustomAdd from "../widgets/CustomAdd";
import CustomSearch from "../widgets/CustomInputWidget/CustomSearch";
import CustomZonaList from "../widgets/CustomZonasWidgets/CustomZonaList";
import { useHistory, useLocation } from "react-router-dom";

const Zonas = () => {
  let id: string;
  const history = useHistory();
  const location = useLocation();
  const [fincaInput, setFincaInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [zonaList, setZonaList] = useState<Zona[]>([]);
  const [fincasData, setFincasData] = useState<Finca>();

  useEffect(() => {
    CallIds();
    callData();
  }, [])

  async function callData() {
    try {
      const data = { FincaID: id };
      const response = await createApiClient().makeApiRequest("PUT", "/zonas", data);
      setZonaList(response as unknown as Zona[]);
      const responseFinca = await createApiClient().makeApiRequest("GET", "/fincas/" + id, null);
      setFincasData(responseFinca as unknown as Finca);
    } catch (error) {
      history.push("/error");
    }
  }

  async function updateFinca() {
    CallIds();
    history.push(`/Fincas/Edit?farm=${encodeURIComponent(fincaInput)}`);
  
  }

  function CallIds() {
    const queryParams = new URLSearchParams(location.search);
    const fincaString = queryParams.get("farm");
    if (fincaString) {
      id = (fincaString);
      setFincaInput((decodeURIComponent(fincaString)));
    }
  }

  async function CreateZona() {
    history.push(`/Zonas/Create?farm=${encodeURIComponent(fincaInput)}`);
  }

  async function getDetalleZona(id: number) {
    history.push(`/MisPeriodos?zona=${encodeURIComponent(id)}`);
  }

  function onChangeFilterTxt(e: ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }

  return (
    <Container className="col-lg-6 col-xxl-4 my-5 mx-auto">
      <CustomTitles txt={"Mis zonas"} />
      <CustomFincaInfoDetail
        nombre={fincasData?.Nombre ?? ""}
        descripcion={fincasData?.Descripcion ?? ""}
        onClick={updateFinca}
      />
      <CustomAdd onClick={CreateZona} />
      <CustomSearch
        label="Buscar"
        placeholder="Buscar"
        value={searchInput}
        onChange={(e) => onChangeFilterTxt(e)}
      />
      <Container>
        <CustomZonaList
          filterTxt={searchInput}
          zonaList={zonaList}
          onClick={getDetalleZona}
        />
      </Container>
    </Container>
  );
};

export default Zonas;
