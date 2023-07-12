import { ChangeEvent, useState, useEffect, useMemo } from "react";
import { Container, Form, Button, InputGroup, Alert } from "react-bootstrap";
import styled from "styled-components";
import { themes } from "../../styles/ColorStyles";
import { H1 } from "../../styles/TextStyles";

import { FiEye, FiEyeOff } from "react-icons/fi";
import createApiClient from "../../api/api-client-factory";
import { Register } from "../../models/Register";
import { useCreateUser } from "../../hooks/useCreateUser";
//import { useNavigate} from 'react-router';

const UserRegister = () => {
  const emptyRegisterInput: Partial<Register> = {
    username: "",
    lastName: "",
    mail: "",
    password: "",
    confirmPass: "",
  };
  const [registerInput, setRegisterInput] =
    useState<Partial<Register>>(emptyRegisterInput);

  //const navigate = useNavigate();

  const [passwordValidate, setPasswordValidate] = useState(false);
  const [confirmPassValidate, setConfirmPassValidate] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const apiClient = useMemo(() => createApiClient(), []);
  const { create, status, error } = useCreateUser(apiClient.postUser);

  useEffect(() => {
    if (status === "success") {
      console.log("Creacion exitosa");
      onReset();
      //TODO navega a la pantalla de para hacer loging o se hace loging automatico para ir a pantalla principal
      //navigate('/dashboard');
    } else {
      //console.log(error);
    }
    return () => {};
  }, [status]);
  //TODO   }, [status,navigate]);

  function onChange(
    e: ChangeEvent<HTMLInputElement>,
    attribute: keyof Register
  ) {
    setRegisterInput({ ...registerInput, [attribute]: e.target.value });
    if (attribute == "password") {
      const safePass =
        (e.target.value as string).length >= 8 &&
        /[a-z]/.test(e.target.value as string) &&
        /[A-Z]/.test(e.target.value as string) &&
        /[0-9]/.test(e.target.value as string);
      console.log("cambiaste pass = " + safePass);
      setPasswordValidate(safePass);
      if (registerInput.confirmPass != "") {
        const samePass = e.target.value == registerInput.password;
        setConfirmPassValidate(samePass);
      }
    }
    if (attribute == "confirmPass") {
      const samePass = e.target.value == registerInput.password;
      console.log("same pass = " + samePass);
      setConfirmPassValidate(samePass);
    }
  }

  function onReset() {
    setRegisterInput(emptyRegisterInput);
  }

  const readyToSubmit =
    registerInput.username !== "" &&
    registerInput.lastName !== "" &&
    registerInput.mail !== "" &&
    registerInput.password !== "" &&
    registerInput.confirmPass !== "" &&
    passwordValidate &&
    confirmPassValidate;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassVisibility = () => {
    setShowConfirmPass(!showConfirmPass);
  };

  function displayErrorMessage() {
    if (error) {
      return (
        <Alert key={"danger"} variant={"danger"}>
          {error.message}
        </Alert>
      );
    }
    return null;
  }
  function displaySuccessMessage() {
    if (status === "success") {
      return (
        <Alert key={"success"} variant={"success"}>
          {"Cuenta creada exitosamente"}
        </Alert>
      );
    }
    return null;
  }
  async function postUser() {
    const errorMessage = !readyToSubmit
      ? "Uno o más datos son incorrectos"
      : undefined;
    const newRegister = {
      Correo: registerInput.mail,
      Contrasena: registerInput.password,
      Nombres: registerInput.username,
      Apellidos: registerInput.lastName,
      Role: 1,
    };
    console.log(newRegister);
    create(newRegister, errorMessage);
  }

  return (
    <Container className="col-lg-6 col-xxl-4 my-5 mx-auto">
      <Title>{"Crea una nueva cuenta"}</Title>
      {displayErrorMessage()}
      {displaySuccessMessage()}
      <Form noValidate validated={readyToSubmit}>
        <Form.Group className="mb-3 sm-1" controlId="formName">
          <Form.Label className="labelForm">Nombre</Form.Label>
          <Form.Control
            className="inputForm"
            type="text"
            placeholder="Nombre"
            value={registerInput.username}
            onChange={(e) => onChange(e, "username")}
            required
          />
          <Form.Control.Feedback type="invalid">
            El campo no puede estar vacio{" "}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3 sm-1" controlId="formLastName">
          <Form.Label className="labelForm">Apellidos</Form.Label>
          <Form.Control
            className="inputForm"
            type="text"
            placeholder="Apellidos"
            value={registerInput.lastName}
            onChange={(e) => onChange(e, "lastName")}
            required
          />
          <Form.Control.Feedback type="invalid">
            El campo no puede estar vacio{" "}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label className="labelForm">Correo</Form.Label>
          <Form.Control
            className="inputForm"
            type="email"
            placeholder="correo@domain.com"
            value={registerInput.mail}
            onChange={(e) => onChange(e, "mail")}
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
              value={registerInput.password}
              onChange={(e) => onChange(e, "password")}
              required
              isInvalid={!passwordValidate && registerInput.password != ""}
            />
            <InputGroup.Text
              className="inputGroupico"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              La contraseña debe contener al menos 8 caracteres, 1 mayúscula y 1
              número
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label className="labelForm">Confirma tu contraseña</Form.Label>
          <InputGroup>
            <Form.Control
              className="inputForm"
              type={showConfirmPass ? "text" : "password"}
              placeholder="Confirma tu contraseña"
              value={registerInput.confirmPass}
              onChange={(e) => onChange(e, "confirmPass")}
              required
              isInvalid={
                !confirmPassValidate && registerInput.confirmPass != ""
              }
            />
            <InputGroup.Text
              className="inputGroupico"
              onClick={toggleConfirmPassVisibility}
            >
              {showConfirmPass ? <FiEyeOff /> : <FiEye />}
            </InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              Las contraseñas no coinciden
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <div className="d-grid gap-2">
          <Button
            variant="primary"
            className="custombtn-primary"
            onClick={async () => postUser()}
            disabled={status === "loading" || !readyToSubmit}
          >
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
