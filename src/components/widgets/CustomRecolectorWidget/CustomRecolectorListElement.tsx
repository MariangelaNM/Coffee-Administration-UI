import React, { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import styled from "styled-components";
import { themes } from "../../../styles/ColorStyles";
import {  MediumText } from "../../../styles/TextStyles";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import "../Customicon.scss";
import "../CustomZonasWidgets/TableStyle.scss";
import { Recolector } from "../../../models/Recolector";
import AlertDialog from "../AlertDialog";
import createApiClient from "../../../api/api-client-factory";
import { useHistory } from "react-router-dom";

interface CustomRecolectorListElementProps {
  recolector: Recolector;
  onClick: (id: number) => void;
}

const CustomRecolectorListElement: React.FC<CustomRecolectorListElementProps> = ({
  recolector,
}) => {
  
  const history = useHistory();
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
      "/recolectores/" + recolector.Id,
      undefined
    );
    handleCloseDialog();
    window.location.reload();
  };
  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    history.push("/Recolectores/Edit?recolector=" + recolector.Id);
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setTexto(`Eliminar el recolector "${recolector.Nombre}"`);
    setOpenDialog(true);
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
                {recolector.Nombre + " " + recolector.Apellidos}
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

const Description = styled(MediumText)`
  color: ${themes.dark.text1};
  text-align: start;
`;
const DescriptionTag = styled(MediumText)`
  color: ${themes.dark.cafe_medio};
  text-align: start;
`;
export default CustomRecolectorListElement;
