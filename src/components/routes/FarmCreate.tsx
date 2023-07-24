import React, { ChangeEvent, FormEvent, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { themes } from "../../styles/ColorStyles";
import { H1 } from "../../styles/TextStyles";
import "bootstrap/dist/css/bootstrap.min.css";

const FarmCreate = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [farmName, setFarmName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [validated, setValidated] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); 

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      
      setShowSuccessMessage(true); 
      setFarmName("");
      setDescription("");
      setLocation("");

      
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000); 
    }
  };

  function onChangeAnyInput() {
    setErrorMsg("");
  }

  function onChangeFarmName(e: ChangeEvent<HTMLInputElement>) {
    setFarmName(e.target.value);
    onChangeAnyInput();
  }

  function onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
    onChangeAnyInput();
  }

  function onChangeLocation(e: ChangeEvent<HTMLInputElement>) {
    setLocation(e.target.value);
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
      <Title>{"Crear una nueva finca"}</Title>
      {displayErrorMessage()}
      {showSuccessMessage && (
        <div className="alert alert-success" role="alert">
          ¡La finca ha sido registrada exitosamente!
        </div>
      )}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3 sm-1" controlId="formFarmName">
          <Form.Label>Nombre de la finca</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre de la finca"
            value={farmName}
            onChange={onChangeFarmName}
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
            value={description}
            onChange={onChangeDescription}
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
            value={location}
            onChange={onChangeLocation}
            required
          />
          <Form.Control.Feedback type="invalid">
            El campo no puede estar vacío
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" className="custombtn-primary no-active-style" type="submit">
            Crear Finca
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

export default FarmCreate;
