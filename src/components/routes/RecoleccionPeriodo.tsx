import { ChangeEvent, useState, useEffect, useMemo } from "react";
// import createApiClient from "../../api/api-client-factory";
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
import { useHistory, useLocation } from "react-router-dom";

const RecoleccionPeriodo = () => {
  const history = useHistory();
  // const location = useLocation();
  const [searchInput, setSearchInput] = useState("");
  const [recoleccionData, setRecoleccionoData] = useState<Recoleccion[]>([]);
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

  //TODO Esto es un ejemplo
  const RecoleccionList: Recoleccion[] = [
    {
      Id: 1,
      createdAt: "10/02/2023",
      recolector: 1,
      recolectorname: "Juan",
      costo: 2,
      cajuelas: 1,
      cuartillos: 2,
      total: 10,
      pagado: "pendiente",
    },
    {
      Id: 2,
      createdAt: "10/02/2023",
      recolector: 1,
      recolectorname: "Pedro",
      costo: 3,
      cajuelas: 2,
      cuartillos: 2,
      total: 7.5,
      pagado: "pagado",
    },
    {
      Id: 3,
      createdAt: "10/02/2023",
      recolector: 1,
      recolectorname: "Arturo",
      costo: 5,
      cajuelas: 3,
      cuartillos: 2,
      total: 17.5,
      pagado: "pendiente",
    },
  ];

  function onChangeFilterTxt(e: ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }

  async function CrearRegistro() {
    console.log("CrearRegistro");
    history.push(`/Recoleccion`);
  }

  return (
    <Container className="col-lg-6 col-xxl-8 my-5 mx-auto">
      <CustomPeriodoInfoDetail
        nombreZona={"Nombre de la zona"}
        periodo={"Nombre del periodo"}
        descripcion={"Descripcion del periodo"}
      />
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
          recoleccionList={RecoleccionList}
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
