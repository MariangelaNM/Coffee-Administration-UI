import { FormEvent, useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import styled from "styled-components";
import { themes } from "../../styles/ColorStyles";
import { H1 } from "../../styles/TextStyles";
import "bootstrap/dist/css/bootstrap.min.css";
import createApiClient from "../../api/api-client-factory";
import { Finca } from "../../models/Finca";
import { useHistory } from "react-router-dom";

const FarmCreate = () => {
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState("");
  const [validated, setValidated] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showSuccessMessageError, setShowSuccessMessageError] = useState(false);
  const [fincaId, setFincaId] = useState("");
  let id: string;
  const storedID = localStorage.getItem('id');
  const [finca, setFinca] = useState<Finca>({
    Id: undefined,
    CaficultorID: storedID !== null ? parseInt(storedID, 10) : 0,
    Nombre: "",
    Ubicacion: "",
    Descripcion: ""
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem('id');
    if (storedUserId != null) {
      CallIds();
      fincaData();
    }
    else {
      history.push(
        `/login`
      );
    }
  }, [])

  const handleInputChange = (field: string) => (e: { target: { value: any; }; }) => {
    setFinca((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSuccessMessageError(false);
    if (!e.currentTarget.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
    } else {
      try {
        const apiClient = createApiClient();
        const apiPath = fincaId ? `/fincas/${fincaId}` : "/fincas";
        const response = await apiClient.makeApiRequest(
          fincaId ? "PATCH" : "POST",
          apiPath,
          finca
        );

        if (response.message != undefined) {
          setShowSuccessMessageError(true);
          e.stopPropagation();
          setValidated(true);
          setErrorMsg("Error en la respuesta de la API");
        } else {
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
            history.push("/Fincas");
          }, 2000);
        }
      } catch (error) {
        setShowSuccessMessageError(true);
        e.stopPropagation();
        setValidated(true);
        setErrorMsg("Error en la respuesta de la API");
      }
    }
  };


  function CallIds() {
    const queryParams = new URLSearchParams(location.search);
    const fincaString = queryParams.get("farm");
    if (fincaString) {
      id = (fincaString);
      setFincaId(id);
    }
  }
  async function fincaData() {
    if (id != undefined) {
      try {
        const response = await createApiClient().makeApiRequest("GET", "/fincas/" + id, null);
        setFinca(response as unknown as Finca);
      }
      catch {
        history.push(
          `/error`
        );
      }
    }
  }

  async function Cancelar() {
    history.push(
      `/Fincas`
    );
  }

  return (
    <Container className="col-lg-6 col-xxl-4 my-5 mx-auto">
      <Title>{fincaId != "" ? "Editar Finca" : "Crear una Nueva Finca"}</Title>
      {showSuccessMessageError && (
        <Alert severity="error" style={{ marginBottom: "10px" }}>
          Error: {errorMsg}
        </Alert>
      )}
      {showSuccessMessage && (
        <Alert severity="success" style={{ marginBottom: "10px" }}>
          ¡La finca ha sido registrada exitosamente!
        </Alert>
      )}

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3 sm-1" controlId="formFarmName">
          <Form.Label>Nombre de la finca</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre de la finca"
            value={finca.Nombre}
            onChange={handleInputChange("Nombre")}
            required
          />
          <Form.Control.Feedback type="invalid">
            El campo no puede estar vacío
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3 sm-1" controlId="formDescription">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Detalles importante de la finca"
            value={finca.Descripcion}
            onChange={handleInputChange("Descripcion")}
            required
          />
          <Form.Control.Feedback type="invalid">
            El campo no puede estar vacío
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLocation">
          <Form.Label>Ubicación</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ubicación de la finca"
            value={finca.Ubicacion}
            onChange={handleInputChange("Ubicacion")}
            required
          />
          <Form.Control.Feedback type="invalid">
            El campo no puede estar vacío
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-grid gap-2">
          <Button
            variant="primary"
            className="custombtn-primary no-active-style"
            type="submit"
          >
            {fincaId != "" ? "Editar Finca" : "Crear Finca"}
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

export default FarmCreate;
