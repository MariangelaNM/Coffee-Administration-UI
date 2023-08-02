import React, { ChangeEvent, FormEvent, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { themes } from "../../styles/ColorStyles";
import { H1 } from "../../styles/TextStyles";
import "bootstrap/dist/css/bootstrap.min.css";

const RecoleccionCreate = () => {
  const [recoleccion, setRecoleccion] = useState({
    recolector: 0,
    costo: 0,
    cajuelas: 0,
    cuartillos: 0
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [validated, setValidated] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      setRecoleccion({
        recolector: 0,
        costo: 0,
        cajuelas: 0,
        cuartillos: 0
      });

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }
  };

  function displayErrorMessage() {
    if (errorMsg) {
      return <div>Error: {errorMsg}</div>;
    }
    return null;
  }

  const handleInputChange = (field: any) => {
    return (e: { target: { value: any; }; }) => {
      setRecoleccion((prev) => ({
        ...prev,
        [field]: e.target.value
      }));
      setErrorMsg("");
    };
  };

  const handleKeyPress = (event: {
    target: any; key: any; preventDefault: () => void;
  }) => {
    const allowedKeys = new Set(['0', '1', '2', '3', '4']);
    const key = event.key;
    const currentValue = event.target.value;
    if (currentValue.length === 1 || !allowedKeys.has(key)) {
      event.preventDefault();
    }
  };

  return (
    <Container className="col-lg-6 col-xxl-4 my-5 mx-auto">
      <Title>{"Nuevo Registro"}</Title>
      {displayErrorMessage()}
      {showSuccessMessage && (
        <div className="alert alert-success" role="alert">
          ¡La Recolección fue guardada con exito!
        </div>
      )}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>

        <Form.Group className="mb-3" controlId="formRecolector">
          <Form.Label>Recolector</Form.Label>
          <Form.Select aria-label="Lista de Recolectores"
            value={recoleccion.recolector}>
            <option>Seleccione un Recolector</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCosto">
          <Form.Label>Costo Unitario (₡)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Valor por cada cajuela (₡)"
            min={1}
            value={recoleccion.costo}
            onChange={handleInputChange("costo")}
            required
          />
          <Form.Control.Feedback type="invalid">
            El campo no puede ser 0
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCajuelas">
          <Form.Label>Cajuelas</Form.Label>
          <Form.Control
            type="number"
            placeholder="Cantidad de Cajuelas"
            value={recoleccion.cajuelas}
            onChange={handleInputChange("cajuelas")}
            required
          />
          <Form.Control.Feedback type="invalid">
            El campo no puede estar vacío
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCuartillo">
          <Form.Label>Cuartillos</Form.Label>
          <Form.Control
            type="number"
            maxLength={1}
            min={0}
            max={4}
            step={1}
            placeholder="Cantidad de Cuartillos"
            value={recoleccion.cuartillos}
            onChange={handleInputChange("cuartillos")}
            onKeyPress={handleKeyPress}
            required
          />
          <Form.Control.Feedback type="invalid">
            El campo no puede ser menor a 0 o mayor a 4
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" className="custombtn-primary no-active-style" type="submit">
            Registrar
          </Button>

          <Button variant="primary" className="custombtn-secondary" type="button">
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

export default RecoleccionCreate;
