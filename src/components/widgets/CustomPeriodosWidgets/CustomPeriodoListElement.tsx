import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import styled from "styled-components";
import { themes } from "../../../styles/ColorStyles";
import { H3, MediumText } from "../../../styles/TextStyles";
import { FiArrowRight } from "react-icons/fi";
import "../Customicon.scss";
import "../CustomZonasWidgets/TableStyle.scss";
import { Periodo } from "../../../models/Periodo";
import { TipoRecoleccion }  from "../../../models/TipoRecoleccion";


interface CustomPeriodoListElementProps {
  periodo: Periodo;

  onClick: (id: number) => void;
}


const CustomPeriodoListElement: React.FC<CustomPeriodoListElementProps> = ({
  periodo,

  onClick,
}) => {
  const desde = periodo.Desde.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const hasta = periodo.Hasta.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  return (
    <Container className="detail-card mb-3" onClick={() => onClick(periodo.id)}>
      <Row className="mt-2">
        <Col className="d-flex flex-column justify-content-center">
          <Title className="text-selection-disable">{TipoRecoleccion[periodo.TipoRecoleccionID]}</Title>
          <Description className="text-selection-disable">
            {desde+ " - " + hasta}
          </Description>
          <Description className="text-selection-disable">
            {"$" + periodo.Value}
          </Description>
        </Col>
        <Col
          xs={2}
          sm={1}
          className="d-flex align-items-center justify-content-center"
        >
          <div className="center-icon">
            <FiArrowRight className="custom-icon" />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const Title = styled(H3)`
  color: ${themes.dark.text1};
  text-align: start;
`;

const Description = styled(MediumText)`
  color: ${themes.dark.text1};
  text-align: start;
`;
export default CustomPeriodoListElement;
