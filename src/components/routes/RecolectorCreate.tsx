import React, { ChangeEvent, FormEvent, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { themes } from "../../styles/ColorStyles";
import { H1 } from "../../styles/TextStyles";
import "bootstrap/dist/css/bootstrap.min.css";

const RecolectorCreate = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [validated, setValidated] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      // Save the data (you'll need to implement this part with your backend)
      setShowSuccessMessage(true);
      setNombre("");
      setApellido("");
      setIdentificacion("");
      setTelefono("");

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }
  };

  function onChangeAnyInput() {
    setErrorMsg("");
  }

  function onChangeNombre(e: ChangeEvent<HTMLInputElement>) {
    setNombre(e.target.value);
    onChangeAnyInput();
  }

  function onChangeApellido(e: ChangeEvent<HTMLInputElement>) {
    setApellido(e.target.value);
    onChangeAnyInput();
  }

  function onChangeIdentificacion(e: ChangeEvent<HTMLInputElement>) {
    setIdentificacion(e.target.value);
    onChangeAnyInput();
  }

  function onChangeTelefono(e: ChangeEvent<HTMLInputElement>) {
    setTelefono(e.target.value);
    onChangeAnyInput();
  }

  function displayErrorMessage() {
    if (errorMsg) {
      return <div>Error: {errorMsg}</div>;
    }
    return null;
  }

  return (
    <Container className="col-lg-6 col-xxl-4 my-5 mx-auto">
      <Title>{"Crear un nuevo recolector"}</Title>
      {displayErrorMessage()}
      {showSuccessMessage && (
        <div className="alert alert-success" role="alert">
          ¡El recolector ha sido registrado exitosamente!
        </div>
      )}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3 sm-1" controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre del recolector"
            value={nombre}
            onChange={onChangeNombre}
            required
          />
          <Form.Control.Feedback type="invalid">
            El campo no puede estar vacío
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3 sm-1" controlId="formApellido">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            placeholder="Apellido del recolector"
            value={apellido}
            onChange={onChangeApellido}
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
            placeholder="Número de identificación del recolector"
            value={identificacion}
            onChange={onChangeIdentificacion}
            required
          />
          <Form.Control.Feedback type="invalid">
            El campo no puede estar vacío
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTelefono">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="text"
            placeholder="Número de teléfono del recolector"
            value={telefono}
            onChange={onChangeTelefono}
            required
          />
          <Form.Control.Feedback type="invalid">
            El campo no puede estar vacío
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" className="custombtn-primary no-active-style" type="submit">
            Crear Recolector
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

export default RecolectorCreate;
