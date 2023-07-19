import React, { ChangeEvent, FormEvent, useState } from "react";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import styled from "styled-components";
import { themes } from "../../styles/ColorStyles";
import { H1 } from "../../styles/TextStyles";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

const UserRegister = () => {
  const [errorMsg, setErrorMsg] = useState("");

  const [username, setUsername] = useState("");

  const [lastName, setlastName] = useState("");

  const [mail, setMail] = useState("");

  const [password, setPassword] = useState("");
  const [passwordValidate, setPasswordValidate] = useState(false);

  const [confirmPass, setConfirmPass] = useState("");
  const [confirmPassValidate, setConfirmPassValidate] = useState(false);

  const [validated, setValidated] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

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

  function onChangeLastName(e: ChangeEvent<HTMLInputElement>) {
    setlastName(e.target.value);
    onChangeAnyInput();
  }


  function onChangeMail(e: ChangeEvent<HTMLInputElement>) {
    setMail(e.target.value);
    onChangeAnyInput();
  }

  function onChangePassword(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    const value = e.target.value;
    if (
      value.length >= 8 &&
      /[a-z]/.test(value) &&
      /[A-Z]/.test(value) &&
      /[0-9]/.test(value)
    ) {
      setPasswordValidate(false);
    } else {
      setPasswordValidate(true);
    }

    onChangeAnyInput();
  }

  function onChangeConfirmPassword(e: ChangeEvent<HTMLInputElement>): void {
    setConfirmPass(e.target.value);
    const value = e.target.value;
    if (password === "") {
      setConfirmPassValidate(false);
    } else {
      if (value === password) {
        setConfirmPassValidate(false); // Las contraseñas coinciden
      } else {
        setConfirmPassValidate(true); // Las contraseñas no coinciden
      }
    }
    onChangeAnyInput();
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassVisibility = () => {
    setShowConfirmPass(!showConfirmPass);
  };

  function displayErrorMessage() {
    if (errorMsg) {
      return <div>Error: {errorMsg}</div>;
    }
    return null;
  }
  
    const postData = async () => {
      debugger;
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          "Correo": mail,
          "Contrasena": password,
          "Nombres": username,
          "Apellidos": lastName,
          "Role": 1
        });

        const response = await fetch("http://localhost:3000/users",{
          method: 'POST',
          headers: myHeaders,
          body: raw
        });
        const result = await response.text();
        console.log(result);
      } catch (error) {
        console.error('Error:', error);
      }
    };


  function create(){
    postData();
  };
  return (
    <Container className="col-lg-6 col-xxl-4 my-5 mx-auto">
      <Title>{"Crea una nueva cuenta"}</Title>
      {displayErrorMessage()} {/* Mostrar mensaje de error */}
      <Form noValidate validated={validated} >
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

        <Form.Group className="mb-3 sm-1" controlId="formLastName">
          <Form.Label>Apellidos</Form.Label>
          <Form.Control
            type="text"
            placeholder="Apellidos"
            value={lastName}
            onChange={onChangeLastName}
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
            placeholder="correo@domain.com"
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
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={onChangePassword}
              required
              isInvalid={passwordValidate}
            />
            <InputGroup.Text onClick={togglePasswordVisibility}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </InputGroup.Text>
          </InputGroup>
          {passwordValidate && (
            <Form.Text className="text-danger">
              La contraseña debe contener al menos 8 caracteres, 1 mayúscula y 1
              número
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirma tu contraseña</Form.Label>
          <InputGroup>
            <Form.Control
              type={showConfirmPass ? "text" : "password"}
              placeholder="Contraseña"
              value={confirmPass}
              onChange={onChangeConfirmPassword}
              required
              isInvalid={confirmPassValidate}
            />
            <InputGroup.Text onClick={toggleConfirmPassVisibility}>
              {showConfirmPass ? <FiEyeOff /> : <FiEye />}
            </InputGroup.Text>
          </InputGroup>
          {confirmPassValidate && (
            <Form.Text className="text-danger">
              Las contraseñas no coinciden
            </Form.Text>
          )}
          {!confirmPass && (
            <Form.Text className="text-danger">
              Este campo es obligatorio
            </Form.Text>
          )}
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" className="custombtn-primary no-active-style" onClick={()=>create()}>
            Registrar
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

export default UserRegister;
