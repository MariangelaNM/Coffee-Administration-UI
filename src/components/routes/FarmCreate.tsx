
import React, { useState, useRef } from "react";
import { Container, Form, Button, Alert, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { themes } from "../../styles/ColorStyles";
import { H1 } from "../../styles/TextStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const FarmCreate = () => {
  const [farmData, setFarmData] = useState({
    name: "",
    description: "",
    startDate: null,
  });

  const [submitStatus, setSubmitStatus] = useState("");
  const [isInteracted, setIsInteracted] = useState(false);
  const datePickerRef = useRef(null);

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

  const handleDateChange = (date) => {
    setFarmData({ ...farmData, startDate: date });
  };

  const handleDateIconClick = () => {
    datePickerRef.current.setOpen(true);
  };

  const isFormValid = () => {
    return (
      farmData.name.trim() === "" ||
      farmData.description.trim() === "" ||
      farmData.startDate === null
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
            placeholder="Ubicado en..."
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

        <Form.Group className="mb-3" controlId="formStartDate">
          <Form.Label>Fecha de inicio</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              value={
                farmData.startDate
                  ? farmData.startDate.toLocaleDateString()
                  : ""
              }
              readOnly
              onClick={handleDateIconClick}
              required
              isInvalid={isInteracted && farmData.startDate === null}
            />
            <InputGroup.Text onClick={handleDateIconClick}>
              <FontAwesomeIcon icon={faCalendarAlt} />
            </InputGroup.Text>
            <DatePicker
              selected={farmData.startDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              className="form-control d-none"
              ref={datePickerRef}
            />
          </InputGroup>
          <Form.Control.Feedback type="invalid">
            {isInteracted && farmData.startDate === null && (
              <span>La fecha de inicio es obligatoria</span>
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


