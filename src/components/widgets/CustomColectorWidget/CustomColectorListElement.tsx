import React from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import styled from "styled-components";
import { themes } from "../../../styles/ColorStyles";
import { H3, MediumText } from "../../../styles/TextStyles";
import { FiEdit, FiTrash2 } from "react-icons/fi";
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
  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    // Lógica para editar
    console.log("EDITAR");
    onClick(colector.id);
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    // Lógica para eliminar
    console.log("BORRAR");
  };
  return (
    <Container className="detail-card mb-3">
      <Row className="mt-2 mb-2">
        <Col className="d-flex flex-column justify-content-center">
          <Col className="d-flex mt-2">
            <DescriptionTag className="text-selection-disable">
              Nombre:
            </DescriptionTag>
            <div style={{ marginLeft: "5px" }}>
              <Description className="text-selection-disable">
                {colector.nombre + " " + colector.apellido}
              </Description>
            </div>
          </Col>
          <Col
            xs={2}
            sm={1}
            className="d-flex justify-content-end justify-content-between"
          >
            <Button variant="link" onClick={handleEditClick}>
              <FiEdit className="custom-icon" />
            </Button>
            <Button variant="link" onClick={handleDeleteClick}>
              <FiTrash2 className="custom-icon-red" />
            </Button>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

const Description = styled(MediumText)`
  color: ${themes.dark.text1};
  text-align: start;
`;
const DescriptionTag = styled(MediumText)`
  color: ${themes.dark.cafe_medio};
  text-align: start;
`;
export default CustomColectorListElement;
