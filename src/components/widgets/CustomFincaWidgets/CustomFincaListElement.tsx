import React from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import styled from "styled-components";
import { themes } from "../../../styles/ColorStyles";
import { H3, MediumText } from "../../../styles/TextStyles";
import { FiArrowRight, FiEdit, FiTrash2 } from "react-icons/fi";
import "../Customicon.scss";
import "../CustomZonasWidgets/TableStyle.scss";
import { Finca } from "../../../models/Finca";

interface CustomFincaListElementProps {
  finca: Finca;
  count: string;
  onClick: (id: number) => void;
}

const CustomFincaListElement: React.FC<CustomFincaListElementProps> = ({
  finca,
  count,
  onClick,
}) => {
  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    // Lógica para editar
    console.log("EDITAR");
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    // Lógica para eliminar
    console.log("BORRAR");
  };

  return (
    <Container className="detail-card mb-3" onClick={() => onClick(finca.Id)}>
      <Row className="mt-2">
        <Col className="d-flex flex-column justify-content-center">
          <Col className="d-flex mt-2">
            <TitleTag className="text-selection-disable">Nombre:</TitleTag>
            <div style={{ marginLeft: "5px" }}>
              <Title className="text-selection-disable">{finca.Nombre}</Title>
            </div>
          </Col>
          <Col className="d-flex mt-2">
            <DescriptionTag className="text-selection-disable">
              Ubicación:
            </DescriptionTag>
            <div style={{ marginLeft: "5px" }}>
              <Description className="text-selection-disable">
                {finca.Ubicacion}
              </Description>
            </div>
          </Col>
          <Col className="d-flex mt-2">
            <DescriptionTag className="text-selection-disable">
              Descripción:
            </DescriptionTag>
            <div style={{ marginLeft: "5px" }}>
              <Description className="text-selection-disable">
                {finca.Descripcion}
              </Description>
            </div>
          </Col>
          <Col className="d-flex mt-2">
            <DescriptionTag className="text-selection-disable">
              Zonas:
            </DescriptionTag>
            <div style={{ marginLeft: "5px" }}>
              <Description className="text-selection-disable">
                {count}
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
export default CustomFincaListElement;
