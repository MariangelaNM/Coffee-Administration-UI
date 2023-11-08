import React, { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import styled from "styled-components";
import { themes } from "../../../styles/ColorStyles";
import { H3 } from "../../../styles/TextStyles";
import { FiEdit } from "react-icons/fi";
import "../Customicon.scss";
import "./TableStyle.scss";
import AlertDialog from "../AlertDialog";
import AlertDialogCostoUnitario from "./AlertDialogCostoUnitario";
//import { useHistory } from "react-router-dom";

interface CustoReleccionCostoUnitarioProps {
  costounitario: number;
  Id: number;
}

const CustoReleccionCostoUnitario: React.FC<
  CustoReleccionCostoUnitarioProps
> = ({ costounitario}) => {
 // const history = useHistory();
  const [openDialog, setOpenDialog] = useState(false);
 // const [texto, setTexto] = useState("");
  const [openEdicion, setOpenEdicion] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setOpenEdicion(false);
  };
  const handleDisagree = () => {
    handleCloseDialog();
  };

  const handleAgree = async () => {
    handleCloseDialog();
    window.location.reload();
  };

  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenEdicion(true);
    // history.push( '/zonas/Edit?zona='+zona.Id);
  };

  return (
    <Container className="detail-card mb-3">
      <Row className="mt-2">
        <Col className="d-flex flex-column justify-content-center">
          <Col className="d-flex mt-2">
            <TitleTag className="text-selection-disable">
              Costo unitario base de este periodo:
            </TitleTag>
            <div style={{ marginLeft: "5px" }}>
              <Title className="text-selection-disable">
                {"₡:" + costounitario}
              </Title>
            </div>
          </Col>
          <Col
            xs={2}
            sm={1}
            className="d-flex justify-content-end justify-content-between"
          ></Col>
        </Col>

        <Col
          xs={2}
          sm={1}
          className="d-flex align-items-center justify-content-center"
        >
          <div className="center-icon">
            <Button variant="link" onClick={handleEditClick}>
              <FiEdit className="custom-icon" />
            </Button>
          </div>
        </Col>
      </Row>
      <AlertDialog
        open={openDialog}
        texto={""}
        handleClose={handleCloseDialog}
        handleDisagree={handleDisagree}
        handleAgree={handleAgree}
      />
      <AlertDialogCostoUnitario
        open={openEdicion}
        costo={costounitario.toString()}
        handleClose={handleCloseDialog}
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

export default CustoReleccionCostoUnitario;
