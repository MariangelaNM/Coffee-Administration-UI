import { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import styled from "styled-components";
import { themes } from "../../styles/ColorStyles";
import { H1 } from "../../styles/TextStyles";
import "bootstrap/dist/css/bootstrap.min.css";
import createApiClient from "../../api/api-client-factory";
import { Recolector } from "../../models/Recolector";
import { useHistory, useLocation } from "react-router-dom";
import { useUser } from '../UserContext';
const RecolectorCreate = () => {
  const history = useHistory();
  const location = useLocation();
  const [errorMsg, setErrorMsg] = useState("");
  const [validated, setValidated] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showSuccessMessageError, setShowSuccessMessageError] = useState(false);
  const [recolectorId, setRecolectorId] = useState<string>("");
  const { userId } = useUser();
  const [recolector, setRecolector] = useState<Recolector>({
    Id: undefined,
    CaficultorID: userId !== null ? parseInt(userId, 10) : 0,
    Nombre: "",
    Apellidos: "",
    Identificacion: undefined,
    Cel: undefined,
    createdAt: undefined,
    updatedAt: undefined,
  });

  useEffect(() => {

    console.log(recolector.CaficultorID);
    if (userId != null) {
      CallIds();
      recolectorData();
    } else {
      history.push(`/login`);
    }
  }, []); // Añade recolectorId como dependencia


  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecolector((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSuccessMessageError(false);
    if (!e.currentTarget.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
    } else {
      try {
        const apiClient = createApiClient();
        const apiPath = recolectorId ? `/recolectores/${recolectorId}` : "/recolectores";
        const response = await apiClient.makeApiRequest(
          recolectorId ? "PATCH" : "POST",
          apiPath,
          recolector
        );

        if (response.message !== undefined) {
          handleApiError();
        } else {
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
            history.push("/Recolectores");
          }, 2000);
        }
      } catch (error) {
        handleApiError();
      }
    }
  };

  const CallIds = () => {
    const queryParams = new URLSearchParams(location.search);
    const recolectorString = queryParams.get("recolector");
    if (recolectorString) {
      setRecolectorId(recolectorString);
    }
  };

  const recolectorData = async () => {
    const queryParams = new URLSearchParams(location.search);
    const recolectorString = queryParams.get("recolector");

    if (recolectorString != null) {
      try {
        const response = await createApiClient().makeApiRequest("GET", `/recolectores/${recolectorString}/recolector`, null);
        setRecolector(response as unknown as Recolector);
      } catch {
        history.push(`/error`);
      }
    }
  };

  const handleApiError = () => {
    setShowSuccessMessageError(true);
    setValidated(true);
    setErrorMsg("Error en la respuesta de la API");
  };

  const Cancelar = () => {
    history.push(`/Recolectores`);
  };

  return (
    <Container className="col-lg-6 col-xxl-4 my-5 mx-auto">
      <Title>{recolectorId != "" ? "Editar Recolector" : "Crear un Nueva Recolector"}</Title>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3 sm-1" controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre"
            value={recolector.Nombre}
            onChange={handleInputChange("Nombre")}
            required
          />
          <Form.Control.Feedback type="invalid">
            El campo no puede estar vacío
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formApellidos">
          <Form.Label>Apellidos</Form.Label>
          <Form.Control
            type="text"
            placeholder="Apellidos del Recolector"
            value={recolector.Apellidos}
            onChange={handleInputChange("Apellidos")}
            required
          />
          <Form.Control.Feedback type="invalid">
            El campo no puede estar vacío
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formIdentificacion">
          <Form.Label>Identificación</Form.Label>
          <Form.Control
            type="text"
            placeholder="Identificación del Recolector"
            value={recolector.Identificacion}
            onChange={handleInputChange("Identificacion")}
            required
          />
          <Form.Control.Feedback type="invalid">
            El campo no puede estar vacío
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTelefono">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="number"
            placeholder="Número de Teléfono del Recolector"
            value={recolector.Cel}
            onChange={handleInputChange("Cel")}
            required
            maxLength={8} // Add maxLength to limit the input to 8 characters
          />
          <Form.Control.Feedback type="invalid">
            El campo no puede estar vacío
          </Form.Control.Feedback>
        </Form.Group>

        {showSuccessMessageError && (
          <Alert severity="error" style={{ marginBottom: "10px", marginTop: "10px" }}>
            Error: {errorMsg}
          </Alert>
        )}
        {showSuccessMessage && (
          <Alert severity="success" style={{ marginBottom: "10px", marginTop: "10px" }}>
            ¡El recolector se registro exitosamente!
          </Alert>
        )}
        <div className="d-grid gap-2">
          <Button
            variant="primary"
            className="custombtn-primary no-active-style"
            type="submit"
          >
            {recolectorId != "" ? "Editar Recolector" : "Crear Recolector"}
          </Button>

          <Button
            variant="primary"
            className="custombtn-secondary"
            type="button"
            onClick={() => Cancelar()}
          >
            Cancelar
          </Button>
        </div>
      </Form>
    </Container>
  );
};

const Title = styled(H1)`
  color: ${themes.dark.text1};
  text-align: start;
`;

export default RecolectorCreate;
