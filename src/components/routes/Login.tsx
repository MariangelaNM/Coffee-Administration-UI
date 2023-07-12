import React from "react";
import { ChangeEvent, FormEvent, useState } from "react";

import { Container, Form, Button, InputGroup } from "react-bootstrap";
import styled from "styled-components";
import { themes } from "../../styles/ColorStyles";
import { H1 } from "../../styles/TextStyles";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const [validated, setValidated] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
  };

  function onChangeAnyInput() {
    setErrorMsg("");
  }

  function onChangeMail(e: ChangeEvent<HTMLInputElement>) {
    setMail(e.target.value);
    onChangeAnyInput();
  }

  function onChangePassword(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    onChangeAnyInput();
  }

  return (
    <Container className="col-lg-6 col-xxl-4 my-5 mx-auto">
      <Title>{"Ingresar"}</Title>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label className="labelForm">Correo</Form.Label>
          <Form.Control
            className="inputForm"
            type="email"
            placeholder="Correo"
            value={mail}
            onChange={onChangeMail}
            required
          />
          <Form.Control.Feedback type="invalid">
            El campo debe ser un correo valido{" "}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="labelForm">Contraseña</Form.Label>
          <InputGroup>
            <Form.Control
              className="inputForm"
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={onChangePassword}
              required
            />
            <InputGroup.Text
              className="inputGroupico"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <div className="d-grid gap-2">
          <Button
            variant="primary"
            className="custombtn-primary"
            onClick={() => {
              console.log("Login");
            }}
          >
            Iniciar sesión
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
export default Login;
