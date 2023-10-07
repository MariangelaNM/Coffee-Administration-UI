import { ChangeEvent, useState, useEffect } from "react";
import { Container, Col } from "react-bootstrap";
import CustomTitles from "../widgets/CustomTitles";
import CustomPeriodoInfoDetail from "../widgets/CustomPeriodosWidgets/CustomPeriodoInfoDetail";
import CustomAdd from "../widgets/CustomAdd";
import CustomRecoleccionList from "../widgets/CustomRecoleccionWidgets/CustomRecoleccionList";
import CustomSearch from "../widgets/CustomInputWidget/CustomSearch";
import BarChart from "../widgets/BarChart";
import { Recoleccion } from "../../models/Recoleccion";
import styled from "styled-components";
import { themes } from "../../styles/ColorStyles";
import { H4 } from "../../styles/TextStyles";
import { useHistory } from "react-router-dom";
import CustomButtonPrimary from "../widgets/CustomBtnPrimaryWidget/CustomBtnPrimary";
import CustoReleccionCostoUnitario from "../widgets/CustomRecoleccionWidgets/CustomRecoleccionCostoUnitario";
import { Zona } from "../../models/Zona";
import { Periodo } from "../../models/Periodo";
import createApiClient from "../../api/api-client-factory";
const RecoleccionPeriodo = () => {
  const history = useHistory();
  // const location = useLocation();
  const [searchInput, setSearchInput] = useState("");
  const [zonaInput, setZonaInput] = useState<Zona>();
  const [recoleccionData, setRecoleccionoData] = useState<Recoleccion[]>([]);
  const [periodoData, setperiodoData] = useState<Periodo>();
  const [costo, setCosto] = useState(0);
  // let id: string;
  const nombre = "Recolección mensual";
  const labels = [
    "Enero 23",
    "Febrero 23",
    "Marzo 23",
    "Abril 23",
    "Mayo 23",
    "Junio 23",
    "Julio 23",
  ];
  const dataname = "Cajuelas";
  const dataValues = [12, 19, 3, 5, 2];

  useEffect(() => {
    callDataZona()
    callPeriodo();
    callRecolecciones();
    const queryParams = new URLSearchParams(decodeURIComponent(location.search));
    const costo = queryParams.get("costo");
    setCosto(Number(costo));
  }, [])

  async function callDataZona() {
    try {
      const queryParams = new URLSearchParams(decodeURIComponent(location.search));
      const zona = queryParams.get("zona");
      const response = await createApiClient().makeApiRequest("GET", "/zonas/" + zona, null);
      setZonaInput(response as unknown as Zona);
   

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  async function callRecolecciones() {
    try {
      const queryParams = new URLSearchParams(decodeURIComponent(location.search));
      const zona = queryParams.get("periodo");
      const response = await createApiClient().makeApiRequest("GET", "/registros/periodos/" + zona, null);
      setRecoleccionoData(response as unknown as Recoleccion[] );
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  async function callPeriodo() {
    try {
      const queryParams = new URLSearchParams(decodeURIComponent(location.search));
      const periodo = queryParams.get("periodo");
      const response = await createApiClient().makeApiRequest(
        "GET",
        "/periodos/Periodo/" + periodo,
        null
      );
      setperiodoData(response as unknown as Periodo);
    } catch {
      history.push(`/error`);
    }
  }
  function onChangeFilterTxt(e: ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }

  async function CrearRegistro() {
    console.log("CrearRegistro");
    const queryParams = new URLSearchParams(decodeURIComponent(location.search));
    const zona = queryParams.get("zona");
    const periodo = queryParams.get("periodo");
    history.push(`/Recoleccion?`+encodeURIComponent(`periodo=`+periodo+`&zona=`+zona));
  
  }

  return (
    <Container className="col-lg-6 col-xxl-8 my-5 mx-auto">
      <CustomPeriodoInfoDetail
        nombreZona={zonaInput?.Nombre??""}
        descripcion={periodoData?.Desde+" al "+periodoData?.Hasta}
      />
      <div className="mt-2">
        <CustoReleccionCostoUnitario costounitario={costo} Id={1} />
      </div>
      <div className="d-grid gap-2">
        <CustomButtonPrimary
          label="Pagos pendientes"
          onClick={() => {
            //history.push("/login");
          }}
          disabled={false}
        />
      </div>
      <Container>
        <CustomTitles txt={"Resumen del periodo"} />
        <BarChart
          nombre={nombre}
          labels={labels}
          dataname={dataname}
          dataValues={dataValues}
        />
        <Col className="d-flex mt-2">
          <TitleTag className="text-selection-disable">Total:</TitleTag>
          <div style={{ marginLeft: "5px" }}>
            <Title className="text-selection-disable">{"₡" + "1000"}</Title>
          </div>
        </Col>
        <Col className="d-flex mt-2">
          <TitleTag className="text-selection-disable">
            Recoleccion Total:
          </TitleTag>

          <div style={{ marginLeft: "5px" }}>
            <Title className="text-selection-disable">
              {"10" + " Cajuelas " + "y " + "2" + " Cuartillos "}
            </Title>
          </div>
        </Col>
      </Container>
      <div style={{ marginLeft: "10px" }}>
        <CustomTitles txt={"Registros"} />
      </div>
      <CustomAdd onClick={CrearRegistro} />
      <CustomSearch
        label="Buscar"
        placeholder="Buscar"
        value={searchInput}
        onChange={(e) => onChangeFilterTxt(e)}
      />
      <Container>
        <CustomRecoleccionList
          filterTxt={searchInput}
          recoleccionList={recoleccionData}
        />
      </Container>
    </Container>
  );
};
const Title = styled(H4)`
  color: ${themes.dark.text1};
  text-align: start;
`;
const TitleTag = styled(H4)`
  color: ${themes.dark.cafe_medio};
  text-align: start;
`;
export default RecoleccionPeriodo;
