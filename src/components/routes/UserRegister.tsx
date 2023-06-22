import React from "react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

import styled from "styled-components";
import { themes } from "../../styles/ColorStyles";
import { H1 } from "../../styles/TextStyles";

const UserRegister = () => {
  const [errorMsg, setErrorMsg] = useState("");
 
  const [username, setUsername] = useState("");
 
  const [mail, setMail] = useState("");
 
  const [password, setPassword] = useState("");
  const [passwordValidate, setPasswordValidate] = useState(false);
 
  const [confirmPass, setConfirmPass] = useState("");
  const [confirmPassValidate, setConfirmPassValidate] = useState(false);
 
  const [validated, setValidated] = useState(false);

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
  function onChangeUsername(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
    onChangeAnyInput();
  }

  function onChangeMail(e: ChangeEvent<HTMLInputElement>) {
    setMail(e.target.value);
    onChangeAnyInput();
  }

  function onChangePassword(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    if (
      e.target.value.length > 8 &&
      e.target.value.search(/[a-z]/) > 0 &&
      e.target.value.search(/[A-Z]/) > 0 &&
      e.target.value.search(/[0-9]/) > 0
    ) {
      setPasswordValidate(false);
    } else {
      setPasswordValidate(true);
    }

    onChangeAnyInput();
  }

  function onChangeConfirmPassword(e: ChangeEvent<HTMLInputElement>) {
    setConfirmPass(e.target.value);
    if (password == "") {
      setConfirmPassValidate(false);
    } else {
      if (confirmPass == password) {
        setConfirmPassValidate(true);
      } else {
        setConfirmPassValidate(false);
      }
    }
    onChangeAnyInput();
  }

  return (
    <Container className="col-lg-6 col-xxl-4 my-5 mx-auto">
      <Title>{"Crea una nueva cuenta"}</Title>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3 sm-1" controlId="formName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre"
            value={username}
            onChange={onChangeUsername}
            required
          />
          <Form.Control.Feedback type="invalid">
            El campo no puede estar vacio{" "}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Correo</Form.Label>
          <Form.Control
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
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="text"
            placeholder="Contraseña"
            value={password}
            onChange={onChangePassword}
            // isInvalid={true}
            required
          />
          <Form.Control.Feedback type="invalid">
            La contraseña debe contener 8 caracteres, 1 mayuscula, 1 número{" "}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirma tu contraseña</Form.Label>
          <Form.Control
            type="text"
            placeholder="Confirma tu contraseña"
            value={confirmPass}
            onChange={onChangeConfirmPassword}
            // isInvalid={true}
            required
          />
          <Form.Control.Feedback type="invalid">
            El campo no coincide con la contraseña{" "}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" className="custombtn-primary" type="submit">
            Registrar
          </Button>

          <Button variant="primary" className="custombtn-secondary">Cancelar</Button>
        </div>
      </Form>
    </Container>
  );
};

const Title = styled(H1)`
  color: ${themes.dark.text1};
  text-align: start;
`;

export default UserRegister;
