import React, { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Col } from "react-bootstrap";
import styled from "styled-components";
import { themes } from "../../styles/ColorStyles";
import { H4 } from "../../styles/TextStyles";
import { useHistory } from "react-router-dom";
import CustomButtonPrimary from "../widgets/CustomBtnPrimaryWidget/CustomBtnPrimary";
import CustomTitles from "../widgets/CustomTitles";
import CustomRecoleccionList from "../widgets/CustomRecoleccionWidgets/CustomRecoleccionList";
import { Recoleccion } from "../../models/Recoleccion";
import CustomPagoResumen from "../widgets/CustomPagosWidget/CustomPagoResumen";

const RecolectorPago = () => {
  const history = useHistory();
  const [searchInput, setSearchInput] = useState("");

//  const { recolectorId } = useParams();

  // Datos de ejemplo de Recolección para un mismo recolector
  const RecoleccionList: Recoleccion[] = [
    {
      Id: 1,
      createdAt: "10/02/2023",
      recolector: 3,
      recolectorname: "Juan",
      costo: 2,
      cajuelas: 1,
      cuartillos: 2,
      total: 10,
      pagado: "Pendiente",
    },
    {
      Id: 2,
      createdAt: "11/02/2023",
      recolector: 3,
      recolectorname: "Juan",
      costo: 3,
      cajuelas: 2,
      cuartillos: 2,
      total: 7.5,
      pagado: "Pagado",
    },
    {
      Id: 3,
      createdAt: "12/02/2023",
      recolector: 3,
      recolectorname: "Juan",
      costo: 5,
      cajuelas: 3,
      cuartillos: 2,
      total: 17.5,
      pagado: "Pendiente",
    },
  ];


  return (
    <Container className="col-lg-6 col-xxl-8 my-5 mx-auto">
      <CustomTitles txt="Nombre del Recolector" />
      <Container>
        <CustomPagoResumen
        nombreZona={"Nombre Zona"}
        periodo={1}
        total={120}
        cuartillos={1}
        cajuelas={10}
      />
      </Container>
       <div className="d-grid gap-2">
        <CustomButtonPrimary
          label="Pagar Pendientes"
          onClick={() => {
            history.push("/PeriodoPago");
          }}
          disabled={false}
        />
      </div>
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

export default RecolectorPago;
