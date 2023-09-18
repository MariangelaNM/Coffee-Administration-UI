import React, { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import styled from "styled-components";
import { themes } from "../../../styles/ColorStyles";
import { H3, MediumText } from "../../../styles/TextStyles";
import { FiArrowRight, FiEdit, FiTrash2 } from "react-icons/fi";
import "../Customicon.scss";
import "../CustomZonasWidgets/TableStyle.scss";
import { Finca } from "../../../models/Finca";
import AlertDialog from "../AlertDialog";
import createApiClient from "../../../api/api-client-factory";
import { useHistory } from 'react-router-dom';
import Alert from "@mui/material/Alert";
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
    await createApiClient().makeApiRequest("DELETE", "/fincas/"+finca.Id, undefined);
    handleCloseDialog();
    if (response.message != undefined) {
      setShowSuccessMessageError(true);
      setTimeout(() => {
        setShowSuccessMessageError(false);
      }, 4000);
    }
    else {
      window.location.reload();
    }
  };

  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    history.push('/Fincas/Edit?farm=' + finca.Id);

  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setTexto(`Eliminar la Finca "${finca.Nombre}"`);
    setOpenDialog(true);
    console.log("BORRAR");
  };
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClick(finca.Id);
  };

  return (
    <Container className="detail-card mb-3">
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
            {showSuccessMessageError && (
              <Alert severity="error" style={{ marginBottom: "10px", marginTop: "10px" }}>
                Está Finca cuenta con Zonas
              </Alert>
            )}
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
export default CustomFincaListElement;
