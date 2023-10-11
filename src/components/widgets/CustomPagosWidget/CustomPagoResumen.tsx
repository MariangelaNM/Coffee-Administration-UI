import React from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { themes } from "../../../styles/ColorStyles";
import { H3, MediumText } from "../../../styles/TextStyles";

interface CustomPagoResumenProps {
  nombreZona: string;
  periodo: number;
  total: number; // Total en dinero
  cajuelas: number;
  cuartillos: number;
}

const CustomPagoResumen: React.FC<CustomPagoResumenProps> = ({
  nombreZona,
  periodo,
  total,
  cajuelas,
  cuartillos,
}) => {


  return (
    <div className="data-item">
      <Row>
        <Col className="flex-grow-1">
          <Col className="d-flex mt-2">
            <TitleTag className="text-selection-disable">Zona:</TitleTag>
            <div style={{ marginLeft: "5px" }}>
              <Title className="text-selection-disable">{nombreZona}</Title>
            </div>
          </Col>
          <Col className="d-flex mt-2">
            <DescriptionTag className="text-selection-disable">
              Periodo:
            </DescriptionTag>
            <div style={{ marginLeft: "5px" }}>
              <Description className="text-selection-disable">{periodo}</Description>
            </div>
          </Col>
          <Col className="d-flex mt-2">
            <TitleTag className="text-selection-disable">Total:</TitleTag>
            <div style={{ marginLeft: "5px" }}>
              <Title className="text-selection-disable">${total}.00</Title>
            </div>
          </Col>
          <Col className="d-flex mt-2">
            <DescriptionTag className="text-selection-disable">
              Total de Recolección:
            </DescriptionTag>
            <div style={{ marginLeft: "5px" }}>
              <Description className="text-selection-disable">{cajuelas} Cajuelas + {cuartillos} Cuartillos</Description>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

const Title = styled(H3)`
  color: ${themes.dark.text1};
  text-align: start;
`;
const TitleTag = styled(H3)`
  color: ${themes.dark.cafe_medio};
  text-align: start;
`;
const Description = styled(MediumText)`
  color: ${themes.dark.text1};
  text-align: start;
`;
const DescriptionTag = styled(MediumText)`
  color: ${themes.dark.cafe_medio};
  text-align: start;
  `;
  
export default CustomPagoResumen;
