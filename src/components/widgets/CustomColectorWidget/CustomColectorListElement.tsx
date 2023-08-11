import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import styled from "styled-components";
import { themes } from "../../../styles/ColorStyles";
import { H3, MediumText } from "../../../styles/TextStyles";
import { FiEdit } from "react-icons/fi";
import "../Customicon.scss";
import "../CustomZonasWidgets/TableStyle.scss";
import { Colector } from "../../../models/Colector";

interface CustomColectorListElementProps {
  colector: Colector;
  onClick: (id: number) => void;
}

const CustomColectorListElement: React.FC<CustomColectorListElementProps> = ({
  colector,
  onClick,
}) => {
  return (
    <Container
      className="detail-card mb-3"
      onClick={() => onClick(colector.id)}
    >
      <Row className="mt-2 mb-2">
        <Col className="d-flex flex-column justify-content-center">
          <Description className="text-selection-disable">
            {colector.nombre + " " + colector.apellido}
          </Description>
        </Col>
        <Col
          xs={2}
          sm={1}
          className="d-flex align-items-center justify-content-center"
        >
          <div className="center-icon">
            <FiEdit className="custom-icon" />
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
export default CustomColectorListElement;
