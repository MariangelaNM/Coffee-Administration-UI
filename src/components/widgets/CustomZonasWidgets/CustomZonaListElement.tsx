import React, { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import styled from "styled-components";
import { themes } from "../../../styles/ColorStyles";
import { H3, MediumText } from "../../../styles/TextStyles";
import { FiArrowRight, FiEdit, FiTrash2 } from "react-icons/fi";
import "../Customicon.scss";
import "./TableStyle.scss";
import { Zona } from "../../../models/Zona";
import AlertDialog from "../AlertDialog";
import createApiClient from "../../../api/api-client-factory";

interface CustomZonaListElementProps {
  zona: Zona;
  count: string;
  onClick: (id: number) => void;
}

const CustomZonaListElement: React.FC<CustomZonaListElementProps> = ({
  zona,
  count,
  onClick,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [texto, setTexto] = useState("");
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleDisagree = () => {
    handleCloseDialog();
  };

  const handleAgree = async () => {
    await createApiClient().makeApiRequest(
      "DELETE",
      "/zonas/" + zona.Id,
      undefined
    );
    handleCloseDialog();
    window.location.reload();
  };

  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    window.location.href = "/zonas/Edit?zona=" + zona.Id;
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setTexto(`Eliminar la Zona "${zona.Nombre}"`);
    setOpenDialog(true);
    console.log("BORRAR");
  };
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClick(zona.Id);
  };

  return (
    <Container className="detail-card mb-3">
      <Row className="mt-2">
        <Col className="d-flex flex-column justify-content-center">
          <Col className="d-flex mt-2">
            <TitleTag className="text-selection-disable">Nombre:</TitleTag>
            <div style={{ marginLeft: "5px" }}>
              <Title className="text-selection-disable">{zona.Nombre}</Title>
            </div>
          </Col>
          <Col className="d-flex mt-2">
            <DescriptionTag className="text-selection-disable">
              Descripción:
            </DescriptionTag>
            <div style={{ marginLeft: "5px" }}>
              <Description className="text-selection-disable">
                {zona.Descripcion}
              </Description>
            </div>
          </Col>
          <Col className="d-flex mt-2">
            <DescriptionTag className="text-selection-disable">
              Periodos:
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
            <Button variant="link" onClick={handleClick}>
              <FiArrowRight className="custom-icon-big" />
            </Button>
          </div>
        </Col>
      </Row>
      <AlertDialog
        open={openDialog}
        texto={texto}
        handleClose={handleCloseDialog}
        handleDisagree={handleDisagree}
        handleAgree={handleAgree}
      />
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
export default CustomZonaListElement;
