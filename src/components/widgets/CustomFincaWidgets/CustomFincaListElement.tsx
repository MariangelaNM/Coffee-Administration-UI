import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import styled from "styled-components";
import { themes } from "../../../styles/ColorStyles";
import { H3, MediumText } from "../../../styles/TextStyles";
import { FiArrowRight } from "react-icons/fi";
import "../Customicon.scss";
import "../CustomZonasWidgets/TableStyle.scss";
import { Farm } from "../../../models/Farm";

interface CustomFincaListElementProps {
  farm: Farm;
  count: string;
  onClick: (id: number) => void;
}

const CustomFincaListElement: React.FC<CustomFincaListElementProps> = ({
    farm,
  count,
  onClick,
}) => {
  return (
    <Container className="detail-card mb-3" onClick={() => onClick(farm.id)}>
      <Row className="mt-2">
        <Col className="d-flex flex-column justify-content-center">
          <Title className="text-selection-disable">{farm.nombre}</Title>
          <Description className="text-selection-disable">
          {farm.ubicacion}
          </Description>
          <Description className="text-selection-disable">
            {farm.descripcion}
          </Description>
          <Description className="text-selection-disable">
            {count + " zonas"}
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
export default CustomFincaListElement;
