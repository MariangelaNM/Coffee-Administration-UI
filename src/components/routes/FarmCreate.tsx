import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import styled from "styled-components";
import { themes } from "../../styles/ColorStyles";
import { H1 } from "../../styles/TextStyles";

const FarmCreate = () => {
  const [farmData, setFarmData] = useState({
    name: "",
    description: "",
    location: "",
  });

  const [submitStatus, setSubmitStatus] = useState("");
  const [isInteracted, setIsInteracted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsInteracted(true);

    if (!isFormValid()) {
      setSubmitStatus("success");
      console.log(farmData);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFarmData({ ...farmData, [name]: value });
  };

  const isFormValid = () => {
    return (
      farmData.name.trim() === "" ||
      farmData.description.trim() === "" ||
      farmData.location.trim() === ""
    );
  };

  return (
    <Container className="col-lg-6 col-xxl-4 my-5 mx-auto">
      <Title>{"Crear una nueva finca"}</Title>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formFarmName">
          <Form.Label>Nombre de la finca</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Nombre Completo"
            value={farmData.name}
            onChange={handleInputChange}
            required
            isInvalid={isInteracted && farmData.name.trim() === ""}
          />
          <Form.Control.Feedback type="invalid">
            {isInteracted && farmData.name.trim() === "" && (
              <span>El nombre de la finca es obligatorio</span>
            )}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            placeholder="Datos Generales de la Finca"
            value={farmData.description}
            onChange={handleInputChange}
            required
            isInvalid={isInteracted && farmData.description.trim() === ""}
          />
          <Form.Control.Feedback type="invalid">
            {isInteracted && farmData.description.trim() === "" && (
              <span>La descripción es obligatoria</span>
            )}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLocation">
          <Form.Label>Ubicación</Form.Label>
          <Form.Control
            type="text"
            name="location"
            placeholder="Ubicación de la finca"
            value={farmData.location}
            onChange={handleInputChange}
            required
            isInvalid={isInteracted && farmData.location.trim() === ""}
          />
          <Form.Control.Feedback type="invalid">
            {isInteracted && farmData.location.trim() === "" && (
              <span>La ubicación es obligatoria</span>
            )}
          </Form.Control.Feedback>
        </Form.Group>

        {submitStatus === "success" && (
          <Alert variant="success">La finca se creó exitosamente</Alert>
        )}

        <div className="d-grid gap-2">
          <Button
            variant="primary"
            className="custombtn-primary no-active-style"
            type="submit"
          >
            Guardar
          </Button>

          <Button variant="primary" className="custombtn-secondary">
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
