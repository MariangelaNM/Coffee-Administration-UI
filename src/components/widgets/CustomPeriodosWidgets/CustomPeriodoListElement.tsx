import React, { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import styled from "styled-components";
import { themes } from "../../../styles/ColorStyles";
import { H3, MediumText } from "../../../styles/TextStyles";
import { FiArrowRight, FiEdit, FiTrash2 } from "react-icons/fi";
import "../Customicon.scss";
import "../CustomZonasWidgets/TableStyle.scss";
import { Periodo } from "../../../models/Periodo";
import { TipoRecoleccion } from "../../../models/TipoRecoleccion";
import createApiClient from "../../../api/api-client-factory";
import { useHistory, useLocation } from "react-router-dom";
import AlertDialog from "../AlertDialog";
interface CustomPeriodoListElementProps {
  periodo: Periodo;

  onClick: (id: number) => void;
}

const CustomPeriodoListElement: React.FC<CustomPeriodoListElementProps> = ({
  periodo,

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

  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    history.push( `/Periodos/Edit?periodo=${periodo.Id}&zona=${periodo.zona}`);
    console.log("EDITAR");
  };

  const handleAgree = async () => {
    await createApiClient().makeApiRequest(
      "DELETE",
      "/periodos/" + periodo.Id,
      undefined
    );
    handleCloseDialog();
    window.location.reload();
  };
  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setTexto(`Eliminar el Periodo"`);
    setOpenDialog(true);
    console.log("BORRAR");
  };

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClick(periodo.Id);
  };

  const desde = new Date(periodo.Desde).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const hasta = new Date(periodo.Hasta).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  return (
    <Container className="detail-card mb-3" >
      <Row className="mt-2">
        <Col className="d-flex flex-column justify-content-center">
          <Col className="d-flex mt-2">
            <TitleTag className="text-selection-disable">Periodo:</TitleTag>
            <div style={{ marginLeft: "5px" }}>
              <Title className="text-selection-disable">
                {TipoRecoleccion[periodo.TipoRecoleccionID]}
              </Title>
            </div>
          </Col>

          <Col className="d-flex mt-2">
            <DescriptionTag className="text-selection-disable">
              Costo por unidad:
            </DescriptionTag>
            <div style={{ marginLeft: "5px" }}>
              <Description className="text-selection-disable">
                {"$" + periodo.PrecioCajuela}
              </Description>
            </div>
          </Col>
          <Description className="text-selection-disable">
            {desde + " - " + hasta}
          </Description>
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
export default CustomPeriodoListElement;
